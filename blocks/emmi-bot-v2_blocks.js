// EMMI BOT V2 Block Definitions

// ===========================================
// EMMI BOT V2 Blocks
// ===========================================

// Helper: safe Blockly.Msg lookup with fallback
function _emmi_msg(key, fallback) {
    return (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) ? Blockly.Msg[key] : fallback;
}

// ===========================================
// Eyes
// ===========================================

Blockly.Blocks['emmi_eyes_digital'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_DIGITAL_WRITE_PIN', 'digital write PIN'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_COLOR_RED', 'Red'), 'PIN_EYE_RED'],
                [_emmi_msg('EMMI_COLOR_GREEN', 'Green'), 'PIN_EYE_GREEN'],
                [_emmi_msg('EMMI_COLOR_BLUE', 'Blue'), 'PIN_EYE_BLUE']
            ]), "PIN")
            .appendField(_emmi_msg('EMMI_TO', 'to'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_ON', 'ON'), "HIGH"],
                [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#00838F");
        this.setTooltip("Control the digital state of the eye LEDs.");
        this.setHelpUrl("");
    }
};

// ===========================================
// Wheels
// ===========================================

Blockly.Blocks['emmi_wheels_simple'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("🛞")
            .appendField(_emmi_msg('EMMI_WHEELS', 'wheels'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_FORWARD', 'forward'), "FORWARD"],
                [_emmi_msg('EMMI_BACKWARD', 'backward'), "BACKWARD"],
                [_emmi_msg('EMMI_LEFT', 'left'), "LEFT"],
                [_emmi_msg('EMMI_RIGHT', 'right'), "RIGHT"],
                [_emmi_msg('EMMI_STOP', 'stop'), "STOP"]
            ]), "DIRECTION");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#3F51B5");
        this.setTooltip("Move the robot wheels in a selected direction.");
        this.setHelpUrl("");
    }
};

// ===========================================
// Buzzer
// ===========================================

var EMMI_BUZZER_HUE = "#E91E63";

var EMMI_BUZZER_PINS = [
    ["BUZZER", "BUZZER"],
    ["25", "25"],
    ["26", "26"],
    ["27", "27"]
];

var EMMI_BUZZER_NOTES = [
    ["C4 (262Hz)", "262"],
    ["D4 (294Hz)", "294"],
    ["E4 (330Hz)", "330"],
    ["F4 (349Hz)", "349"],
    ["G4 (392Hz)", "392"],
    ["A4 (440Hz)", "440"],
    ["B4 (494Hz)", "494"],
    ["C5 (523Hz)", "523"],
    ["D5 (587Hz)", "587"],
    ["E5 (659Hz)", "659"],
    ["F5 (698Hz)", "698"],
    ["G5 (784Hz)", "784"],
    ["A5 (880Hz)", "880"],
    ["B5 (988Hz)", "988"]
];

var EMMI_BUZZER_TEMPOS = [
    ["Eighth (125ms)", "125"],
    ["Quarter (250ms)", "250"],
    ["Half (500ms)", "500"],
    ["Whole (1000ms)", "1000"]
];

// ===========================================
// Touch
// ===========================================

Blockly.Blocks['emmi_touch_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_DIGITAL_STATE_PIN', 'digital state PIN'))
            .appendField(new Blockly.FieldDropdown([["TOUCH", "PIN_TOUCH"]]), "PIN")

        this.setOutput(true, "Boolean");
        this.setColour("#3F51B5");
        this.setTooltip("Read digital state of touch sensor.");
        this.setHelpUrl("");
    }
};

// ===========================================
// Mic
// ===========================================

Blockly.Blocks['emmi_mic_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_DIGITAL_STATE_PIN', 'digital state PIN'))
            .appendField(new Blockly.FieldDropdown([["MIC", "PIN_MIC"]]), "PIN")
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_PULL_UP', 'pull-up'), "INPUT_PULLUP"],
                [_emmi_msg('EMMI_PULL_DOWN', 'pull-down'), "INPUT_PULLDOWN"],
                [_emmi_msg('EMMI_INPUT', 'input'), "INPUT"]
            ]), "MODE");
        this.setOutput(true, "Number");
        this.setColour("#000000");
        this.setTooltip("Read digital state of microphone.");
        this.setHelpUrl("");
    }
};

// ===========================================
// Light
// ===========================================

Blockly.Blocks['emmi_light_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_ANALOG_READ_PIN', 'analog read PIN'))
            .appendField(new Blockly.FieldDropdown([["LIGHT", "PIN_LIGHT"]]), "PIN");
        this.setOutput(true, "Number");
        this.setColour("#FFA726");
        this.setTooltip("Read analog value from light sensor.");
        this.setHelpUrl("");
    }
};

// ===========================================
// Cute Sounds
// ===========================================



// ===========================================
// Improved Tone / Play
// ===========================================



// ===========================================
// MP3 / DFPlayer Mini
// ===========================================



Blockly.Blocks['buzzer_play_rtttl'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_BUZZER_LBL', 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_PINS), "PIN")
            .appendField(_emmi_msg('EMMI_PLAY_RING_TONE', 'play ring tone'))
            .appendField(new Blockly.FieldDropdown([
                ["StarWars", "StarWars"],
                ["MahnaMahna", "MahnaMahna"],
                ["MissionImp", "MissionImp"],
                ["Entertainer", "Entertainer"],
                ["Muppets", "Muppets"],
                ["Flinstones", "Flinstones"],
                ["YMCA", "YMCA"],
                ["Simpsons", "Simpsons"],
                ["Indiana", "Indiana"],
                ["JingleBell", "JingleBell"],
                ["SilentNight", "SilentNight"],
                ["AmazingGrace", "AmazingGrace"]
            ]), "MELODY");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_HUE);
        this.setTooltip("Play a preset RTTTL ringtone melody on the buzzer.");
    }
};

Blockly.Blocks['buzzer_play_rtttl_custom'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_BUZZER_LBL', 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_PINS), "PIN")
            .appendField(_emmi_msg('EMMI_PLAY_RING_TONE', 'play ring tone'));
        this.appendValueInput("MELODY").setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_HUE);
        this.setTooltip("Play a custom RTTTL string on the buzzer.");
    }
};

Blockly.Blocks['buzzer_play_note'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_BUZZER_LBL', 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_PINS), "PIN")
            .appendField(_emmi_msg('EMMI_PLAY', 'play'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_NOTES), "NOTE")
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_TEMPOS), "TEMPO");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_HUE);
        this.setTooltip("Play a musical note for a given duration.");
    }
};

Blockly.Blocks['buzzer_play_tone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_BUZZER_LBL', 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_PINS), "PIN");
        this.appendValueInput("FREQ").setCheck("Number").appendField(_emmi_msg('EMMI_FREQ_HZ', '♪ frequency (Hz)'));
        this.appendValueInput("DURATION").setCheck("Number").appendField(_emmi_msg('EMMI_DURATION_MS', '⊙ duration (ms)'));
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_HUE);
        this.setTooltip("Play a tone at a specific frequency for a given duration.");
    }
};

Blockly.Blocks['buzzer_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(_emmi_msg('EMMI_STOP_SOUND_ON', 'stop sound on'))
            .appendField(new Blockly.FieldDropdown(EMMI_BUZZER_PINS), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_HUE);
        this.setTooltip("Stop the buzzer / turn off tone.");
    }
};