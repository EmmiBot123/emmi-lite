/**
 * EMMI Bipedal - Arduino C++ Code Generators
 * Uses direct arduinoGenerator.forBlock registration (same as emmi-bot-v2_generators.js)
 */

// ─── SETUP ────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_configuration'] = function(block) {
  var PIN_YL      = block.getFieldValue('PIN_YL');
  var PIN_YR      = block.getFieldValue('PIN_YR');
  var PIN_RL      = block.getFieldValue('PIN_RL');
  var PIN_RR      = block.getFieldValue('PIN_RR');
  var PIN_Buzzer  = block.getFieldValue('PIN_Buzzer');

  arduinoGenerator.includes_['otto_lib'] = '#include <Otto.h>\nOtto Otto;';
  arduinoGenerator.definitions_['otto_legs'] =
    '#define LeftLeg '  + PIN_YL + ' // left leg pin, servo[0]\n'
    + '#define RightLeg ' + PIN_YR + ' // right leg pin, servo[1]\n'
    + '#define LeftFoot ' + PIN_RL + ' // left foot pin, servo[2]\n'
    + '#define RightFoot '+ PIN_RR + ' // right foot pin, servo[3]\n'
    + '#define Buzzer '   + PIN_Buzzer + ' //buzzer pin \n';
  arduinoGenerator.setupCode_['otto_init'] =
    'Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer);\nOtto.home();\n';
  return '';
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_home'] = function(block) {
  arduinoGenerator.definitions_['otto_soft_home'] =
    'void otto_soft_home() {\n  int homes[4]={90, 90, 90, 90};\n  Otto._moveServos(500, homes);\n}';
  return 'otto_soft_home();\n';
};

// ─── CALIBRATION ──────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_calibration'] = function(block) {
  var ll = arduinoGenerator.valueToCode(block, 'LL', arduinoGenerator.ORDER_ATOMIC);
  var rl = arduinoGenerator.valueToCode(block, 'RL', arduinoGenerator.ORDER_ATOMIC);
  var lf = arduinoGenerator.valueToCode(block, 'LF', arduinoGenerator.ORDER_ATOMIC);
  var rf = arduinoGenerator.valueToCode(block, 'RF', arduinoGenerator.ORDER_ATOMIC);
  return 'Otto.setTrims(' + ll + ',' + rl + ',' + lf + ',' + rf + ');\n';
};

// ─── EEPROM ───────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_eeprom'] = function(block) {
  return 'Otto.saveTrimsOnEEPROM();\n';
};

// ─── MOVE LEGS ────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_movelegs'] = function(block) {
  var yl    = arduinoGenerator.valueToCode(block, 'PIN_YL', arduinoGenerator.ORDER_ATOMIC);
  var yr    = arduinoGenerator.valueToCode(block, 'PIN_YR', arduinoGenerator.ORDER_ATOMIC);
  var rl    = arduinoGenerator.valueToCode(block, 'PIN_RL', arduinoGenerator.ORDER_ATOMIC);
  var rr    = arduinoGenerator.valueToCode(block, 'PIN_RR', arduinoGenerator.ORDER_ATOMIC);
  var tempo = arduinoGenerator.valueToCode(block, 'TEMPO',  arduinoGenerator.ORDER_ATOMIC);
  arduinoGenerator.definitions_['otto_movelegs'] =
    'void Otto_moveLegs(int T, int posLegL, int posLegR, int posFootL, int posFootR) { ' +
    '  int posLegs[]={ posLegL,posLegR,posFootL,posFootR }; ' +
    '  Otto._moveServos(T,posLegs); }';
  return 'Otto_moveLegs(' + tempo + ',' + yl + ',' + yr + ',' + rl + ',' + rr + ');\n';
};

// ─── MOVE SERVOS ──────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_moveservos'] = function(block) {
  var period = arduinoGenerator.valueToCode(block, 'Period', arduinoGenerator.ORDER_ATOMIC);
  var pos    = arduinoGenerator.valueToCode(block, 'Pos',    arduinoGenerator.ORDER_ATOMIC);
  return 'Otto._moveServos(' + period + ', ' + pos + ');\n';
};

// ─── MOVE ─────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_move'] = function(block) {
  var dir   = block.getFieldValue('otto_move_sens');
  var speed = block.getFieldValue('otto_move_speed');
  var code  = '';
  switch(dir) {
    case 'FORWARD':    code = 'Otto.walk(1,' + speed + ',1);\n';       break;
    case 'BACKWARD':   code = 'Otto.walk(1,' + speed + ',-1);\n';      break;
    case 'LEFT':       code = 'Otto.turn(1,' + speed + ',1);\n';       break;
    case 'RIGHT':      code = 'Otto.turn(1,' + speed + ',-1);\n';      break;
    case 'BENDLEFT':   code = 'Otto.bend(1,' + speed + ',1);\n';       break;
    case 'BENDRIGHT':  code = 'Otto.bend(1,' + speed + ',-1);\n';      break;
    case 'SHAKELEFT':  code = 'Otto.shakeLeg(1,' + speed + ',-1);\n';  break;
    case 'SHAKERIGHT': code = 'Otto.shakeLeg(1,' + speed + ',1);\n';   break;
    case 'jump':       code = 'Otto.jump(1,' + speed + ');\n';         break;
  }
  return code;
};

// ─── DANCE ────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_dance'] = function(block) {
  var mov   = block.getFieldValue('otto_dance_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  var code  = '';
  switch(mov) {
    case 'moonwalkerLEFT':  code = 'Otto.moonwalker(1, ' + speed + ', ' + size + ', 1);\n';  break;
    case 'moonwalkerRIGHT': code = 'Otto.moonwalker(1, ' + speed + ', ' + size + ', -1);\n'; break;
    case 'crusaitoLEFT':    code = 'Otto.crusaito(1, ' + speed + ', ' + size + ', 1);\n';    break;
    case 'crusaitoRIGHT':   code = 'Otto.crusaito(1, ' + speed + ', ' + size + ', -1);\n';   break;
    case 'flappingFRONT':   code = 'Otto.flapping(1, ' + speed + ', ' + size + ', 1);\n';   break;
    case 'flappingBACK':    code = 'Otto.flapping(1, ' + speed + ', ' + size + ', -1);\n';  break;
  }
  return code;
};

// ─── DO ───────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_do'] = function(block) {
  var mov   = block.getFieldValue('otto_do_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  return 'Otto.' + mov + '(1, ' + speed + ', ' + size + ');\n';
};

// ─── SMOOTH ───────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto9_smooth'] = function(block) {
  return '// Smooth criminal logic omitted for brevity\n';
};

// ─── APP ──────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto9_app'] = function(block) {
  return '// Otto App Bluetooth logic omitted for brevity\n';
};

// ─── GESTURE ──────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_gesture'] = function(block) {
  var gesture = block.getFieldValue('otto_gesture');
  return 'Otto.playGesture(' + gesture + ');\n';
};

// ─── SOUND ────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_sound'] = function(block) {
  var sound = block.getFieldValue('otto_sound');
  return 'Otto.sing(' + sound + ');\n';
};

// ─── TONE ─────────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_tone'] = function(block) {
  var note     = block.getFieldValue('otto_note');
  var duration = block.getFieldValue('otto_note_duration');
  return 'Otto._tone( ' + note + ',' + duration + ',1);\n';
};

// ─── TONE HZ ──────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_tonehz'] = function(block) {
  var hz1      = arduinoGenerator.valueToCode(block, 'Hz1',      arduinoGenerator.ORDER_ATOMIC) || '440';
  var duration = arduinoGenerator.valueToCode(block, 'duration', arduinoGenerator.ORDER_ATOMIC) || '100';
  var silent   = arduinoGenerator.valueToCode(block, 'silent',   arduinoGenerator.ORDER_ATOMIC) || '0';
  return 'Otto._tone( ' + hz1 + ',' + duration + ',' + silent + ');\n';
};

// ─── BEND TONE ────────────────────────────────────────────────────────────────
arduinoGenerator.forBlock['otto_bendtone'] = function(block) {
  var hz1      = arduinoGenerator.valueToCode(block, 'Hz1',      arduinoGenerator.ORDER_ATOMIC) || '440';
  var hz2      = arduinoGenerator.valueToCode(block, 'Hz2',      arduinoGenerator.ORDER_ATOMIC) || '880';
  var prop     = arduinoGenerator.valueToCode(block, 'prop',     arduinoGenerator.ORDER_ATOMIC) || '1.02';
  var duration = arduinoGenerator.valueToCode(block, 'duration', arduinoGenerator.ORDER_ATOMIC) || '10';
  var silent   = arduinoGenerator.valueToCode(block, 'silent',   arduinoGenerator.ORDER_ATOMIC) || '1';
  return 'Otto.bendTones( ' + hz1 + ',' + hz2 + ',' + prop + ',' + duration + ',' + silent + ');\n';
};

// ─── ESP32 SERVO HOME ─────────────────────────────────────────────────────────
arduinoGenerator.forBlock['esp32servo_home'] = function(block) {
  return 'leftLeg.write(90);\nrightLeg.write(90);\nleftFoot.write(90);\nrightFoot.write(90);\n';
};

// ─── ESP32 SERVO MOVE ─────────────────────────────────────────────────────────
arduinoGenerator.forBlock['esp32servo_move'] = function(block) {
  var dir   = block.getFieldValue('esp32_move_sens');
  var t     = block.getFieldValue('esp32_move_speed');
  var code  = '';
  switch(dir) {
    case 'FORWARD':
      code = 'leftFoot.write(110);\nrightFoot.write(95);\nleftLeg.write(105);\ndelay(' + t + ');\n'
           + 'rightFoot.write(115);\ndelay(' + t + ');\n'
           + 'rightLeg.write(60);\ndelay(' + t + ');\n'
           + 'rightFoot.write(90);\nleftFoot.write(90);\nleftLeg.write(90);\nrightLeg.write(90);\ndelay(' + t + ');\n';
      break;
    case 'BACKWARD':
      code = 'leftFoot.write(125);\nrightFoot.write(55);\ndelay(' + t + ');\n'
           + 'rightLeg.write(120);\ndelay(' + t + ');\n'
           + 'leftLeg.write(90);\nrightLeg.write(90);\nleftFoot.write(90);\nrightFoot.write(90);\n';
      break;
    case 'LEFT':
      code = 'leftLeg.write(120);\nrightLeg.write(60);\ndelay(' + t + ');\n'
           + 'leftLeg.write(90);\nrightLeg.write(90);\n';
      break;
    case 'RIGHT':
      code = 'leftLeg.write(60);\nrightLeg.write(120);\ndelay(' + t + ');\n'
           + 'leftLeg.write(90);\nrightLeg.write(90);\n';
      break;
    case 'BENDLEFT':
      code = 'leftLeg.write(70);\ndelay(' + t + ');\nleftLeg.write(90);\n';   break;
    case 'BENDRIGHT':
      code = 'rightLeg.write(110);\ndelay(' + t + ');\nrightLeg.write(90);\n'; break;
    case 'SHAKERIGHT':
      code = 'rightLeg.write(60);\ndelay(' + t + ');\nrightLeg.write(120);\ndelay(' + t + ');\nrightLeg.write(90);\n'; break;
    case 'SHAKELEFT':
      code = 'leftLeg.write(60);\ndelay(' + t + ');\nleftLeg.write(120);\ndelay(' + t + ');\nleftLeg.write(90);\n';   break;
    case 'jump':
      code = 'leftLeg.write(70);\nrightLeg.write(70);\ndelay(' + t + ');\nleftLeg.write(90);\nrightLeg.write(90);\n'; break;
  }
  return code;
};

// ─── LINE FOLLOWER IR LEFT ────────────────────────────────────────────────────
arduinoGenerator.forBlock['linefollower_ir_left'] = function(block) {
  var PinIR  = block.getFieldValue('PIN_IR');
  var Status = block.getFieldValue('OUTPUT_VALUE');
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);\n';
  var code = (Status == '0')
    ? 'map(analogRead(' + PinIR + '), 0, 4095, 0, 100)'
    : 'analogRead(' + PinIR + ')';
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

// ─── LINE FOLLOWER IR RIGHT ───────────────────────────────────────────────────
arduinoGenerator.forBlock['linefollower_ir_right'] = function(block) {
  var PinIR  = block.getFieldValue('PIN_IR');
  var Status = block.getFieldValue('OUTPUT_VALUE');
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);\n';
  var code = (Status == '0')
    ? 'map(analogRead(' + PinIR + '), 0, 4095, 0, 100)'
    : 'analogRead(' + PinIR + ')';
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT WHITE ──────────────────────────────────────────────────────────
arduinoGenerator.forBlock['ir_detect_white'] = function(block) {
  var side = block.getFieldValue('SIDE');
  var pin = (side === 'LEFT') ? '34' : '35';
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);\n';
  var code = '(analogRead(' + pin + ') >= 3895)';
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT BLACK ──────────────────────────────────────────────────────────
arduinoGenerator.forBlock['ir_detect_black'] = function(block) {
  var side = block.getFieldValue('SIDE');
  var pin = (side === 'LEFT') ? '34' : '35';
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);\n';
  var code = '(analogRead(' + pin + ') <= 2500)';
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT NEITHER ────────────────────────────────────────────────────────
arduinoGenerator.forBlock['ir_detect_neither'] = function(block) {
  var side = block.getFieldValue('SIDE');
  var pin = (side === 'LEFT') ? '34' : '35';
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);\n';
  var code = '(analogRead(' + pin + ') > 2500 && analogRead(' + pin + ') < 3895)';
  return [code, arduinoGenerator.ORDER_ATOMIC];
};

// ─── FLIPPER WHEELS INIT ──────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_wheels_init'] = function(block) {
  arduinoGenerator.includes_['otto9_wheels'] =
      'const int pinl = 16;\n'
    + 'const int pinr = 2; \n'
    + 'const int pinl1 = 17;\n'
    + 'const int pinr2 = 4;\n';
  arduinoGenerator.setupCode_['otto9_initw'] =
      'pinMode(pinl, OUTPUT);\n'
    + 'pinMode(pinr, OUTPUT);\n'
    + 'pinMode(pinl1, OUTPUT);\n'
    + 'pinMode(pinr2, OUTPUT);\n';
  return '';
};

// ─── FLIPPER WHEELS MOVE ──────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_wheels_move'] = function(block) {
  var motion = block.getFieldValue('MOTION');
  var code   = '';
  switch(motion) {
    case 'FORWARD':
      code = 'digitalWrite(pinl, HIGH);\ndigitalWrite(pinr, LOW);\ndigitalWrite(pinl1, LOW);\ndigitalWrite(pinr2, HIGH);\n'; break;
    case 'BACKWARD':
      code = 'digitalWrite(pinl, LOW);\ndigitalWrite(pinr, HIGH);\ndigitalWrite(pinl1, HIGH);\ndigitalWrite(pinr2, LOW);\n'; break;
    case 'LEFT':
      code = 'digitalWrite(pinl, HIGH);\ndigitalWrite(pinr, LOW);\ndigitalWrite(pinl1, HIGH);\ndigitalWrite(pinr2, LOW);\n'; break;
    case 'RIGHT':
      code = 'digitalWrite(pinl, LOW);\ndigitalWrite(pinr, HIGH);\ndigitalWrite(pinl1, LOW);\ndigitalWrite(pinr2, HIGH);\n'; break;
    case 'STOP':
      code = 'digitalWrite(pinl, LOW);\ndigitalWrite(pinr, LOW);\ndigitalWrite(pinl1, LOW);\ndigitalWrite(pinr2, LOW);\n'; break;
  }
  return code;
};

// ─── EMMI EYES DIGITAL ────────────────────────────────────────────────────────
arduinoGenerator.forBlock['emmi_eyes_digital'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var state  = block.getFieldValue('STATE');
  var pinNum = 33; // Default RED
  if (pinKey === 'PIN_EYE_GREEN') pinNum = 25;
  else if (pinKey === 'PIN_EYE_BLUE') pinNum = 32;

  arduinoGenerator.setupCode_['setup_eye_' + pinNum] = 'pinMode(' + pinNum + ', OUTPUT);';
  return 'digitalWrite(' + pinNum + ', ' + state + ');\n';
};

// ─── FLIPPER OLED INIT ────────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_oled_init'] = function(block) {
  arduinoGenerator.includes_['oled_lib'] =
    '#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SH110X.h>';
  arduinoGenerator.definitions_['oled_obj'] =
    'Adafruit_SH1106G display = Adafruit_SH1106G(128, 64, &Wire, -1);';
  arduinoGenerator.setupCode_['oled_init'] =
    'Wire.begin(21, 22);\ndisplay.begin(0x3C, true);\ndisplay.clearDisplay();\ndisplay.display();';
  return '';
};

// ─── FLIPPER OLED CLEAR ───────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_oled_clear'] = function(block) {
  return 'display.clearDisplay();\ndisplay.display();\n';
};

// ─── FLIPPER RGB RED ──────────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_rgb_red'] = function(block) {
  var state = block.getFieldValue('STATE');
  arduinoGenerator.setupCode_['setup_rgb_red'] = 'pinMode(18, OUTPUT);';
  return 'digitalWrite(18, ' + state + ');\n';
};

// ─── FLIPPER RGB GREEN ────────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_rgb_green'] = function(block) {
  var state = block.getFieldValue('STATE');
  arduinoGenerator.setupCode_['setup_rgb_green'] = 'pinMode(17, OUTPUT);';
  return 'digitalWrite(17, ' + state + ');\n';
};

// ─── FLIPPER RGB BLUE ─────────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_rgb_blue'] = function(block) {
  var state = block.getFieldValue('STATE');
  arduinoGenerator.setupCode_['setup_rgb_blue'] = 'pinMode(19, OUTPUT);';
  return 'digitalWrite(19, ' + state + ');\n';
};

// ─── FLIPPER ULTRASONIC INIT ──────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_ultrasonic_init'] = function(block) {
  var num  = block.getFieldValue('US_NUMBER');
  var trig = block.getFieldValue('PIN_TRIG');
  var echo = block.getFieldValue('PIN_ECHO');
  arduinoGenerator.definitions_['us_vars_' + num] =
    'const int trigPin' + num + ' = ' + trig + ';\nconst int echoPin' + num + ' = ' + echo + ';';
  arduinoGenerator.setupCode_['us_setup_' + num] =
    'pinMode(trigPin' + num + ', OUTPUT);\npinMode(echoPin' + num + ', INPUT);';
  return '';
};

// ─── FLIPPER ULTRASONIC DISTANCE ──────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_ultrasonic_distance'] = function(block) {
  var num = block.getFieldValue('US_NUMBER');
  arduinoGenerator.definitions_['us_dist_fn_' + num] =
    'long getDistance' + num + '() {\n'
    + '  digitalWrite(trigPin' + num + ', LOW); delayMicroseconds(2);\n'
    + '  digitalWrite(trigPin' + num + ', HIGH); delayMicroseconds(10);\n'
    + '  digitalWrite(trigPin' + num + ', LOW);\n'
    + '  long dur = pulseIn(echoPin' + num + ', HIGH);\n'
    + '  return dur * 0.034 / 2;\n'
    + '}';
  return ['getDistance' + num + '()', arduinoGenerator.ORDER_ATOMIC];
};

// ─── FLIPPER TOUCH READ ───────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_touch_read'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var pinNum = (pin === 'PIN_TOUCH') ? '32' : pin;
  arduinoGenerator.setupCode_['setup_touch_' + pinNum] = 'pinMode(' + pinNum + ', INPUT);';
  return ['digitalRead(' + pinNum + ')', arduinoGenerator.ORDER_ATOMIC];
};

// ─── FLIPPER LIGHT READ ───────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_light_read'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var pinNum = (pin === 'LDR') ? '34' : pin;
  arduinoGenerator.setupCode_['setup_analogResolutionESP32'] = 'analogReadResolution(12);';
  return ['analogRead(' + pinNum + ')', arduinoGenerator.ORDER_ATOMIC];
};

// ─── FLIPPER SPEAKER INIT ─────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_speaker_init'] = function(block) {
  arduinoGenerator.includes_['flipper_speaker'] = '#include "AudioOutput.h"';
  arduinoGenerator.setupCode_['flipper_speaker_init'] = 'audioInit();';
  return '';
};

// ─── FLIPPER SPEAKER PLAY ─────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_speaker_play'] = function(block) {
  var voiceId = block.getFieldValue('VOICE_ID');
  return 'audioPlay("' + voiceId + '");\n';
};

// ─── FLIPPER SPEAKER STOP ─────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_speaker_stop'] = function(block) {
  return 'audioStop();\n';
};

// ─── FLIPPER BUZZER RTTTL ─────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_buzzer_rtttl'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var melody = block.getFieldValue('MELODY');
  arduinoGenerator.includes_['flipper_buzzer'] = '#include <Buzzer.h>';
  arduinoGenerator.definitions_['flipper_buzzer_obj'] = 'Buzzer buzzer(' + pin + ');';
  return 'buzzer.playRtttl("' + melody + '");\n';
};

// ─── FLIPPER BUZZER NOTE ──────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_buzzer_note'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var note = block.getFieldValue('NOTE');
  var tempo = block.getFieldValue('TEMPO');
  arduinoGenerator.includes_['flipper_buzzer'] = '#include <Buzzer.h>';
  arduinoGenerator.definitions_['flipper_buzzer_obj'] = 'Buzzer buzzer(' + pin + ');';
  return 'tone(' + pin + ', ' + note + ', ' + tempo + ');\ndelay(' + tempo + ');\nnoTone(' + pin + ');\n';
};

// ─── FLIPPER BUZZER TONE ──────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_buzzer_tone'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var freq = block.getFieldValue('FREQ');
  var duration = block.getFieldValue('DURATION');
  return 'tone(' + pin + ', ' + freq + ', ' + duration + ');\ndelay(' + duration + ');\nnoTone(' + pin + ');\n';
};

// ─── FLIPPER BUZZER STOP ──────────────────────────────────────────────────────
arduinoGenerator.forBlock['flipper_buzzer_stop'] = function(block) {
  var pin = block.getFieldValue('PIN');
  return 'noTone(' + pin + ');\n';
};

