/**
 * AI Arduino Assistant — standalone (non-ES-module) port from EMMI Core
 * Compatible with EMMI BOT Lite / EMMI HTML (plain <script> tag, no bundler)
 */

const AIChat = (() => {
    let chatHistory = [];
    let isProcessing = false;
    let generatedBlocks = [];

    function getBlocksSchema() {
        // Read from JSON toolbox (not XML) — get the current board type
        const boardSel = document.getElementById('board-select');
        const boardType = boardSel ? boardSel.value : 'emmi-bot-v2';

        let toolbox;
        try {
            toolbox = (typeof getToolbox === 'function') ? getToolbox(boardType) : null;
        } catch (e) { toolbox = null; }
        if (!toolbox || !toolbox.contents) return '';

        let schemaList = [];
        let uniqueBlocks = new Set();

        // Add common blocks that may not appear in toolbox
        schemaList.push(`[Common Blocks]\nvariables_get(field:VAR), variables_set(field:VAR, value:VALUE), math_number(field:NUM), text(field:TEXT), logic_boolean(field:BOOL)`);

        // Blockly input type constants (this version lacks Blockly.inputTypes)
        const BL_INPUT_VALUE = Blockly.INPUT_VALUE || 1;
        const BL_NEXT_STATEMENT = Blockly.NEXT_STATEMENT || 3;

        // Use the main workspace for block inspection (no temp workspace needed)
        const mainWs = Blockly.getMainWorkspace();

        // Helper: extract field/input info from a registered Blockly block definition
        function getBlockInfo(type) {
            if (!Blockly.Blocks[type] || !mainWs) return type;
            let inputs = [];
            try {
                // Create an unrendered block on the main workspace for inspection
                const block = mainWs.newBlock(type);

                // Inspect all inputs on the block
                block.inputList.forEach(input => {
                    // Fields
                    input.fieldRow.forEach(field => {
                        const name = field.name;
                        if (!name) return;
                        if (field instanceof Blockly.FieldDropdown) {
                            try {
                                const opts = field.getOptions(false);
                                const vals = opts.map(o => o[1]).join('|');
                                inputs.push(`field:${name} [options: ${vals}]`);
                            } catch (e) { inputs.push(`field:${name}`); }
                        } else if (field instanceof Blockly.FieldNumber) {
                            inputs.push(`field:${name} [number, default: ${field.getValue()}]`);
                        } else if (field instanceof Blockly.FieldCheckbox) {
                            inputs.push(`field:${name} [checkbox: TRUE|FALSE]`);
                        } else if (field instanceof Blockly.FieldVariable) {
                            inputs.push(`field:${name} [variable]`);
                        } else if (field instanceof Blockly.FieldTextInput) {
                            inputs.push(`field:${name} [text]`);
                        }
                    });
                    // Value / Statement inputs using numeric constants
                    if (input.type === BL_INPUT_VALUE) {
                        inputs.push(`value:${input.name}`);
                    } else if (input.type === BL_NEXT_STATEMENT) {
                        inputs.push(`statement:${input.name}`);
                    }
                });

                // Dispose the temporary block without affecting the workspace visually
                block.dispose();
            } catch (e) {
                // Fallback: just return the type name
                return type;
            }
            if (inputs.length > 0) return `${type}(${inputs.join(', ')})`;
            return type;
        }

        // Recursively walk the JSON toolbox to extract blocks by category
        function walkContents(items, parentCatName) {
            if (!Array.isArray(items)) return;
            items.forEach(item => {
                if (item.kind === 'category') {
                    const catName = (item.name || 'Misc').replace(/^\S+\s/, ''); // strip emoji
                    const subItems = item.contents;
                    if (item.custom) return; // skip dynamic categories (like variables)
                    let catBlocks = [];
                    if (Array.isArray(subItems)) {
                        subItems.forEach(sub => {
                            if (sub.kind === 'block' && sub.type && !uniqueBlocks.has(sub.type)) {
                                uniqueBlocks.add(sub.type);
                                catBlocks.push(getBlockInfo(sub.type));
                            } else if (sub.kind === 'category') {
                                // nested categories
                                walkContents([sub], catName);
                            }
                        });
                    }
                    if (catBlocks.length > 0) {
                        schemaList.push(`[${catName}]\n` + catBlocks.join('\n'));
                    }
                }
            });
        }

        walkContents(toolbox.contents, '');

        if (schemaList.length <= 1) return ''; // only Common Blocks, no toolbox blocks found

        return '\n\n### BLOCK SPECIFICATION (USE THESE EXACT TYPES AND FIELD NAMES) ###\n' + schemaList.join('\n\n');
    }

    function getSystemPrompt() {
        const boardSel = document.getElementById('board-select');
        const boardName = boardSel ? boardSel.options[boardSel.selectedIndex].text : 'EMMI BOT V2 / ESP32';
        const mode = document.getElementById('ai-chat-mode') ? document.getElementById('ai-chat-mode').value : 'code';

        let p = '';
        if (mode === 'chat') {
            p = `You are an expert Arduino programming assistant. The user is working with a ${boardName}. Please answer their questions conversationally and helpfully, providing Arduino C++ code and explanations. NEVER generate Blockly XML (\`\`\`xml). Use standard markdown to format your explanations and \`\`\`cpp blocks for Arduino code.`;
        } else if (mode === 'blocks') {
            p = `You are an expert Arduino logic programmer. The user needs Blockly XML blocks for a ${boardName}. Generate complete working Blockly XML representations of the logic requested. Output ONLY raw Blockly XML code wrapped in \`\`\`xml code blocks. Keep all other explanations extremely concise.\n`;
            p += "CRITICAL: EVERY `<block>` MUST HAVE A `type` ATTRIBUTE. NEVER USE `name` OR OTHER ATTRIBUTES FOR THE BLOCK TYPE NAME.\n";
            p += "CRITICAL: You MUST use the EXACT block types AND field names from the attached schema. Do NOT invent block names or field names. Match the schema EXACTLY.\n";
            p += "CRITICAL: NEVER generate orphan logic blocks floating outside a container. ALL execution logic MUST be vertically nested inside the `<block type=\"base_setup_loop\">` using `<statement name=\"SETUP\">` (for Setup code) or `<statement name=\"LOOP\">` (for Loop code).\n";
            p += "- For Setup/Loop: ALWAYS use ONE `<block type=\"base_setup_loop\">` which contains `<statement name=\"SETUP\">` for Setup and `<statement name=\"LOOP\">` for Loop.\n";
            p += "- For time delays: use `custom_wait` block with field `DELAY` (number) and field `UNIT` (options: SECONDS|MILLISECONDS|MICROSECONDS).\n";
            p += "- For loops: use `controls_repeat_ext` (value `TIMES`, statement `DO`), `controls_whileUntil` (field `MODE` as `WHILE`, value `BOOL`, statement `DO`), or `controls_for` (field `VAR`, values `FROM`, `TO`, `BY`, statement `DO`).\n";
            p += "- For Variables: use `variables_set` (field `VAR`, value `VALUE`) and `variables_get` (field `VAR`). ALWAYS use `VAR` for the field name.\n";
            p += "- For dropdown fields: you MUST use the exact option VALUES from the schema (e.g. `PIN_EYE_RED` not `RED`, `HIGH` not `ON`).\n";
            p += "- Never use `digital_write`, `delay`, or any block not in the schema.\n";
        } else {
            p = `You are an expert Arduino programmer. The user is working with a ${boardName} (ESP32-based EMMI robot). Provide complete, working Arduino sketches. Include necessary #include statements. Format code in \`\`\`cpp code blocks. Keep explanations concise.`;
        }

        return p + getBlocksSchema();
    }


    function loadSettings() {
        return {
            provider: localStorage.getItem('ai_api_provider') || 'openrouter',
            endpoint: localStorage.getItem('ai_api_endpoint') || 'https://openrouter.ai/api/v1/chat/completions',
            apiKey: localStorage.getItem('ai_api_key') || '',
            model: localStorage.getItem('ai_model') || 'openai/gpt-4o'
        };
    }

    function saveSettings(provider, endpoint, apiKey, model) {
        localStorage.setItem('ai_api_provider', provider);
        localStorage.setItem('ai_api_endpoint', endpoint);
        localStorage.setItem('ai_api_key', apiKey);
        localStorage.setItem('ai_model', model);
    }

    function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    function addUserMessage(text) {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return;
        const div = document.createElement('div');
        div.className = 'ai-message ai-user';
        div.innerHTML = `<div class="ai-bubble">${escapeHtml(text)}</div><div class="ai-avatar"><i class="fa fa-user"></i></div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function addBotMessage(text) {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return null;
        const div = document.createElement('div');
        div.className = 'ai-message ai-bot';
        div.innerHTML = `<div class="ai-avatar"><i class="fa fa-robot"></i></div><div class="ai-bubble">${formatMessage(text)}</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return div;
    }

    function formatMessage(text) {
        const blocks = [];
        let f = text.replace(/```(?:xml|cpp|c\+\+|arduino|c|ino)?\n?([\s\S]*?)```/gi, (match, code) => {
            const hasXml = code.trim().startsWith('<xml') || code.trim().startsWith('<block');
            const isCpp = match.toLowerCase().startsWith('```cpp') || match.toLowerCase().startsWith('```arduino') || match.toLowerCase().startsWith('```c');
            const type = hasXml ? 'xml' : (isCpp ? 'cpp' : 'generic');
            const id = 'cb-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
            const mode = document.getElementById('ai-chat-mode') ? document.getElementById('ai-chat-mode').value : 'code';

            let replacement = '';
            if (type === 'xml' && mode !== 'chat') {
                replacement = `<div class="ai-code-block" style="display:none;"><div class="ai-code-header"><span>Blockly XML</span><button class="ai-insert-btn" data-code-id="${id}" data-type="xml" data-raw-code="${encodeURIComponent(code.trim())}" title="Insert Blocks"><i class="fa fa-arrow-right"></i> Insert</button></div><pre id="${id}"><code>${escapeHtml(code.trim())}</code></pre></div><div class="ai-success-msg" style="color:#4CAF50;padding:10px;background:rgba(76,175,80,0.1);border-radius:5px;margin:10px 0;border:1px solid rgba(76,175,80,0.2);"><i class="fa fa-check-circle"></i> Blocks generated and added to workspace!</div>`;
            } else if (type === 'cpp' && mode !== 'chat') {
                replacement = `<div class="ai-code-block"><div class="ai-code-header"><span>Arduino Code</span><button class="ai-insert-btn" data-code-id="${id}" data-type="cpp" data-raw-code="${encodeURIComponent(code.trim())}" title="Copy to code view"><i class="fa fa-arrow-right"></i> Insert</button></div><pre id="${id}"><code>${escapeHtml(code.trim())}</code></pre></div>`;
            } else {
                replacement = `<pre class="ai-code-generic"><code>${escapeHtml(code.trim())}</code></pre>`;
            }
            blocks.push(replacement);
            return `%%%BLOCK_${blocks.length - 1}%%%`;
        });

        f = f.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
        f = f.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        f = f.replace(/\n/g, '<br>');
        f = f.replace(/%%%BLOCK_(\d+)%%%/g, (_, index) => blocks[parseInt(index, 10)]);
        return f;
    }

    function insertCode(btn) {
        if (!btn) return;
        const type = btn.dataset.type;
        const rawCode = btn.dataset.rawCode;
        let code = rawCode ? decodeURIComponent(rawCode) : (document.getElementById(btn.dataset.codeId) || {}).textContent || '';
        if (!code) return;

        if (type === 'xml') {
            try {
                let xmlString = code.trim();
                xmlString = xmlString.replace(/<block([^>]+)name="([^"]+)"/g, (match, attrs, nameVal) => {
                    if (attrs.indexOf('type=') === -1) return `<block${attrs}type="${nameVal}"`;
                    return match;
                });
                if (!xmlString.includes('<xml')) {
                    xmlString = '<xml xmlns="https://developers.google.com/blockly/xml">' + xmlString + '</xml>';
                }
                const dom = Blockly.utils.xml.textToDom(xmlString);
                const workspace = Blockly.getMainWorkspace();
                Blockly.Xml.domToWorkspace(dom, workspace);
                for (let i = 0; i < dom.children.length; i++) {
                    generatedBlocks.push(dom.children[i].cloneNode(true));
                }
            } catch (err) {
                console.error('XML parse error', err);
                alert('Could not insert blocks: Invalid XML from AI. Error: ' + err.message);
                return;
            }
        }

        const oldHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-check"></i> Inserted!';
        btn.classList.add('inserted');
        setTimeout(() => { btn.innerHTML = oldHtml; btn.classList.remove('inserted'); }, 2000);
    }

    function showTyping() {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return '';
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'ai-message ai-bot ai-typing';
        div.innerHTML = '<div class="ai-avatar"><i class="fa fa-robot"></i></div><div class="ai-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return id;
    }

    function removeTyping(id) { document.getElementById(id)?.remove(); }

    function syncWithClipboard() {
        navigator.clipboard.readText().then(text => {
            if (!text || !text.trim()) { alert('Clipboard is empty or could not be read.'); return; }
            const mode = document.getElementById('ai-chat-mode') ? document.getElementById('ai-chat-mode').value : 'code';
            let processedText = text.trim();
            if (!processedText.includes('```')) {
                if (processedText.startsWith('<xml') || processedText.startsWith('<block')) processedText = '```xml\n' + processedText + '\n```';
                else if (mode === 'code' && (processedText.includes('void') || processedText.includes('#') || processedText.length > 20)) processedText = '```cpp\n' + processedText + '\n```';
            }
            addBotMessage('📋 Content received from clipboard. Syncing...');
            const msgDiv = addBotMessage(processedText);
            if (msgDiv) {
                setTimeout(() => {
                    const btns = msgDiv.querySelectorAll('.ai-insert-btn');
                    if (btns.length > 0) {
                        let buttonToClick = btns[0];
                        btns.forEach(b => { if ((mode === 'blocks' && b.dataset.type === 'xml') || (mode === 'code' && b.dataset.type === 'cpp')) buttonToClick = b; });
                        insertCode(buttonToClick);
                    }
                }, 100);
            }
        }).catch(() => alert('Clipboard access denied. Please allow it in browser settings.'));
    }

    function handleExternalLLM(text) {
        const provider = document.getElementById('ai-chat-provider') ? document.getElementById('ai-chat-provider').value : 'local';
        if (!provider || provider === 'local') return false;
        const systemPrompt = getSystemPrompt();
        const fullPrompt = '### SYSTEM INSTRUCTIONS ###\n' + systemPrompt + '\n\n### USER REQUEST ###\n' + text;

        navigator.clipboard.writeText(fullPrompt).then(() => {
            let url = '';
            if (provider === 'chatgpt') url = 'https://chatgpt.com/';
            else if (provider === 'gemini') url = 'https://gemini.google.com/app';
            else if (provider === 'claude') url = 'https://claude.ai/chat';
            else if (provider === 'grok') url = 'https://x.com/i/grok';
            else return;
            window.open(url, '_blank');
            addUserMessage(text);
            addBotMessage(`📋 **Prompt copied to clipboard!**\n\n🚀 Opening **${provider.toUpperCase()}**...\n\n1. **Paste (Ctrl+V)** the prompt into the AI chat window.\n2. Once you get the response, **Copy** it.\n3. Return here and click the **📋 Clipboard** icon in the header.`);
        }).catch(() => alert('Could not copy prompt automatically.'));
        return true;
    }

    async function sendMessage(text) {
        if (isProcessing || !text.trim()) return;
        if (handleExternalLLM(text.trim())) return;

        const settings = loadSettings();
        if (!settings.apiKey) { addBotMessage('⚠️ Configure your API key first. Click ⚙️ settings.'); return; }

        isProcessing = true;
        addUserMessage(text);
        chatHistory.push({ role: 'user', content: text });
        const typingId = showTyping();

        try {
            const systemPrompt = getSystemPrompt();
            let url = settings.endpoint;
            let headers = { 'Content-Type': 'application/json' };
            let body = {};

            if (settings.provider === 'google') {
                url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`;
                const contents = chatHistory.slice(-10).map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
                body = { contents, systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { temperature: 0.7, maxOutputTokens: 2048 } };
            } else {
                if (settings.provider === 'openrouter') url = 'https://openrouter.ai/api/v1/chat/completions';
                if (settings.apiKey) headers['Authorization'] = 'Bearer ' + settings.apiKey;
                const messages = [{ role: 'system', content: systemPrompt }, ...chatHistory.slice(-10)];
                body = { model: settings.model, messages, temperature: 0.7, max_tokens: 2048 };
            }

            const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
            removeTyping(typingId);
            if (!r.ok) { const errText = await r.text(); addBotMessage('❌ API Error (' + r.status + '): ' + errText); isProcessing = false; return; }

            const data = await r.json();
            let response = settings.provider === 'google'
                ? (data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.')
                : (data.choices?.[0]?.message?.content || 'No response.');

            chatHistory.push({ role: 'assistant', content: response });
            const msgDiv = addBotMessage(response);

            if (msgDiv) {
                setTimeout(() => {
                    const mode = document.getElementById('ai-chat-mode') ? document.getElementById('ai-chat-mode').value : 'code';
                    if (mode !== 'chat') {
                        msgDiv.querySelectorAll('.ai-insert-btn').forEach(btn => {
                            if ((mode === 'blocks' && btn.dataset.type === 'xml') || (mode === 'code' && btn.dataset.type === 'cpp')) insertCode(btn);
                        });
                    }
                }, 50);
            }
        } catch (err) {
            removeTyping(typingId);
            addBotMessage('❌ Error: ' + err.message);
        }
        isProcessing = false;
    }

    function showAISettings() {
        const s = loadSettings();
        const panel = document.getElementById('ai-settings-modal');
        if (!panel) return;

        if (document.getElementById('ai-api-provider')) document.getElementById('ai-api-provider').value = s.provider;
        if (document.getElementById('ai-api-endpoint')) document.getElementById('ai-api-endpoint').value = s.endpoint;
        if (document.getElementById('ai-api-key')) document.getElementById('ai-api-key').value = s.apiKey;
        if (document.getElementById('ai-model-name')) document.getElementById('ai-model-name').value = s.model;

        const endpointGroup = document.getElementById('ai-endpoint-group');
        if (endpointGroup) endpointGroup.style.display = s.provider === 'custom' ? 'block' : 'none';

        panel.style.display = 'flex';
    }

    function init() {
        // Toggle panel open/close
        document.getElementById('chatbot-toggle')?.addEventListener('click', () => {
            document.getElementById('ai-chat-panel')?.classList.toggle('open');
        });
        document.getElementById('btn_ai_close')?.addEventListener('click', () => {
            document.getElementById('ai-chat-panel')?.classList.remove('open');
        });

        // Send
        document.getElementById('btn_ai_send')?.addEventListener('click', () => {
            const input = document.getElementById('ai-chat-input');
            if (input?.value.trim()) { sendMessage(input.value.trim()); input.value = ''; }
        });
        document.getElementById('ai-chat-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('btn_ai_send')?.click(); }
        });

        // Clipboard sync
        document.getElementById('btn_ai_sync_clipboard')?.addEventListener('click', syncWithClipboard);

        // Settings
        document.getElementById('btn_ai_settings')?.addEventListener('click', showAISettings);

        document.getElementById('ai-api-provider')?.addEventListener('change', (e) => {
            const endpointGroup = document.getElementById('ai-endpoint-group');
            if (endpointGroup) endpointGroup.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });

        document.getElementById('btn_ai_save_settings')?.addEventListener('click', () => {
            saveSettings(
                document.getElementById('ai-api-provider')?.value || 'openrouter',
                document.getElementById('ai-api-endpoint')?.value || 'https://openrouter.ai/api/v1/chat/completions',
                document.getElementById('ai-api-key')?.value || '',
                document.getElementById('ai-model-name')?.value || 'openai/gpt-4o'
            );
            document.getElementById('ai-settings-modal').style.display = 'none';
        });

        document.getElementById('btn_ai_cancel_settings')?.addEventListener('click', () => {
            document.getElementById('ai-settings-modal').style.display = 'none';
        });

        // Delegate insert btn clicks
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.ai-insert-btn');
            if (btn) insertCode(btn);
        });
    }

    return { sendMessage, insertCode, init };
})();

window.AIChat = AIChat;
document.addEventListener('DOMContentLoaded', () => AIChat.init());
