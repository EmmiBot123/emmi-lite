'use strict';

/**
 * EMMI Bipedal - Block Definitions
 * Blocks for the EMMI Bipedal (Otto) robot board.
 */

// ─── LIGHT SENSOR (LDR) ──────────────────────────────────────────────────────
// LDR is on pin 34 (VR command, init flag V)
Blockly.Blocks['bipedal_light_read'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(_emmi_msg('EMMI_ANALOG_READ_PIN', 'analog read PIN'))
      .appendField(new Blockly.FieldDropdown([
        ["LDR", "LDR"]
      ]), "PIN");
    this.setOutput(true, 'Number');
    this.setColour('#00838F');
    this.setTooltip('Read LDR light sensor value (pin 34).');
    this.setHelpUrl('');
  }
};

// ─── RGB EYE CONTROLS ────────────────────────────────────────────────────────
// Active-low RGB LEDs: EYE_R=18, EYE_G=17, EYE_B=19

Blockly.Blocks['bipedal_rgb_green'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(_emmi_msg('EMMI_DIGITAL_WRITE_PIN', 'digital write PIN'))
      .appendField("Green")
      .appendField(_emmi_msg('EMMI_TO', 'to'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"],
        [_emmi_msg('EMMI_ON', 'ON'), "HIGH"]
      ]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00838F");
    this.setTooltip("Control the Green eye LED.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bipedal_rgb_red'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(_emmi_msg('EMMI_DIGITAL_WRITE_PIN', 'digital write PIN'))
      .appendField("Red")
      .appendField(_emmi_msg('EMMI_TO', 'to'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"],
        [_emmi_msg('EMMI_ON', 'ON'), "HIGH"]
      ]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00838F");
    this.setTooltip("Control the Red eye LED.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bipedal_rgb_blue'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(_emmi_msg('EMMI_DIGITAL_WRITE_PIN', 'digital write PIN'))
      .appendField("Blue")
      .appendField(_emmi_msg('EMMI_TO', 'to'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('EMMI_OFF', 'OFF'), "LOW"],
        [_emmi_msg('EMMI_ON', 'ON'), "HIGH"]
      ]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00838F");
    this.setTooltip("Control the Blue eye LED.");
    this.setHelpUrl("");
  }
};

// ─── LEGS / MOVEMENT ─────────────────────────────────────────────────────────
// otto_move, otto_dance, otto_do etc. are defined in emmi-bipedal_blocks.js
// These additional dedicated blocks live here for the EMMI BIPEDAL board.

Blockly.Blocks['bipedal_setup'] = {
  init: function() {
    this.appendDummyInput("")
      .appendField(new Blockly.FieldImage('media/otto_emoji.png', 33, 33, "*"))
      .appendField(_emmi_msg('OTTO_HOME_TEXT', 'setup ') + _emmi_msg('OTTO_BIPED_TEXT', 'biped'));
    this.appendDummyInput()
      .appendField(_emmi_msg('OTTO9_CALIBRATION_LEG', 'leg ') + _emmi_msg('left', 'left')).setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown([["MOTOR1","MOTOR1"], ["MOTOR2","MOTOR2"], ["MOTOR3","MOTOR3"], ["MOTOR4","MOTOR4"], ["OUT1","OUT1"], ["OUT2","OUT2"], ["OUT3","OUT3"], ["OUT4","OUT4"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "PIN_YL");
    this.appendDummyInput()
      .appendField(_emmi_msg('right', 'right')).setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown([["MOTOR1","MOTOR1"], ["MOTOR2","MOTOR2"], ["MOTOR3","MOTOR3"], ["MOTOR4","MOTOR4"], ["OUT1","OUT1"], ["OUT2","OUT2"], ["OUT3","OUT3"], ["OUT4","OUT4"], ["3","3"], ["2","2"], ["4","4"], ["5","5"]]), "PIN_YR");
    this.appendDummyInput()
      .appendField(_emmi_msg('OTTO9_CALIBRATION_FOOT', 'foot ') + _emmi_msg('left', 'left')).setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown([["MOTOR1","MOTOR1"], ["MOTOR2","MOTOR2"], ["MOTOR3","MOTOR3"], ["MOTOR4","MOTOR4"], ["OUT1","OUT1"], ["OUT2","OUT2"], ["OUT3","OUT3"], ["OUT4","OUT4"], ["4","4"], ["2","2"], ["3","3"], ["5","5"]]), "PIN_RL");
    this.appendDummyInput()
      .appendField(_emmi_msg('right', 'right')).setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown([["MOTOR1","MOTOR1"], ["MOTOR2","MOTOR2"], ["MOTOR3","MOTOR3"], ["MOTOR4","MOTOR4"], ["OUT1","OUT1"], ["OUT2","OUT2"], ["OUT3","OUT3"], ["OUT4","OUT4"], ["5","5"], ["2","2"], ["3","3"], ["4","4"]]), "PIN_RR");
    this.appendDummyInput()
      .appendField(_emmi_msg('OTTO9_BUZZER', 'buzzer')).setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldDropdown([["13","13"], ["12","12"], ["16","16"], ["17","17"]]), "PIN_Buzzer");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_home'] = {
  init: function() {
    this.appendDummyInput("")
      .appendField(new Blockly.FieldImage('media/otto_plus.png', 22, 22, "*"))
      .appendField(_emmi_msg('OTTO9_HOME_TEXT', 'home'));
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_move'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('media/otto_bend.png', 22, 22, "*"))
      .appendField(_emmi_msg('OTTO9_MOVE_TEXT', 'move'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_MOVE_CHOICE_FWD', '↑ forward'), "FORWARD"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_BWD', '↓ backward'), "BACKWARD"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_LEFT', '← left'), "LEFT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_RIGHT', '→ right'), "RIGHT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_BENDLEFT', 'bend left'), "BENDLEFT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_BENDRIGHT', 'bend right'), "BENDRIGHT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_SHAKELEFT', 'shake left leg'), "SHAKELEFT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_SHAKERIGHT', 'shake right leg'), "SHAKERIGHT"],
        [_emmi_msg('OTTO9_MOVE_CHOICE_JUMP', 'jump'), "jump"]
      ]), "otto_move_sens");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT)
      .appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_SPEED_NORMAL', 'normal'), "1000"],
        [_emmi_msg('OTTO9_SPEED_FAST', 'fast'), "500"],
        [_emmi_msg('OTTO9_SPEED_VERYFAST', 'very fast'), "250"]
      ]), "otto_move_speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_dance'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('media/otto_moonwalk.png', 22, 22, "*"))
      .appendField(_emmi_msg('OTTO9_DANCE_TEXT', 'dance'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_DANCE_CHOICE_MWL', 'moonwalk ←'), "moonwalkerLEFT"],
        [_emmi_msg('OTTO9_DANCE_CHOICE_MWR', 'moonwalk →'), "moonwalkerRIGHT"],
        [_emmi_msg('OTTO9_DANCE_CHOICE_CRL', 'crossing ←'), "crusaitoLEFT"],
        [_emmi_msg('OTTO9_DANCE_CHOICE_CRR', 'crossing →'), "crusaitoRIGHT"],
        [_emmi_msg('OTTO9_DANCE_CHOICE_FLF', 'flapping ↑'), "flappingFRONT"],
        [_emmi_msg('OTTO9_DANCE_CHOICE_FLB', 'flapping ↓'), "flappingBACK"]
      ]), "otto_dance_movement");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT)
      .appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_SPEED_NORMAL', 'normal'), "1000"],
        [_emmi_msg('OTTO9_SPEED_FAST', 'fast'), "500"],
        [_emmi_msg('OTTO9_SPEED_VERYFAST', 'very fast'), "250"]
      ]), "otto_move_speed");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT)
      .appendField(_emmi_msg('OTTO9_DANCE_SIZE_TEXT', 'size'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_SIZE_NORMAL', 'normal'), "15"],
        [_emmi_msg('OTTO9_SIZE_BIG', 'big'), "25"],
        [_emmi_msg('OTTO9_SIZE_SMALL', 'small'), "5"]
      ]), "otto_dance_size");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_do'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('media/otto_do.png', 22, 22, "*"))
      .appendField(_emmi_msg('OTTO9_DO_TEXT', 'do'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_DO_SWING', 'swing'), "swing"],
        [_emmi_msg('OTTO9_DO_UPDOWN', 'updown'), "updown"],
        [_emmi_msg('OTTO9_DO_TIPTOE', 'tiptoeSwing'), "tiptoeSwing"],
        [_emmi_msg('OTTO9_DO_JITTER', 'jitter'), "jitter"],
        [_emmi_msg('OTTO9_DO_ASCEND', 'ascendingTurn'), "ascendingTurn"]
      ]), "otto_do_movement");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT)
      .appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_SPEED_NORMAL', 'normal'), "1000"],
        [_emmi_msg('OTTO9_SPEED_FAST', 'fast'), "500"],
        [_emmi_msg('OTTO9_SPEED_VERYFAST', 'very fast'), "250"]
      ]), "otto_move_speed");
    this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT)
      .appendField(_emmi_msg('OTTO9_DANCE_SIZE_TEXT', 'size'))
      .appendField(new Blockly.FieldDropdown([
        [_emmi_msg('OTTO9_SIZE_NORMAL', 'normal'), "15"],
        [_emmi_msg('OTTO9_SIZE_BIG', 'big'), "25"],
        [_emmi_msg('OTTO9_SIZE_SMALL', 'small'), "5"]
      ]), "otto_dance_size");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_smooth'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldImage('media/smooth.png', 33, 33, "*")).appendField('Dance smooth criminal');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

Blockly.Blocks['bipedal_gesture'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('media/otto_emoji.png', 22, 22, "*"))
      .appendField(_emmi_msg('OTTO9_GESTURE_TEXT', 'gesture'))
      .appendField(new Blockly.FieldDropdown([
        ["🤩 happy1", "1"], ["🙂 happy2", "2"], ["😢 sad", "3"], ["😴 sleeping", "4"], 
        ["😕 confused", "6"], ["😍 love", "7"], ["😡 angry", "8"], ["😖 fretful", "9"], 
        ["🪄 magic", "10"], ["👋 wave", "11"], ["✌ victory", "12"], ["👎 fail", "13"], ["💨 fart", "5"]
      ]), "otto_gesture");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4759F5");
  }
};

// Init OLED 1.3" I²C (ESP32)
Blockly.Blocks['OLED_cust'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage('media/oled.png', 33, 33, "*"))
      .appendField("Init OLED 1.3'' I²C (ESP32)");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#B655F5");
    this.setTooltip('Initializes the OLED on ESP32 Pins 21 (SDA) and 22 (SCL)');
    this.setHelpUrl('');
  }
};


// OLED Clear display
Blockly.Blocks['OLED_clear'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("👀 clear ✨");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#B655F5");
    this.setTooltip('Clear the OLED display');
    this.setHelpUrl('');
  }
};

// Ultrasonic Sensor Setup
Blockly.Blocks['ultrasonic_sensor'] = {
  init: function() {
    this.setColour("#54BCF7");
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png", 33, 33, "*"))
      .appendField("⚙️ #")
      .appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
      .appendField("ultrasonic trigger")
      .appendField(new Blockly.FieldDropdown([
        ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"],
        ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"],
        ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"],
        ["25", "25"], ["26", "26"], ["32", "32"], ["33", "33"]
      ]), "PIN_TRIG");
    this.appendDummyInput()
      .appendField("echo")
      .appendField(new Blockly.FieldDropdown([
        ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"],
        ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"],
        ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"],
        ["25", "25"], ["26", "26"], ["32", "32"], ["33", "33"]
      ]), "PIN_ECHO");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Ultrasonic sensor setup');
  }
};

// Ultrasonic Distance Value
Blockly.Blocks['ultrasonic_distance'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("media/sensor_ultrasound.png", 25, 15, "*"))
      .appendField("⚙️ #")
      .appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3'],['4','4']]), "US_NUMBER")
      .appendField("distance");
    this.setColour("#54BCF7");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setTooltip('Ultrasonic distance in cm');
  }
};

// Speaker blocks
Blockly.Blocks['speaker_init'] = {
  init: function() {

    this.appendDummyInput()
      .appendField("🔊 Speaker");

    // height boosters
    this.appendDummyInput();
    

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#FF63BB");
    this.setTooltip("Initialize speaker");
  }
};

Blockly.Blocks['VOICE_play'] = {
  init: function() {
    this.setColour("#FF63BB");

    this.appendDummyInput()
        .appendField("play")
        .appendField(
          new Blockly.FieldDropdown([
            ['Hi I am Emmi', 'HI_I_AM_EMMI'],
            ['Obstacle detected', 'OBSTACLE']
          ]),
          "VOICE_ID"
        );

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Play prerecorded voice message");
    this.setHelpUrl('');
  }
};

Blockly.Blocks["VOICE_stop"] = {
  init: function() {
    this.setColour("#FF63BB");
    this.appendDummyInput().appendField("stop sound");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Stop sound immediately");
  }
};

// ===========================================
// Buzzer blocks
// ===========================================

var EMMI_BUZZER_V1_HUE = "#E91E63";

var EMMI_V1_BUZZER_PINS = [
    ["BUZZER", "26"],
    ["25", "25"],
    ["26", "26"],
    ["27", "27"],
    ["14", "14"]
];

var EMMI_V1_BUZZER_NOTES = [
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
    ["B5 (987Hz)", "987"],
    ["C6 (1046Hz)", "1046"],
    ["C#4 (277Hz)", "277"],
    ["D#4 (311Hz)", "311"],
    ["F#4 (369Hz)", "369"],
    ["G#4 (415Hz)", "415"],
    ["A#4 (466Hz)", "466"],
    ["C#5 (554Hz)", "554"],
    ["D#5 (622Hz)", "622"],
    ["F#5 (739Hz)", "739"],
    ["G#5 (830Hz)", "830"],
    ["A#5 (932Hz)", "932"]
];

var EMMI_V1_BUZZER_TEMPOS = [
    ["Whole (2000ms)", "2000"],
    ["Half (1000ms)", "1000"],
    ["Quarter (500ms)", "500"],
    ["Eighth (250ms)", "250"],
    ["Sixteenth (125ms)", "125"]
];

Blockly.Blocks['buzzer_play_rtttl'] = {
    init: function () {
        this.appendDummyInput()
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_BUZZER_LBL', 'buzzer') : 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_PINS), "PIN")
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_PLAY_RING_TONE', 'play ring tone') : 'play ring tone'))
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
        this.setColour(EMMI_BUZZER_V1_HUE);
        this.setTooltip("Play a preset RTTTL ringtone melody on the buzzer.");
    }
};

Blockly.Blocks['buzzer_play_rtttl_custom'] = {
    init: function () {
        this.appendDummyInput()
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_BUZZER_LBL', 'buzzer') : 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_PINS), "PIN")
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_PLAY_RING_TONE', 'play ring tone') : 'play ring tone'))
            .appendField(new Blockly.FieldTextInput(''), "MELODY");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_V1_HUE);
        this.setTooltip("Play a custom RTTTL string on the buzzer.");
    }
};

Blockly.Blocks['buzzer_play_note'] = {
    init: function () {
        this.appendDummyInput()
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_BUZZER_LBL', 'buzzer') : 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_PINS), "PIN")
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_PLAY', 'play') : 'play'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_NOTES), "NOTE")
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_TEMPOS), "TEMPO");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_V1_HUE);
        this.setTooltip("Play a musical note for a given duration.");
    }
};

Blockly.Blocks['buzzer_play_tone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_BUZZER_LBL', 'buzzer') : 'buzzer'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_PINS), "PIN")
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_FREQ_HZ', '♪ frequency (Hz)') : '♪ frequency (Hz)'))
            .appendField(new Blockly.FieldNumber(880, 0), "FREQ")
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_DURATION_MS', '⊙ duration (ms)') : '⊙ duration (ms)'))
            .appendField(new Blockly.FieldNumber(100, 0), "DURATION");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_V1_HUE);
        this.setTooltip("Play a tone at a specific frequency for a given duration.");
    }
};

Blockly.Blocks['buzzer_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField((typeof _emmi_msg === 'function' ? _emmi_msg('EMMI_STOP_SOUND_ON', 'stop sound on') : 'stop sound on'))
            .appendField(new Blockly.FieldDropdown(EMMI_V1_BUZZER_PINS), "PIN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(EMMI_BUZZER_V1_HUE);
        this.setTooltip("Stop the buzzer / turn off tone.");
    }
};