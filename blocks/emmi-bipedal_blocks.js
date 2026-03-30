/**
 * EMMI Bipedal / Otto - Block Definitions
 * Ported from EMMI_BOT_V2_WIRED
 */

// Helper: safe Blockly.Msg lookup with fallback
function _emmi_msg(key, fallback) {
    return (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) ? Blockly.Msg[key] : fallback;
}

Blockly.Blocks['linefollower_ir_left'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/linefollow.png",33,33))
            .appendField("Left IR PIN")
            .appendField(new Blockly.FieldDropdown([
                ["34", "34"], ["35", "35"], ["32", "32"], ["33", "33"], ["36", "36"], ["39", "39"],
                ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]
            ]), "PIN_IR");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["0-4095", "1"], ["0-100%", "0"]]), "OUTPUT_VALUE");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setColour("#54BCF7");
        this.setTooltip('Left infrared line follower sensor value');
    }
};

Blockly.Blocks['linefollower_ir_right'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/linefollow.png",33,33))
            .appendField("right IR PIN")
            .appendField(new Blockly.FieldDropdown([
                ["34", "34"], ["35", "35"], ["32", "32"], ["33", "33"], ["36", "36"], ["39", "39"],
                ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]
            ]), "PIN_IR");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["0-4095", "1"], ["0-100%", "0"]]), "OUTPUT_VALUE");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setColour("#54BCF7");
        this.setTooltip('Right infrared line follower sensor value'); 
    }
};

Blockly.Blocks['ir_detect_white'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/linefollow.png",33,33))
            .appendField("IR detect")
            .appendField(new Blockly.FieldDropdown([
                ["left", "LEFT"],
                ["right", "RIGHT"]
            ]), "SIDE")
            .appendField("⬜ white");
        this.setOutput(true, "Boolean");
        this.setInputsInline(true);
        this.setColour("#388E3C");
        this.setTooltip('Returns true if the IR sensor detects a WHITE surface');
    }
};

Blockly.Blocks['ir_detect_black'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/linefollow.png",33,33))
            .appendField("IR detect")
            .appendField(new Blockly.FieldDropdown([
                ["left", "LEFT"],
                ["right", "RIGHT"]
            ]), "SIDE")
            .appendField("⬛ black");
        this.setOutput(true, "Boolean");
        this.setInputsInline(true);
        this.setColour("#388E3C");
        this.setTooltip('Returns true if the IR sensor detects a BLACK surface');
    }
};

Blockly.Blocks['ir_detect_neither'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/linefollow.png",33,33))
            .appendField("IR detect")
            .appendField(new Blockly.FieldDropdown([
                ["left", "LEFT"],
                ["right", "RIGHT"]
            ]), "SIDE")
            .appendField("🔶 neither");
        this.setOutput(true, "Boolean");
        this.setInputsInline(true);
        this.setColour("#FF8F00");
        this.setTooltip('Returns true if the IR sensor detects NEITHER white nor black (middle range)');
    }
};

Blockly.Blocks['flipper_wheels_init'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/otto_wheels.png",33,33,"*"))
            .appendField(_emmi_msg('OTTO_HOME_TEXT', 'setup '))
            .appendField(_emmi_msg('OTTO_WHEELS_TEXT', 'wheels'));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
        this.setTooltip("Initialize Flipper Wheels.");
    }
};

Blockly.Blocks['flipper_wheels_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("💿 " + _emmi_msg('OTTO_WHEELS_TEXT', 'wheels'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('OTTO9_MOVE_CHOICE_FWD', '↑ forward'), "FORWARD"],
                [_emmi_msg('OTTO9_MOVE_CHOICE_BWD', '↓ backward'), "BACKWARD"],
                [_emmi_msg('OTTO9_MOVE_CHOICE_LEFT', '← left'), "LEFT"],
                [_emmi_msg('OTTO9_MOVE_CHOICE_RIGHT', '→ right'), "RIGHT"],
                [_emmi_msg('OTTO9_MOVE_CHOICE_STOP', '🛑 STOP'), "STOP"]
            ]), "MOTION");
        this.appendDummyInput()
            .appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('OTTO9_SPEED_NORMAL', 'normal'), "45"],
                [_emmi_msg('OTTO9_SPEED_SLOW', 'slow'), "20"],
                [_emmi_msg('OTTO9_SPEED_VERYSLOW', 'very slow'), "10"],
                [_emmi_msg('OTTO9_SPEED_FAST', 'fast'), "60"],
                [_emmi_msg('OTTO9_SPEED_VERYFAST', 'very fast'), "90"]
            ]), "SPEED");
        this.appendDummyInput()
            .appendField("step")
            .appendField(new Blockly.FieldNumber("1"), "TIME");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
        this.setTooltip("Move Flipper Wheels.");
    }
};

// OLED Eyes expression selector (Expanded with 31 options from core)
Blockly.Blocks['OLED_eyes'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("👀 " + _emmi_msg('OTTO9_EYES_TEXT', 'eyes'))
      .appendField(new Blockly.FieldDropdown([
        ["👀 eyes 1", "eyes1"], ["👀 eyes 2", "eyes2"],
        ["😃 happy 1", "happy1"], ["😃 happy 2", "happy2"], ["😃 happy 3", "happy3"], ["😃 happy 4", "happy4"],
        ["😦 sad 1", "sad1"], ["😦 sad 2", "sad2"], ["😦 sad 3", "sad3"],
        ["😡 angry 1", "angry1"], ["😡 angry 2", "angry2"],
        ["😍 love 1", "love1"], ["😍 love 2", "love2"],
        ["😴 sleep 1", "sleep1"], ["😴 sleep 2", "sleep2"],
        ["😕 confused", "confused"],
        ["🌀 dizzy 1", "dizzy1"], ["🌀 dizzy 2", "dizzy2"],
        ["👋 wave 1", "wave1"], ["👋 wave 2", "wave2"], ["👋 wave 3", "wave3"],
        ["🪄 magic 1", "magic1"], ["🪄 magic 2", "magic2"], ["🪄 magic 3", "magic3"],
        ["👎 fail", "fail"],
        ["😖 fretful 1", "fretful1"], ["😖 fretful 2", "fretful2"], ["😖 fretful 3", "fretful3"],
        ["❌ xx", "xx"], ["✖️ XX", "XX"],
        ["⬛ full", "full"]
      ]), "oled_eyes");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#B655F5");
    this.setTooltip('Display eye expression on OLED (31 styles)');
    this.setHelpUrl('');
  }
};

// ===========================================
// OLED Display
// ===========================================

Blockly.Blocks['flipper_oled_init'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('media/oled.png', 33, 33, "*"))
            .appendField("Init OLED 1.3'' I²C (ESP32)");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#B655F5");
        this.setTooltip("Initializes the OLED on ESP32 Pins 21 (SDA) and 22 (SCL)");
    }
};

Blockly.Blocks['flipper_oled_clear'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("👀 clear ✨");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#B655F5");
        this.setTooltip("Clear the OLED display");
    }
};

// ===========================================
// RGB LED Controls
// ===========================================

Blockly.Blocks['flipper_rgb_red'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔴 Red LED")
            .appendField(_emmi_msg('EMMI_TO', 'to'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_ON', 'ON'), "HIGH"],
                [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#00838F");
        this.setTooltip("Control the Red LED.");
    }
};

Blockly.Blocks['flipper_rgb_green'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🟢 Green LED")
            .appendField(_emmi_msg('EMMI_TO', 'to'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_ON', 'ON'), "HIGH"],
                [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#00838F");
        this.setTooltip("Control the Green LED.");
    }
};

Blockly.Blocks['flipper_rgb_blue'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔵 Blue LED")
            .appendField(_emmi_msg('EMMI_TO', 'to'))
            .appendField(new Blockly.FieldDropdown([
                [_emmi_msg('EMMI_ON', 'ON'), "HIGH"],
                [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"]
            ]), "STATE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#00838F");
        this.setTooltip("Control the Blue LED.");
    }
};

// ===========================================
// Ultrasonic Sensor
// ===========================================

Blockly.Blocks['flipper_ultrasonic_init'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png", 33, 33, "*"))
            .appendField("⚙️ #")
            .appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
            .appendField("ultrasonic trigger")
            .appendField(new Blockly.FieldDropdown([
                ["25", "25"], ["26", "26"], ["32", "32"], ["33", "33"],
                ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"],
                ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["27", "27"]
            ]), "PIN_TRIG");
        this.appendDummyInput()
            .appendField("echo")
            .appendField(new Blockly.FieldDropdown([
                ["25", "25"], ["26", "26"], ["32", "32"], ["33", "33"],
                ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"],
                ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["27", "27"]
            ]), "PIN_ECHO");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#54BCF7");
        this.setTooltip("Setup ultrasonic sensor with trigger and echo pins.");
    }
};

Blockly.Blocks['flipper_ultrasonic_distance'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png", 25, 15, "*"))
            .appendField("⚙️ #")
            .appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
            .appendField("distance");
        this.setColour("#54BCF7");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setTooltip("Ultrasonic distance in cm");
    }
};

// ===========================================
// Touch Sensor
// ===========================================

Blockly.Blocks['flipper_touch_read'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("👉 touch PIN")
            .appendField(new Blockly.FieldDropdown([
                ["TOUCH", "PIN_TOUCH"],
                ["32", "32"], ["33", "33"], ["27", "27"], ["14", "14"], ["12", "12"], ["13", "13"]
            ]), "PIN");
        this.setOutput(true, "Boolean");
        this.setColour("#FFC107");
        this.setTooltip("Read digital state of touch sensor.");
    }
};

// ===========================================
// Light Sensor (LDR)
// ===========================================

Blockly.Blocks['flipper_light_read'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("💡 " + _emmi_msg('EMMI_ANALOG_READ_PIN', 'analog read PIN'))
            .appendField(new Blockly.FieldDropdown([
                ["LDR", "LDR"],
                ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"], ["32", "32"], ["33", "33"]
            ]), "PIN");
        this.setOutput(true, "Number");
        this.setColour("#FFA726");
        this.setTooltip("Read light sensor (LDR) value.");
    }
};

// ===========================================
// Speaker
// ===========================================

Blockly.Blocks['flipper_speaker_init'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔊 Speaker Init");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF63BB");
        this.setTooltip("Initialize speaker.");
    }
};

Blockly.Blocks['flipper_speaker_play'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔊 play")
            .appendField(new Blockly.FieldDropdown([
                ['Hi I am Emmi', 'HI_I_AM_EMMI'],
                ['Obstacle detected', 'OBSTACLE']
            ]), "VOICE_ID");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF63BB");
        this.setTooltip("Play prerecorded voice message.");
    }
};

Blockly.Blocks['flipper_speaker_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔊 stop sound");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF63BB");
        this.setTooltip("Stop sound immediately.");
    }
};

// ===========================================
// Buzzer
// ===========================================

var FLIPPER_BUZZER_HUE = "#E91E63";

var FLIPPER_BUZZER_PINS = [
    ["BUZZER", "26"],
    ["25", "25"], ["26", "26"], ["27", "27"], ["14", "14"]
];

var FLIPPER_BUZZER_NOTES = [
    ["C4 (262Hz)", "262"], ["D4 (294Hz)", "294"], ["E4 (330Hz)", "330"],
    ["F4 (349Hz)", "349"], ["G4 (392Hz)", "392"], ["A4 (440Hz)", "440"],
    ["B4 (494Hz)", "494"], ["C5 (523Hz)", "523"], ["D5 (587Hz)", "587"],
    ["E5 (659Hz)", "659"], ["F5 (698Hz)", "698"], ["G5 (784Hz)", "784"],
    ["A5 (880Hz)", "880"], ["B5 (988Hz)", "988"]
];

var FLIPPER_BUZZER_TEMPOS = [
    ["Eighth (125ms)", "125"], ["Quarter (250ms)", "250"],
    ["Half (500ms)", "500"], ["Whole (1000ms)", "1000"]
];

Blockly.Blocks['flipper_buzzer_rtttl'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🎵 buzzer")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_PINS), "PIN")
            .appendField("play ring tone")
            .appendField(new Blockly.FieldDropdown([
                ["StarWars", "StarWars"], ["MahnaMahna", "MahnaMahna"],
                ["MissionImp", "MissionImp"], ["Entertainer", "Entertainer"],
                ["Muppets", "Muppets"], ["Flinstones", "Flinstones"],
                ["YMCA", "YMCA"], ["Simpsons", "Simpsons"],
                ["Indiana", "Indiana"], ["JingleBell", "JingleBell"],
                ["SilentNight", "SilentNight"], ["AmazingGrace", "AmazingGrace"]
            ]), "MELODY");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(FLIPPER_BUZZER_HUE);
        this.setTooltip("Play a preset RTTTL ringtone melody on the buzzer.");
    }
};

Blockly.Blocks['flipper_buzzer_note'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🎵 buzzer")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_PINS), "PIN")
            .appendField("play")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_NOTES), "NOTE")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_TEMPOS), "TEMPO");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(FLIPPER_BUZZER_HUE);
        this.setTooltip("Play a musical note for a given duration.");
    }
};

Blockly.Blocks['flipper_buzzer_tone'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🎵 buzzer")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_PINS), "PIN")
            .appendField("♪ frequency (Hz)")
            .appendField(new Blockly.FieldNumber(880, 0), "FREQ")
            .appendField("⊙ duration (ms)")
            .appendField(new Blockly.FieldNumber(100, 0), "DURATION");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(FLIPPER_BUZZER_HUE);
        this.setTooltip("Play a tone at a specific frequency for a given duration.");
    }
};

Blockly.Blocks['flipper_buzzer_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("🔇 stop sound on")
            .appendField(new Blockly.FieldDropdown(FLIPPER_BUZZER_PINS), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(FLIPPER_BUZZER_HUE);
        this.setTooltip("Stop the buzzer / turn off tone.");
    }
};

