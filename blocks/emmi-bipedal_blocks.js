/**
 * EMMI Bipedal / Otto - Block Definitions
 * Ported from EMMI_BOT_V2_WIRED
 */

// Helper: safe Blockly.Msg lookup with fallback
function _emmi_msg(key, fallback) {
    return (typeof Blockly !== 'undefined' && Blockly.Msg && Blockly.Msg[key]) ? Blockly.Msg[key] : fallback;
}

Blockly.Blocks['otto_configuration'] = {
    init: function() {
        var card = window.localStorage.card || 'mrtnodev1';
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
            .appendField(new Blockly.FieldDropdown([["26","26"], ["13","13"], ["12","12"], ["16","16"], ["17","17"]]), "PIN_Buzzer");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

Blockly.Blocks['otto_home'] = {
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

Blockly.Blocks['otto_calibration'] = {
    init: function() {
        this.appendValueInput("LL").setCheck("Number").appendField("🦿 " + _emmi_msg('OTTO9_CALIBRATION', 'calibrate ') + _emmi_msg('OTTO9_CALIBRATION_LEG', 'leg ') + _emmi_msg('left', 'left')).setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("RL").setCheck("Number").appendField(_emmi_msg('right', 'right')).setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("LF").setCheck("Number").appendField(_emmi_msg('OTTO9_CALIBRATION_FOOT', 'foot ') + _emmi_msg('left', 'left')).setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("RF").setCheck("Number").appendField(_emmi_msg('right', 'right')).setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

Blockly.Blocks['otto_eeprom'] = {
    init: function() {
        this.appendDummyInput("").appendField("💾 " + _emmi_msg('OTTO9_EEPROM_TEXT', 'save trims on EEPROM'));
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#ff6600");
    }
};

Blockly.Blocks['otto_movelegs'] = {
    init: function() {
        this.appendDummyInput("").appendField("🦿 " + _emmi_msg('OTTO9_MOVE_TEXT', 'move'));
        this.appendValueInput("PIN_YL").setCheck("Number").appendField(_emmi_msg('OTTO9_CALIBRATION_LEG', 'leg ') + _emmi_msg('left', 'left'));
        this.appendValueInput("PIN_YR").setCheck("Number").appendField(_emmi_msg('right', 'right'));
        this.appendValueInput("PIN_RL").setCheck("Number").appendField(_emmi_msg('OTTO9_CALIBRATION_FOOT', 'foot ') + _emmi_msg('left', 'left'));
        this.appendValueInput("PIN_RR").setCheck("Number").appendField(_emmi_msg('right', 'right'));
        this.appendValueInput("TEMPO").setCheck("Number").appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'));
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

Blockly.Blocks['otto_moveservos'] = {
    init: function() {
        this.appendDummyInput("").appendField("🦿 " + _emmi_msg('OTTO9_MOVE_TEXT', 'move'));
        this.appendValueInput("Period").setCheck("Number").appendField(_emmi_msg('OTTO9_MOVE_SPEED_TEXT', 'speed'));
        this.appendValueInput("Pos").setCheck("Number").appendField("Positions");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

Blockly.Blocks['otto_move'] = {
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

Blockly.Blocks['otto_dance'] = {
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

Blockly.Blocks['otto_do'] = {
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

Blockly.Blocks['otto9_smooth'] = {
    init: function() {
        this.appendDummyInput().appendField(new Blockly.FieldImage('media/smooth.png', 33, 33, "*")).appendField('Dance smooth criminal');
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

Blockly.Blocks['otto_gesture'] = {
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

Blockly.Blocks['otto_sound'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('media/otto_music.png', 22, 22, "*"))
            .appendField(_emmi_msg('OTTO9_SOUND_TEXT', 'sound'))
            .appendField(new Blockly.FieldDropdown([
                ["connection", "1"], ["disconnection", "2"], ["surprise", "3"], ["OhOoh", "4"], ["OhOoh2", "5"], 
                ["cuddly", "6"], ["sleeping", "7"], ["happy", "8"], ["superHappy", "9"], ["happy_short", "10"], 
                ["sad", "11"], ["confused", "12"], ["mode1", "16"], ["mode2", "17"], ["mode3", "18"], 
                ["buttonPushed", "19"], ["fart1", "13"], ["fart2", "14"], ["fart3", "15"]
            ]), "otto_sound");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF63BB");
    }
};

Blockly.Blocks['otto_tone'] = {
    init: function() {
        this.appendDummyInput().appendField("🎼")
            .appendField(new Blockly.FieldDropdown([
                ["C₄ | Do₄", "262"], ["D₄ | Re₄", "294"], ["E₄ | Mi₄", "330"], ["F₄ | Fa₄", "349"], ["G₄ | Sol₄", "392"], 
                ["A₄ | La₄", "440"], ["B₄ | Si₄", "494"], ["C₅ | Do₅", "523"], ["D₅ | Re₅", "587"], ["E₅ | Mi₅", "659"], 
                ["F₅ | Fa₅", "698"], ["G₅ | Sol₅", "784"], ["A₅ | La₅", "880"], ["B₅ | Si₅", "988"], ["C₆ | Do₆", "1047"], 
                ["D₆ | Re₆", "1175"], ["E₆ | Mi₆", "1319"], ["F₆ | Fa₆", "1397"], ["G₆ | Sol₆", "1568"], ["A₆ | La₆", "1760"], 
                ["B₆ | Si₆", "1976"]
            ]), "otto_note");
        this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(" ")
            .appendField(new Blockly.FieldDropdown([["\u266B", "125"], ["\u266A", "250"], ["\u2669", "500"], ["𝅗𝅥", "1000"], ["𝅝", "2000"]]), "otto_note_duration");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF63BB");
    }
};

Blockly.Blocks['otto_tonehz'] = {
    init: function() {
        this.appendDummyInput().appendField("🎼 Hz");
        this.appendValueInput("Hz1");
        this.appendValueInput("duration").setCheck("Number").appendField("⏰");
        this.appendValueInput("silent").setCheck("Number").appendField("🔇");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF63BB");
    }
};

Blockly.Blocks['otto_bendtone'] = {
    init: function() {
        this.appendDummyInput().appendField("🎼 Hz1");
        this.appendValueInput("Hz1");
        this.appendValueInput("Hz2").appendField("Hz2");
        this.appendValueInput("prop").setCheck("Number").appendField("P");
        this.appendValueInput("duration").setCheck("Number").appendField("⏰");
        this.appendValueInput("silent").setCheck("Number").appendField("🔇");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF63BB");
    }
};

Blockly.Blocks['otto9_app'] = {
    init: function() {
        this.appendDummyInput().appendField(new Blockly.FieldImage('media/bt.png', 33, 33, "*")).appendField('App code');
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#4759F5");
    }
};

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
