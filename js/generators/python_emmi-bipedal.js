/**
 * EMMI Bipedal - Python (MicroPython) Code Generators
 * Mirrors the emmi-bot-v2_generators.js direct registration pattern
 */

// ─── SETUP ────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_configuration'] = function(block) {
  pythonGenerator.imports_['otto'] = 'from otto import Otto';
  pythonGenerator.definitions_['bipedal_instance'] = 'otto = Otto()';
  const yl = block.getFieldValue('PIN_YL');
  const yr = block.getFieldValue('PIN_YR');
  const rl = block.getFieldValue('PIN_RL');
  const rr = block.getFieldValue('PIN_RR');
  const bz = block.getFieldValue('PIN_Buzzer');
  return '# Bipedal setup: LeftLeg=' + yl + ' RightLeg=' + yr + ' LeftFoot=' + rl + ' RightFoot=' + rr + ' Buzzer=' + bz + '\n' +
         'otto.init(' + yl + ', ' + yr + ', ' + rl + ', ' + rr + ', True, ' + bz + ')\n' +
         'otto.home()\n';
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_home'] = function(block) {
  pythonGenerator.definitions_['otto_soft_home'] = 'def otto_soft_home():\n    otto._move_servos(500, [90, 90, 90, 90])\n';
  return 'otto_soft_home()\n';
};

// ─── CALIBRATION ──────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_calibration'] = function(block) {
  const ll = pythonGenerator.valueToCode(block, 'LL', pythonGenerator.ORDER_ATOMIC) || '0';
  const rl = pythonGenerator.valueToCode(block, 'RL', pythonGenerator.ORDER_ATOMIC) || '0';
  const lf = pythonGenerator.valueToCode(block, 'LF', pythonGenerator.ORDER_ATOMIC) || '0';
  const rf = pythonGenerator.valueToCode(block, 'RF', pythonGenerator.ORDER_ATOMIC) || '0';
  return 'otto.set_trims(' + ll + ', ' + rl + ', ' + lf + ', ' + rf + ')\n';
};

// ─── EEPROM ───────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_eeprom'] = function(block) {
  return 'otto.save_trims_on_eeprom()\n';
};

// ─── MOVE LEGS ────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_movelegs'] = function(block) {
  const yl = pythonGenerator.valueToCode(block, 'PIN_YL', pythonGenerator.ORDER_ATOMIC) || '90';
  const yr = pythonGenerator.valueToCode(block, 'PIN_YR', pythonGenerator.ORDER_ATOMIC) || '90';
  const rl = pythonGenerator.valueToCode(block, 'PIN_RL', pythonGenerator.ORDER_ATOMIC) || '90';
  const rr = pythonGenerator.valueToCode(block, 'PIN_RR', pythonGenerator.ORDER_ATOMIC) || '90';
  const t  = pythonGenerator.valueToCode(block, 'TEMPO',  pythonGenerator.ORDER_ATOMIC) || '500';
  return 'otto._move_servos(' + t + ', [' + yl + ', ' + yr + ', ' + rl + ', ' + rr + '])\n';
};

// ─── MOVE SERVOS ──────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_moveservos'] = function(block) {
  const period = pythonGenerator.valueToCode(block, 'Period', pythonGenerator.ORDER_ATOMIC) || '500';
  const pos    = pythonGenerator.valueToCode(block, 'Pos',    pythonGenerator.ORDER_ATOMIC) || '[90,90,90,90]';
  return 'otto._move_servos(' + period + ', ' + pos + ')\n';
};

// ─── MOVE ─────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_move'] = function(block) {
  const dir   = block.getFieldValue('otto_move_sens');
  const speed = block.getFieldValue('otto_move_speed');
  const dirMap = {
    'FORWARD':    'otto.walk(1, ' + speed + ', 1)',
    'BACKWARD':   'otto.walk(1, ' + speed + ', -1)',
    'LEFT':       'otto.turn(1, ' + speed + ', 1)',
    'RIGHT':      'otto.turn(1, ' + speed + ', -1)',
    'BENDLEFT':   'otto.bend(1, ' + speed + ', 1)',
    'BENDRIGHT':  'otto.bend(1, ' + speed + ', -1)',
    'SHAKELEFT':  'otto.shake_leg(1, ' + speed + ', -1)',
    'SHAKERIGHT': 'otto.shake_leg(1, ' + speed + ', 1)',
    'jump':       'otto.jump(1, ' + speed + ')'
  };
  return (dirMap[dir] || '# unknown move') + '\n';
};

// ─── DANCE ────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_dance'] = function(block) {
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
  return (movMap[mov] || '# unknown dance') + '\n';
};

// ─── DO ───────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_do'] = function(block) {
  const mov   = block.getFieldValue('otto_do_movement');
  const speed = block.getFieldValue('otto_move_speed');
  const size  = block.getFieldValue('otto_dance_size');
  return 'otto.' + mov + '(1, ' + speed + ', ' + size + ')\n';
};

// ─── SMOOTH ───────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto9_smooth'] = function(block) {
  const speed = block.getFieldValue('otto_move_speed') || '1000';
  const size  = block.getFieldValue('otto_dance_size') || '15';
  return 'otto.moonwalker(1, ' + speed + ', ' + size + ', 1)  # smooth criminal\n';
};

// ─── GESTURE ──────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_gesture'] = function(block) {
  const gesture = block.getFieldValue('otto_gesture');
  return 'otto.play_gesture(' + gesture + ')\n';
};

// ─── SOUND ────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_sound'] = function(block) {
  const sound = block.getFieldValue('otto_sound');
  return 'otto.sing(' + sound + ')\n';
};

// ─── TONE ─────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_tone'] = function(block) {
  const note     = block.getFieldValue('otto_note');
  const duration = block.getFieldValue('otto_note_duration');
  return 'otto.tone(' + note + ', ' + duration + ', 1)\n';
};

// ─── TONE HZ ──────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_tonehz'] = function(block) {
  const hz1      = pythonGenerator.valueToCode(block, 'Hz1',      pythonGenerator.ORDER_ATOMIC) || '440';
  const duration = pythonGenerator.valueToCode(block, 'duration', pythonGenerator.ORDER_ATOMIC) || '100';
  const silent   = pythonGenerator.valueToCode(block, 'silent',   pythonGenerator.ORDER_ATOMIC) || '0';
  return 'otto.tone(' + hz1 + ', ' + duration + ', ' + silent + ')\n';
};

// ─── BEND TONE ────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto_bendtone'] = function(block) {
  const hz1      = pythonGenerator.valueToCode(block, 'Hz1',      pythonGenerator.ORDER_ATOMIC) || '440';
  const hz2      = pythonGenerator.valueToCode(block, 'Hz2',      pythonGenerator.ORDER_ATOMIC) || '880';
  const prop     = pythonGenerator.valueToCode(block, 'prop',     pythonGenerator.ORDER_ATOMIC) || '1.02';
  const duration = pythonGenerator.valueToCode(block, 'duration', pythonGenerator.ORDER_ATOMIC) || '10';
  const silent   = pythonGenerator.valueToCode(block, 'silent',   pythonGenerator.ORDER_ATOMIC) || '1';
  return 'otto.bend_tones(' + hz1 + ', ' + hz2 + ', ' + prop + ', ' + duration + ', ' + silent + ')\n';
};

// ─── ESP32 SERVO HOME ─────────────────────────────────────────────────────────
pythonGenerator.forBlock['esp32servo_home'] = function(block) {
  pythonGenerator.imports_['servo'] = 'from servo import Servo';
  return 'left_leg.write(90)\nright_leg.write(90)\nleft_foot.write(90)\nright_foot.write(90)\n';
};

// ─── ESP32 SERVO MOVE ─────────────────────────────────────────────────────────
pythonGenerator.forBlock['esp32servo_move'] = function(block) {
  pythonGenerator.imports_['utime'] = 'import utime';
  const dir   = block.getFieldValue('esp32_move_sens');
  const speed = block.getFieldValue('esp32_move_speed');
  const dirMap = {
    'FORWARD':    'left_foot.write(110)\nright_foot.write(95)\nleft_leg.write(105)\nutime.sleep_ms(' + speed + ')\nright_foot.write(115)\nutime.sleep_ms(' + speed + ')\nright_leg.write(60)\nutime.sleep_ms(' + speed + ')\nleft_foot.write(90)\nright_foot.write(90)\nleft_leg.write(90)\nright_leg.write(90)\nutime.sleep_ms(' + speed + ')',
    'BACKWARD':   'left_foot.write(125)\nright_foot.write(55)\nutime.sleep_ms(' + speed + ')\nright_leg.write(120)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)\nright_leg.write(90)\nleft_foot.write(90)\nright_foot.write(90)',
    'LEFT':       'left_leg.write(120)\nright_leg.write(60)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)\nright_leg.write(90)',
    'RIGHT':      'left_leg.write(60)\nright_leg.write(120)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)\nright_leg.write(90)',
    'BENDLEFT':   'left_leg.write(70)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)',
    'BENDRIGHT':  'right_leg.write(110)\nutime.sleep_ms(' + speed + ')\nright_leg.write(90)',
    'SHAKERIGHT': 'right_leg.write(60)\nutime.sleep_ms(' + speed + ')\nright_leg.write(120)\nutime.sleep_ms(' + speed + ')\nright_leg.write(90)',
    'SHAKELEFT':  'left_leg.write(60)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(120)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)',
    'jump':       'left_leg.write(70)\nright_leg.write(70)\nutime.sleep_ms(' + speed + ')\nleft_leg.write(90)\nright_leg.write(90)'
  };
  return (dirMap[dir] || '# unknown direction') + '\n';
};

// ─── APP ──────────────────────────────────────────────────────────────────────
pythonGenerator.forBlock['otto9_app'] = function(block) {
  return '# Otto App Bluetooth logic omitted\n';
};

// ─── EMMI EYES DIGITAL ────────────────────────────────────────────────────────
pythonGenerator.forBlock['emmi_eyes_digital'] = function(block) {
  pythonGenerator.imports_['machine'] = 'from machine import Pin';
  var pinKey = block.getFieldValue('PIN');
  var state = block.getFieldValue('STATE');
  var pyVal = (state === 'HIGH') ? '1' : '0';
  var pinNum = 33;
  var pinVar = 'eye_red';

  if (pinKey === 'PIN_EYE_GREEN') {
      pinNum = 25;
      pinVar = 'eye_green';
  } else if (pinKey === 'PIN_EYE_BLUE') {
      pinNum = 32;
      pinVar = 'eye_blue';
  }

  pythonGenerator.definitions_['setup_eye_' + pinNum] = pinVar + ' = Pin(' + pinNum + ', Pin.OUT)';
  return pinVar + '.value(' + pyVal + ')\n';
};

// ─── IR DETECT WHITE ──────────────────────────────────────────────────────────
pythonGenerator.forBlock['ir_detect_white'] = function(block) {
  pythonGenerator.imports_['machine_adc'] = 'from machine import ADC, Pin';
  const side = block.getFieldValue('SIDE');
  const pin = (side === 'LEFT') ? '34' : '35';
  pythonGenerator.definitions_['ir_adc_' + pin] = 'ir_' + pin + ' = ADC(Pin(' + pin + '))\nir_' + pin + '.atten(ADC.ATTN_11DB)';
  var code = '(ir_' + pin + '.read() >= 3500)';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// ─── IR DETECT BLACK ──────────────────────────────────────────────────────────
pythonGenerator.forBlock['ir_detect_black'] = function(block) {
  pythonGenerator.imports_['machine_adc'] = 'from machine import ADC, Pin';
  const side = block.getFieldValue('SIDE');
  const pin = (side === 'LEFT') ? '34' : '35';
  pythonGenerator.definitions_['ir_adc_' + pin] = 'ir_' + pin + ' = ADC(Pin(' + pin + '))\nir_' + pin + '.atten(ADC.ATTN_11DB)';
  var code = '(ir_' + pin + '.read() < 3500)';
  return [code, pythonGenerator.ORDER_ATOMIC];
};
