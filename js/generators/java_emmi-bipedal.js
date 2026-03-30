/**
 * EMMI Bipedal - Java (Educational Pseudocode) Code Generators
 * Uses direct javaGenerator.forBlock registration (same pattern as emmi-bot-v2_generators.js)
 */

// ─── SETUP ────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_configuration'] = function(block) {
  javaGenerator.imports_['otto'] = 'import otto.Otto;';
  const yl = block.getFieldValue('PIN_YL');
  const yr = block.getFieldValue('PIN_YR');
  const rl = block.getFieldValue('PIN_RL');
  const rr = block.getFieldValue('PIN_RR');
  const bz = block.getFieldValue('PIN_Buzzer');
  return '        // Bipedal setup: LeftLeg=' + yl + ' RightLeg=' + yr + ' LeftFoot=' + rl + ' RightFoot=' + rr + ' Buzzer=' + bz + '\n' +
         '        Otto otto = new Otto();\n' +
         '        otto.init(' + yl + ', ' + yr + ', ' + rl + ', ' + rr + ', true, ' + bz + ');\n' +
         '        otto.home();\n';
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_home'] = function(block) {
  javaGenerator.definitions_['otto_soft_home'] = '    private void otto_soft_home() {\n        otto._moveServos(500, new int[]{90, 90, 90, 90});\n    }';
  return '        otto_soft_home();\n';
};

// ─── CALIBRATION ──────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_calibration'] = function(block) {
  const ll = javaGenerator.valueToCode(block, 'LL', javaGenerator.ORDER_ATOMIC) || '0';
  const rl = javaGenerator.valueToCode(block, 'RL', javaGenerator.ORDER_ATOMIC) || '0';
  const lf = javaGenerator.valueToCode(block, 'LF', javaGenerator.ORDER_ATOMIC) || '0';
  const rf = javaGenerator.valueToCode(block, 'RF', javaGenerator.ORDER_ATOMIC) || '0';
  return '        otto.setTrims(' + ll + ', ' + rl + ', ' + lf + ', ' + rf + ');\n';
};

// ─── EEPROM ───────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_eeprom'] = function(block) {
  return '        otto.saveTrimsOnEEPROM();\n';
};

// ─── MOVE LEGS ────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_movelegs'] = function(block) {
  const yl = javaGenerator.valueToCode(block, 'PIN_YL', javaGenerator.ORDER_ATOMIC) || '90';
  const yr = javaGenerator.valueToCode(block, 'PIN_YR', javaGenerator.ORDER_ATOMIC) || '90';
  const rl = javaGenerator.valueToCode(block, 'PIN_RL', javaGenerator.ORDER_ATOMIC) || '90';
  const rr = javaGenerator.valueToCode(block, 'PIN_RR', javaGenerator.ORDER_ATOMIC) || '90';
  const t  = javaGenerator.valueToCode(block, 'TEMPO',  javaGenerator.ORDER_ATOMIC) || '500';
  return '        otto._moveServos(' + t + ', new int[]{' + yl + ', ' + yr + ', ' + rl + ', ' + rr + '});\n';
};

// ─── MOVE SERVOS ──────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_moveservos'] = function(block) {
  const period = javaGenerator.valueToCode(block, 'Period', javaGenerator.ORDER_ATOMIC) || '500';
  const pos    = javaGenerator.valueToCode(block, 'Pos',    javaGenerator.ORDER_ATOMIC) || 'new int[]{90,90,90,90}';
  return '        otto._moveServos(' + period + ', ' + pos + ');\n';
};

// ─── MOVE ─────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_move'] = function(block) {
  const dir   = block.getFieldValue('otto_move_sens');
  const speed = block.getFieldValue('otto_move_speed');
  const dirMap = {
    'FORWARD':    'otto.walk(1, ' + speed + ', 1)',
    'BACKWARD':   'otto.walk(1, ' + speed + ', -1)',
    'LEFT':       'otto.turn(1, ' + speed + ', 1)',
    'RIGHT':      'otto.turn(1, ' + speed + ', -1)',
    'BENDLEFT':   'otto.bend(1, ' + speed + ', 1)',
    'BENDRIGHT':  'otto.bend(1, ' + speed + ', -1)',
    'SHAKELEFT':  'otto.shakeLeg(1, ' + speed + ', -1)',
    'SHAKERIGHT': 'otto.shakeLeg(1, ' + speed + ', 1)',
    'jump':       'otto.jump(1, ' + speed + ')'
  };
  return '        ' + (dirMap[dir] || '/* unknown move */') + ';\n';
};

// ─── DANCE ────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_dance'] = function(block) {
  const mov   = block.getFieldValue('otto_dance_movement');
  const speed = block.getFieldValue('otto_move_speed');
  const size  = block.getFieldValue('otto_dance_size');
  const movMap = {
    'moonwalkerLEFT':  'otto.moonwalker(1, ' + speed + ', ' + size + ', 1)',
    'moonwalkerRIGHT': 'otto.moonwalker(1, ' + speed + ', ' + size + ', -1)',
    'crusaitoLEFT':    'otto.crusaito(1, ' + speed + ', ' + size + ', 1)',
    'crusaitoRIGHT':   'otto.crusaito(1, ' + speed + ', ' + size + ', -1)',
    'flappingFRONT':   'otto.flapping(1, ' + speed + ', ' + size + ', 1)',
    'flappingBACK':    'otto.flapping(1, ' + speed + ', ' + size + ', -1)'
  };
  return '        ' + (movMap[mov] || '/* unknown dance */') + ';\n';
};

// ─── DO ───────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_do'] = function(block) {
  const mov   = block.getFieldValue('otto_do_movement');
  const speed = block.getFieldValue('otto_move_speed');
  const size  = block.getFieldValue('otto_dance_size');
  return '        otto.' + mov + '(1, ' + speed + ', ' + size + ');\n';
};

// ─── SMOOTH ───────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto9_smooth'] = function(block) {
  const speed = block.getFieldValue('otto_move_speed') || '1000';
  const size  = block.getFieldValue('otto_dance_size') || '15';
  return '        otto.moonwalker(1, ' + speed + ', ' + size + ', 1); // smooth criminal\n';
};

// ─── GESTURE ──────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_gesture'] = function(block) {
  const gesture = block.getFieldValue('otto_gesture');
  return '        otto.playGesture(' + gesture + ');\n';
};

// ─── SOUND ────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_sound'] = function(block) {
  const sound = block.getFieldValue('otto_sound');
  return '        otto.sing(' + sound + ');\n';
};

// ─── TONE ─────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_tone'] = function(block) {
  const note     = block.getFieldValue('otto_note');
  const duration = block.getFieldValue('otto_note_duration');
  return '        otto._tone(' + note + ', ' + duration + ', 1);\n';
};

// ─── TONE HZ ──────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_tonehz'] = function(block) {
  const hz1      = javaGenerator.valueToCode(block, 'Hz1',      javaGenerator.ORDER_ATOMIC) || '440';
  const duration = javaGenerator.valueToCode(block, 'duration', javaGenerator.ORDER_ATOMIC) || '100';
  const silent   = javaGenerator.valueToCode(block, 'silent',   javaGenerator.ORDER_ATOMIC) || '0';
  return '        otto._tone(' + hz1 + ', ' + duration + ', ' + silent + ');\n';
};

// ─── BEND TONE ────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto_bendtone'] = function(block) {
  const hz1      = javaGenerator.valueToCode(block, 'Hz1',      javaGenerator.ORDER_ATOMIC) || '440';
  const hz2      = javaGenerator.valueToCode(block, 'Hz2',      javaGenerator.ORDER_ATOMIC) || '880';
  const prop     = javaGenerator.valueToCode(block, 'prop',     javaGenerator.ORDER_ATOMIC) || '1.02';
  const duration = javaGenerator.valueToCode(block, 'duration', javaGenerator.ORDER_ATOMIC) || '10';
  const silent   = javaGenerator.valueToCode(block, 'silent',   javaGenerator.ORDER_ATOMIC) || '1';
  return '        otto.bendTones(' + hz1 + ', ' + hz2 + ', ' + prop + ', ' + duration + ', ' + silent + ');\n';
};

// ─── ESP32 SERVO HOME ─────────────────────────────────────────────────────────
javaGenerator.forBlock['esp32servo_home'] = function(block) {
  return '        leftLeg.write(90);\n        rightLeg.write(90);\n        leftFoot.write(90);\n        rightFoot.write(90);\n';
};

// ─── ESP32 SERVO MOVE ─────────────────────────────────────────────────────────
javaGenerator.forBlock['esp32servo_move'] = function(block) {
  const dir   = block.getFieldValue('esp32_move_sens');
  const speed = block.getFieldValue('esp32_move_speed');
  const dirMap = {
    'FORWARD':    'leftFoot.write(110);\n        rightFoot.write(95);\n        leftLeg.write(105);\n        delay(' + speed + ');\n        rightFoot.write(115);\n        delay(' + speed + ');\n        rightLeg.write(60);\n        delay(' + speed + ');\n        leftFoot.write(90);\n        rightFoot.write(90);\n        leftLeg.write(90);\n        rightLeg.write(90);\n        delay(' + speed + ');',
    'BACKWARD':   'leftFoot.write(125);\n        rightFoot.write(55);\n        delay(' + speed + ');\n        rightLeg.write(120);\n        delay(' + speed + ');\n        leftLeg.write(90);\n        rightLeg.write(90);\n        leftFoot.write(90);\n        rightFoot.write(90);',
    'LEFT':       'leftLeg.write(120);\n        rightLeg.write(60);\n        delay(' + speed + ');\n        leftLeg.write(90);\n        rightLeg.write(90);',
    'RIGHT':      'leftLeg.write(60);\n        rightLeg.write(120);\n        delay(' + speed + ');\n        leftLeg.write(90);\n        rightLeg.write(90);',
    'BENDLEFT':   'leftLeg.write(70);\n        delay(' + speed + ');\n        leftLeg.write(90);',
    'BENDRIGHT':  'rightLeg.write(110);\n        delay(' + speed + ');\n        rightLeg.write(90);',
    'SHAKERIGHT': 'rightLeg.write(60);\n        delay(' + speed + ');\n        rightLeg.write(120);\n        delay(' + speed + ');\n        rightLeg.write(90);',
    'SHAKELEFT':  'leftLeg.write(60);\n        delay(' + speed + ');\n        leftLeg.write(120);\n        delay(' + speed + ');\n        leftLeg.write(90);',
    'jump':       'leftLeg.write(70);\n        rightLeg.write(70);\n        delay(' + speed + ');\n        leftLeg.write(90);\n        rightLeg.write(90);'
  };
  return '        ' + (dirMap[dir] || '/* unknown direction */') + '\n';
};

// ─── APP ──────────────────────────────────────────────────────────────────────
javaGenerator.forBlock['otto9_app'] = function(block) {
  return '        // Otto App Bluetooth logic omitted\n';
};

// ─── EMMI EYES DIGITAL ────────────────────────────────────────────────────────
javaGenerator.forBlock['emmi_eyes_digital'] = function(block) {
  var pinKey = block.getFieldValue('PIN');
  var state = block.getFieldValue('STATE');
  var pinNum = 33;

  if (pinKey === 'PIN_EYE_GREEN') pinNum = 25;
  else if (pinKey === 'PIN_EYE_BLUE') pinNum = 32;

  return '        gpio.digitalWrite(' + pinNum + ', GPIO.' + state + ');\n';
};

// ─── IR DETECT WHITE ──────────────────────────────────────────────────────────
javaGenerator.forBlock['ir_detect_white'] = function(block) {
  const side = block.getFieldValue('SIDE');
  const pin = (side === 'LEFT') ? '34' : '35';
  return ['(analogRead(' + pin + ') >= 3895)', javaGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT BLACK ──────────────────────────────────────────────────────────
javaGenerator.forBlock['ir_detect_black'] = function(block) {
  const side = block.getFieldValue('SIDE');
  const pin = (side === 'LEFT') ? '34' : '35';
  return ['(analogRead(' + pin + ') <= 2500)', javaGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT NEITHER ────────────────────────────────────────────────────────
javaGenerator.forBlock['ir_detect_neither'] = function(block) {
  const side = block.getFieldValue('SIDE');
  const pin = (side === 'LEFT') ? '34' : '35';
  return ['(analogRead(' + pin + ') > 2500 && analogRead(' + pin + ') < 3895)', javaGenerator.ORDER_ATOMIC];
};
