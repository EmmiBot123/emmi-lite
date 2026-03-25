const fs = require('fs');

// Mock exporter
class MockExporter {
    constructor() {
        this.initTokens = [];
    }
    addInitToken(t) {
        if (!this.initTokens.includes(t)) this.initTokens.push(t);
    }
}

// Load commands
global.emmiCommandGenerator = { registry: {} };
global.window = {};

const code = fs.readFileSync('c:/EMMI_HTML/EMMI_HTML/js/commands/emmi-v1_commands.js', 'utf8');
eval(code);

const registry = global.emmiCommandGenerator.registry;

// Mock block
const block = {
    type: 'bipedal_move',
    getFieldValue: (f) => {
        if (f === 'otto_move_sens') return 'FORWARD';
        if (f === 'otto_move_speed') return '1000';
        return '';
    }
};

const exporter = new MockExporter();
const tokens = registry['bipedal_move'](block, exporter);

console.log('Init Tokens:', exporter.initTokens);
console.log('Result:', tokens);
