'use strict';

/**
 * EMMI V1 - Arduino Generators for OLED blocks
 * Ported from EMMI_BOT_V2_WIRED
 */

const getGenV1 = () => typeof arduinoGenerator !== 'undefined' ? arduinoGenerator : Blockly.Arduino;

// Init OLED 1.3" I²C (ESP32)
getGenV1().forBlock['OLED_cust'] = function(block) {
  getGenV1().includes_['OLED'] = '#include <Wire.h>\n' +
                                  '#include <Adafruit_GFX.h>\n' +
                                  '#include <Adafruit_SH110X.h>';
  getGenV1().definitions_['OLED'] = 'Adafruit_SH1106G display = Adafruit_SH1106G(128, 64, &Wire, -1);';
  getGenV1().setupCode_['OLED'] = 'Wire.begin(21, 22);\n' +
                                   'delay(100);\n' +
                                   'display.begin(0x3C, true);\n' +
                                   'display.setRotation(0);\n' +
                                   'display.clearDisplay();\n' +
                                   'display.display();\n';
  return "";
};

// OLED Eyes
getGenV1().forBlock['OLED_eyes'] = function(block) {
  var oled_eyes = block.getFieldValue('oled_eyes');
  getGenV1().variables_['oledeyes'] =
  'int x = 34; // x eye position \n'
  +'int y = 32; //y eye position\n'
  +'int r = 22; // radius\n'
  +'int t = 8; //thickness\n'
  +'int x2 = 128-x; // 2nd x eye position \n';
  getGenV1().definitions_['oledeyes'] =
  'void NinjaEyesAwake()\n'
+'{ u8g2.setDrawColor(1);u8g2.drawDisc(x,y,r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.setDrawColor(1);u8g2.drawDisc(x2, y, r); u8g2.setDrawColor(0);u8g2.drawDisc(x2, y, r-t);   }\n'
+'void NinjaEyesHappy()\n'
+'{ u8g2.setDrawColor(1); u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.setDrawColor(1);u8g2.drawDisc(x+(t+r)*2, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x+(t+r)*2, y, r-t);u8g2.drawBox(x-r, y, r*2+1, r+2+1);u8g2.drawBox(x-r+(t+r)*2, y, r*2+1, r+2); }\n'
+'void NinjaEyesWorried()\n'
+'{ u8g2.setDrawColor(1); u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.drawTriangle(x-r, y-r, x+r, y-r, x-r,y+r);u8g2.setDrawColor(1);u8g2.drawDisc(x+(t+r)*2, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x+(t+r)*2, y, r-t);u8g2.drawTriangle(x+(t+r)*2-r, y-r, (x+(t+r)*2)+r, y-r, (x+(t+r)*2)+r,y+r);}\n'
+'void NinjaEyesAngry()\n'
+'{ u8g2.setDrawColor(1); u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.drawTriangle(x-r, y-r, x+r+1, y-r, x+r+1,y+r);u8g2.setDrawColor(1);u8g2.drawDisc(x+t+r*2, y, r);  u8g2.setDrawColor(0);u8g2.drawDisc(x+t+r*2, y, r-t);u8g2.drawTriangle(x+t+r*2-r, y-r, (x+t+r*2)+r, y-r, (x+t+r*2)-r,y+r);}\n'
+'void NinjaEyesSleep()\n'
+'{ u8g2.setDrawColor(1);u8g2.drawBox(x-r, y-t/2, r*2, t);u8g2.drawBox(x-r+(t+r)*2, y-t/2, r*2, t);  }\n'
+'void NinjaEyesSad()\n'
+'{ u8g2.setDrawColor(1);u8g2.drawBox(x-r, y, r*2, t);u8g2.drawBox(x-r+(t+r)*2, y, r*2, t); }\n'
+'void NinjaEyesTired()\n'
+'{ u8g2.setDrawColor(1); u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.setDrawColor(1); u8g2.drawDisc(x+(t+r)*2, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x+(t+r)*2, y, r-t);u8g2.drawBox(x-r, y-r, r*2+2, r);u8g2.drawBox(x-r+(t+r)*2, y-r, r*2+2, r);}\n'
+'void NinjaEyesWinkl()\n'
+'{ u8g2.setDrawColor(1); u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.setDrawColor(1);u8g2.drawDisc(x+(t+r)*2, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x+(t+r)*2, y, r-t);u8g2.setDrawColor(0);u8g2.drawBox(x-r+(t+r)*2, y-r, r*2+2, r); }\n'
+'void NinjaEyesWinkr()\n'
+'{ u8g2.setDrawColor(1);u8g2.drawDisc(x, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x, y, r-t);u8g2.setDrawColor(1);u8g2.drawDisc(x+(t+r)*2, y, r);u8g2.setDrawColor(0);u8g2.drawDisc(x+(t+r)*2, y, r-t);u8g2.drawBox(x-r, y-r, r*2+2, r);  }\n'
+'void NinjaEyeseyes1()\n'
+'{ NinjaEyesAwake(); }\n';
  var code = 'u8g2.clearBuffer();\n'
  +'NinjaEyes'+oled_eyes+'();\n'
  +'u8g2.sendBuffer(); \n';
  return code;
};

// OLED Clear
getGenV1().forBlock['OLED_clear'] = function(block) {
  return 'display.clearDisplay();\n';
};

// Ultrasonic Sensor Setup
getGenV1().forBlock['ultrasonic_sensor'] = function(block) {
  var PIN_TRIG = block.getFieldValue('PIN_TRIG');
  var PIN_ECHO = block.getFieldValue('PIN_ECHO');
  var us_number = block.getFieldValue('US_NUMBER');

  getGenV1().setupCode_['setup_output_'+PIN_TRIG] = 'pinMode('+PIN_TRIG+', OUTPUT);';
  getGenV1().setupCode_['setup_input_'+PIN_ECHO] = 'pinMode('+PIN_ECHO+', INPUT);';

  getGenV1().definitions_['var_ultrasonic'+PIN_TRIG] = 'long ultrasound_distance_simple() {\n'+
    '   long duration, distance;\n'+
    '   digitalWrite('+PIN_TRIG+',LOW);\n'+
    '   delayMicroseconds(2);\n'+
    '   digitalWrite('+PIN_TRIG+', HIGH);\n'+
    '   delayMicroseconds(10);\n'+
    '   digitalWrite('+PIN_TRIG+', LOW);\n'+
    '   duration = pulseIn('+ PIN_ECHO +', HIGH);\n'+
    '   distance = duration/58;\n'+
    '   return distance;\n'+
    '}\n';

  return '';
};

// Ultrasonic Distance Value
getGenV1().forBlock['ultrasonic_distance'] = function(block) {
  var code = 'ultrasound_distance_simple()';
  return [code, getGenV1().ORDER_ATOMIC];
};

// Speaker Blocks
getGenV1().forBlock['speaker_init'] = function(block) {
  // Ensure voice library is included once
  getGenV1().includes_['include_emmi_voice'] =
    '#include <Emmi_Voice_Lib.h>\n';

  // One-time setup code
  getGenV1().setupCode_['speaker_init_setup'] =
    'pinMode(26, OUTPUT);\n' +
    'dacWrite(26, 128);\n'; // silence speaker

  // No loop code
  return '';
};

getGenV1().forBlock['VOICE_play'] = function(block) {
  var voiceId = block.getFieldValue('VOICE_ID');
 
  getGenV1().includes_['include_emmi_voice'] =
    '#include <Emmi_Voice_Lib.h>\n';

  // Generate function call
  var code = 'playVoice_' + voiceId + '();\n';
  return code;
};

getGenV1().forBlock['VOICE_stop'] = function(block) {
  getGenV1().includes_['include_emmi_voice'] =
    '#include <Emmi_Voice_Lib.h>\n';

  return 'stopVoice();\n';
};

// ─── RGB EYE LEDS — Arduino C++ ──────────────────────────────────────────────
// Active-low RGB: EYE_R=18, EYE_G=17, EYE_B=19  (LOW = ON, HIGH = OFF)
getGenV1().forBlock['bipedal_rgb_green'] = function(block) {
  var state = block.getFieldValue('STATE');
  getGenV1().setupCode_['eye_g_setup'] = 'pinMode(17, OUTPUT); digitalWrite(17, HIGH);';
  return 'digitalWrite(17, ' + state + ');\n';
};

getGenV1().forBlock['bipedal_rgb_red'] = function(block) {
  var state = block.getFieldValue('STATE');
  getGenV1().setupCode_['eye_r_setup'] = 'pinMode(18, OUTPUT); digitalWrite(18, HIGH);';
  return 'digitalWrite(18, ' + state + ');\n';
};

getGenV1().forBlock['bipedal_rgb_blue'] = function(block) {
  var state = block.getFieldValue('STATE');
  getGenV1().setupCode_['eye_b_setup'] = 'pinMode(19, OUTPUT); digitalWrite(19, HIGH);';
  return 'digitalWrite(19, ' + state + ');\n';
};

// ─── Light Sensor — Arduino C++ ───────────────────────────────────────────────
getGenV1().forBlock['bipedal_light_read'] = function(block) {
  getGenV1().setupCode_['analogRes'] = 'analogReadResolution(12);';
  return ['analogRead(34)', getGenV1().ORDER_ATOMIC];
};

// =============================================================================
// PYTHON GENERATORS
// =============================================================================
const getPyGenV1 = () => (typeof pythonGenerator !== 'undefined') ? pythonGenerator : null;

// ── RGB LEDs ─────────────────────────────────────────────────────────────────
getPyGenV1() && (getPyGenV1().forBlock['bipedal_rgb_green'] = function(block) {
  const py = getPyGenV1();
  py.imports_['machine'] = 'from machine import Pin';
  py.definitions_['eye_g'] = 'eye_g = Pin(17, Pin.OUT)\neye_g.value(1)  # OFF by default';
  return 'eye_g.value(' + (block.getFieldValue('STATE') === 'HIGH' ? '1' : '0') + ')\n';
});

getPyGenV1() && (getPyGenV1().forBlock['bipedal_rgb_red'] = function(block) {
  const py = getPyGenV1();
  py.imports_['machine'] = 'from machine import Pin';
  py.definitions_['eye_r'] = 'eye_r = Pin(18, Pin.OUT)\neye_r.value(1)  # OFF by default';
  return 'eye_r.value(' + (block.getFieldValue('STATE') === 'HIGH' ? '1' : '0') + ')\n';
});

getPyGenV1() && (getPyGenV1().forBlock['bipedal_rgb_blue'] = function(block) {
  const py = getPyGenV1();
  py.imports_['machine'] = 'from machine import Pin';
  py.definitions_['eye_b'] = 'eye_b = Pin(19, Pin.OUT)\neye_b.value(1)  # OFF by default';
  return 'eye_b.value(' + (block.getFieldValue('STATE') === 'HIGH' ? '1' : '0') + ')\n';
});

// ── Light Sensor ─────────────────────────────────────────────────────────────
getPyGenV1() && (getPyGenV1().forBlock['bipedal_light_read'] = function(block) {
  const py = getPyGenV1();
  py.imports_['machine'] = 'from machine import Pin, ADC';
  py.definitions_['ldr_adc'] = 'ldr = ADC(Pin(34))\nldr.atten(ADC.ATTN_11DB)';
  return ['ldr.read()', py.ORDER_ATOMIC];
});

// ── OLED ─────────────────────────────────────────────────────────────────────
getPyGenV1() && (getPyGenV1().forBlock['OLED_cust'] = function(block) {
  const py = getPyGenV1();
  py.imports_['ssd1306'] = 'import ssd1306\nfrom machine import I2C, Pin';
  py.definitions_['oled'] = 'i2c = I2C(0, scl=Pin(22), sda=Pin(21))\noled = ssd1306.SSD1306_I2C(128, 64, i2c)\noled.fill(0)\noled.show()';
  return '';
});

getPyGenV1() && (getPyGenV1().forBlock['OLED_eyes'] = function(block) {
  const py = getPyGenV1();
  const face = block.getFieldValue('oled_eyes');
  py.imports_['time'] = 'import time';
  return '# OLED face: ' + face + '\noled.fill(0)\n# TODO: draw ' + face + ' face on oled\noled.show()\n';
});

getPyGenV1() && (getPyGenV1().forBlock['OLED_clear'] = function(block) {
  return 'oled.fill(0)\noled.show()\n';
});

// ── Ultrasonic ────────────────────────────────────────────────────────────────
getPyGenV1() && (getPyGenV1().forBlock['ultrasonic_sensor'] = function(block) {
  const py = getPyGenV1();
  const trig = block.getFieldValue('PIN_TRIG');
  const echo = block.getFieldValue('PIN_ECHO');
  py.imports_['machine'] = 'from machine import Pin, time_pulse_us';
  py.imports_['time'] = 'import time';
  py.definitions_['us_pins'] = 'trig_pin = Pin(' + trig + ', Pin.OUT)\necho_pin = Pin(' + echo + ', Pin.IN)';
  py.definitions_['us_func'] = 'def ultrasound_distance():\n    trig_pin.off()\n    time.sleep_us(2)\n    trig_pin.on()\n    time.sleep_us(10)\n    trig_pin.off()\n    d = time_pulse_us(echo_pin, 1)\n    return d // 58';
  return '';
});

getPyGenV1() && (getPyGenV1().forBlock['ultrasonic_distance'] = function(block) {
  return ['ultrasound_distance()', getPyGenV1().ORDER_ATOMIC];
});

// ── Speaker / Voice ───────────────────────────────────────────────────────────
getPyGenV1() && (getPyGenV1().forBlock['speaker_init'] = function(block) {
  const py = getPyGenV1();
  py.imports_['dac'] = 'from machine import DAC, Pin';
  py.definitions_['dac_speaker'] = 'speaker = DAC(Pin(26))\nspeaker.write(128)  # silence';
  return '';
});

getPyGenV1() && (getPyGenV1().forBlock['VOICE_play'] = function(block) {
  const id = block.getFieldValue('VOICE_ID');
  return '# play voice: ' + id + '\n';
});

getPyGenV1() && (getPyGenV1().forBlock['VOICE_stop'] = function(block) {
  return '# stop voice\n';
});

// =============================================================================
// JAVA GENERATORS
// =============================================================================
const getJavaGenV1 = () => (typeof javaGenerator !== 'undefined') ? javaGenerator : null;

// ── RGB LEDs ─────────────────────────────────────────────────────────────────
getJavaGenV1() && (getJavaGenV1().forBlock['bipedal_rgb_green'] = function(block) {
  const jg = getJavaGenV1();
  const state = block.getFieldValue('STATE');
  if (!jg.setupCode_) jg.setupCode_ = [];
  const s = '        gpio.pinMode(17, GPIO.OUTPUT);';
  if (!jg.setupCode_.includes(s)) jg.setupCode_.push(s);
  return '        gpio.digitalWrite(17, GPIO.' + state + ');\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['bipedal_rgb_red'] = function(block) {
  const jg = getJavaGenV1();
  const state = block.getFieldValue('STATE');
  if (!jg.setupCode_) jg.setupCode_ = [];
  const s = '        gpio.pinMode(18, GPIO.OUTPUT);';
  if (!jg.setupCode_.includes(s)) jg.setupCode_.push(s);
  return '        gpio.digitalWrite(18, GPIO.' + state + ');\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['bipedal_rgb_blue'] = function(block) {
  const jg = getJavaGenV1();
  const state = block.getFieldValue('STATE');
  if (!jg.setupCode_) jg.setupCode_ = [];
  const s = '        gpio.pinMode(19, GPIO.OUTPUT);';
  if (!jg.setupCode_.includes(s)) jg.setupCode_.push(s);
  return '        gpio.digitalWrite(19, GPIO.' + state + ');\n';
});

// ── Light Sensor ─────────────────────────────────────────────────────────────
getJavaGenV1() && (getJavaGenV1().forBlock['bipedal_light_read'] = function(block) {
  return ['adc.read(34)', getJavaGenV1().ORDER_ATOMIC];
});

// ── OLED ─────────────────────────────────────────────────────────────────────
getJavaGenV1() && (getJavaGenV1().forBlock['OLED_cust'] = function(block) {
  const jg = getJavaGenV1();
  jg.imports_['oled'] = 'import esp32.display.OLED;';
  return '        OLED oled = new OLED(128, 64);\n        oled.clear();\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['OLED_eyes'] = function(block) {
  const face = block.getFieldValue('oled_eyes');
  return '        oled.clear();\n        // TODO: draw ' + face + ' face\n        oled.show();\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['OLED_clear'] = function(block) {
  return '        oled.clear();\n        oled.show();\n';
});

// ── Ultrasonic ────────────────────────────────────────────────────────────────
getJavaGenV1() && (getJavaGenV1().forBlock['ultrasonic_sensor'] = function(block) {
  const trig = block.getFieldValue('PIN_TRIG');
  const echo = block.getFieldValue('PIN_ECHO');
  const jg = getJavaGenV1();
  if (!jg.setupCode_) jg.setupCode_ = [];
  jg.setupCode_.push('        gpio.pinMode(' + trig + ', GPIO.OUTPUT);');
  jg.setupCode_.push('        gpio.pinMode(' + echo + ', GPIO.INPUT);');
  return '';
});

getJavaGenV1() && (getJavaGenV1().forBlock['ultrasonic_distance'] = function(block) {
  return ['GPIO.pulseIn(echoPin, GPIO.HIGH) / 58', getJavaGenV1().ORDER_ATOMIC];
});

// ── Speaker / Voice ───────────────────────────────────────────────────────────
getJavaGenV1() && (getJavaGenV1().forBlock['speaker_init'] = function(block) {
  return '        EmmiVoice.init();\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['VOICE_play'] = function(block) {
  const id = block.getFieldValue('VOICE_ID');
  return '        EmmiVoice.play("' + id + '");\n';
});

getJavaGenV1() && (getJavaGenV1().forBlock['VOICE_stop'] = function(block) {
  return '        EmmiVoice.stop();\n';
});

// =============================================================================
// LEGS (BIPEDAL) GENERATORS - Arduino, Python, Java
// =============================================================================

// ── Arduino C++ ───────────────────────────────────────────────────────────────

arduinoGenerator.forBlock['bipedal_setup'] = function(block) {
  var PIN_YL     = block.getFieldValue('PIN_YL');
  var PIN_YR     = block.getFieldValue('PIN_YR');
  var PIN_RL     = block.getFieldValue('PIN_RL');
  var PIN_RR     = block.getFieldValue('PIN_RR');
  var PIN_Buzzer = block.getFieldValue('PIN_Buzzer');

  arduinoGenerator.includes_['otto_lib'] = '#include <Otto.h>\nOtto Otto;';
  arduinoGenerator.definitions_['otto_legs'] =
    '#define LeftLeg '   + PIN_YL     + '\n'
  + '#define RightLeg '  + PIN_YR     + '\n'
  + '#define LeftFoot '  + PIN_RL     + '\n'
  + '#define RightFoot ' + PIN_RR     + '\n'
  + '#define Buzzer '    + PIN_Buzzer + '\n';
  arduinoGenerator.setupCode_['otto_init'] =
    'Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer);\nOtto.home();\n';
  return '';
};

arduinoGenerator.forBlock['bipedal_home'] = function(block) {
  arduinoGenerator.definitions_['otto_soft_home'] =
    'void otto_soft_home() {\n  int homes[4]={90,90,90,90};\n  Otto._moveServos(500,homes);\n}';
  return 'otto_soft_home();\n';
};

arduinoGenerator.forBlock['bipedal_move'] = function(block) {
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

arduinoGenerator.forBlock['bipedal_dance'] = function(block) {
  var mov   = block.getFieldValue('otto_dance_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  var code  = '';
  switch(mov) {
    case 'moonwalkerLEFT':  code = 'Otto.moonwalker(1,' + speed + ',' + size + ',1);\n';  break;
    case 'moonwalkerRIGHT': code = 'Otto.moonwalker(1,' + speed + ',' + size + ',-1);\n'; break;
    case 'crusaitoLEFT':    code = 'Otto.crusaito(1,' + speed + ',' + size + ',1);\n';    break;
    case 'crusaitoRIGHT':   code = 'Otto.crusaito(1,' + speed + ',' + size + ',-1);\n';  break;
    case 'flappingFRONT':   code = 'Otto.flapping(1,' + speed + ',' + size + ',1);\n';   break;
    case 'flappingBACK':    code = 'Otto.flapping(1,' + speed + ',' + size + ',-1);\n';  break;
  }
  return code;
};

arduinoGenerator.forBlock['bipedal_do'] = function(block) {
  var mov   = block.getFieldValue('otto_do_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  return 'Otto.' + mov + '(1,' + speed + ',' + size + ');\n';
};

arduinoGenerator.forBlock['bipedal_smooth'] = function(block) {
  arduinoGenerator.includes_['otto_lib'] = arduinoGenerator.includes_['otto_lib'] || '#include <Otto.h>\nOtto Otto;';
  return 'Otto.moonwalker(1,1000,15,1);\n';
};

arduinoGenerator.forBlock['bipedal_gesture'] = function(block) {
  var gesture = block.getFieldValue('otto_gesture');
  return 'Otto.playGesture(' + gesture + ');\n';
};

// ── Python (MicroPython) ──────────────────────────────────────────────────────

pythonGenerator.forBlock['bipedal_setup'] = function(block) {
  pythonGenerator.imports_['otto'] = 'from otto import Otto';
  pythonGenerator.definitions_['bipedal'] = 'otto = Otto()';
  var yl = block.getFieldValue('PIN_YL');
  var yr = block.getFieldValue('PIN_YR');
  var rl = block.getFieldValue('PIN_RL');
  var rr = block.getFieldValue('PIN_RR');
  var bz = block.getFieldValue('PIN_Buzzer');
  return 'otto.init(' + yl + ',' + yr + ',' + rl + ',' + rr + ',True,' + bz + ')\notto.home()\n';
};

pythonGenerator.forBlock['bipedal_home'] = function(block) {
  pythonGenerator.definitions_['otto_soft_home'] =
    'def otto_soft_home():\n    otto._move_servos(500,[90,90,90,90])\n';
  return 'otto_soft_home()\n';
};

pythonGenerator.forBlock['bipedal_move'] = function(block) {
  var dir   = block.getFieldValue('otto_move_sens');
  var speed = block.getFieldValue('otto_move_speed');
  var dirMap = {
    'FORWARD':    'otto.walk(1,' + speed + ',1)',
    'BACKWARD':   'otto.walk(1,' + speed + ',-1)',
    'LEFT':       'otto.turn(1,' + speed + ',1)',
    'RIGHT':      'otto.turn(1,' + speed + ',-1)',
    'BENDLEFT':   'otto.bend(1,' + speed + ',1)',
    'BENDRIGHT':  'otto.bend(1,' + speed + ',-1)',
    'SHAKELEFT':  'otto.shake_leg(1,' + speed + ',-1)',
    'SHAKERIGHT': 'otto.shake_leg(1,' + speed + ',1)',
    'jump':       'otto.jump(1,' + speed + ')'
  };
  return (dirMap[dir] || '# unknown move') + '\n';
};

pythonGenerator.forBlock['bipedal_dance'] = function(block) {
  var mov   = block.getFieldValue('otto_dance_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  var movMap = {
    'moonwalkerLEFT':  'otto.moonwalker(1,' + speed + ',' + size + ',1)',
    'moonwalkerRIGHT': 'otto.moonwalker(1,' + speed + ',' + size + ',-1)',
    'crusaitoLEFT':    'otto.crusaito(1,' + speed + ',' + size + ',1)',
    'crusaitoRIGHT':   'otto.crusaito(1,' + speed + ',' + size + ',-1)',
    'flappingFRONT':   'otto.flapping(1,' + speed + ',' + size + ',1)',
    'flappingBACK':    'otto.flapping(1,' + speed + ',' + size + ',-1)'
  };
  return (movMap[mov] || '# unknown dance') + '\n';
};

pythonGenerator.forBlock['bipedal_do'] = function(block) {
  var mov   = block.getFieldValue('otto_do_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  return 'otto.' + mov + '(1,' + speed + ',' + size + ')\n';
};

pythonGenerator.forBlock['bipedal_smooth'] = function(block) {
  return 'otto.moonwalker(1,1000,15,1)  # smooth criminal\n';
};

pythonGenerator.forBlock['bipedal_gesture'] = function(block) {
  var gesture = block.getFieldValue('otto_gesture');
  return 'otto.play_gesture(' + gesture + ')\n';
};

// ── Java (pseudocode) ─────────────────────────────────────────────────────────

javaGenerator.forBlock['bipedal_setup'] = function(block) {
  javaGenerator.imports_['otto'] = 'import otto.Otto;';
  var yl = block.getFieldValue('PIN_YL');
  var yr = block.getFieldValue('PIN_YR');
  var rl = block.getFieldValue('PIN_RL');
  var rr = block.getFieldValue('PIN_RR');
  var bz = block.getFieldValue('PIN_Buzzer');
  return '        Otto otto = new Otto();\n        otto.init(' + yl + ',' + yr + ',' + rl + ',' + rr + ',true,' + bz + ');\n        otto.home();\n';
};

javaGenerator.forBlock['bipedal_home'] = function(block) {
  return '        otto._moveServos(500, new int[]{90,90,90,90});\n';
};

javaGenerator.forBlock['bipedal_move'] = function(block) {
  var dir   = block.getFieldValue('otto_move_sens');
  var speed = block.getFieldValue('otto_move_speed');
  var dirMap = {
    'FORWARD':    'otto.walk(1,' + speed + ',1)',
    'BACKWARD':   'otto.walk(1,' + speed + ',-1)',
    'LEFT':       'otto.turn(1,' + speed + ',1)',
    'RIGHT':      'otto.turn(1,' + speed + ',-1)',
    'BENDLEFT':   'otto.bend(1,' + speed + ',1)',
    'BENDRIGHT':  'otto.bend(1,' + speed + ',-1)',
    'SHAKELEFT':  'otto.shakeLeg(1,' + speed + ',-1)',
    'SHAKERIGHT': 'otto.shakeLeg(1,' + speed + ',1)',
    'jump':       'otto.jump(1,' + speed + ')'
  };
  return '        ' + (dirMap[dir] || '/* unknown move */') + ';\n';
};

javaGenerator.forBlock['bipedal_dance'] = function(block) {
  var mov   = block.getFieldValue('otto_dance_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  var movMap = {
    'moonwalkerLEFT':  'otto.moonwalker(1,' + speed + ',' + size + ',1)',
    'moonwalkerRIGHT': 'otto.moonwalker(1,' + speed + ',' + size + ',-1)',
    'crusaitoLEFT':    'otto.crusaito(1,' + speed + ',' + size + ',1)',
    'crusaitoRIGHT':   'otto.crusaito(1,' + speed + ',' + size + ',-1)',
    'flappingFRONT':   'otto.flapping(1,' + speed + ',' + size + ',1)',
    'flappingBACK':    'otto.flapping(1,' + speed + ',' + size + ',-1)'
  };
  return '        ' + (movMap[mov] || '/* unknown dance */') + ';\n';
};

javaGenerator.forBlock['bipedal_do'] = function(block) {
  var mov   = block.getFieldValue('otto_do_movement');
  var speed = block.getFieldValue('otto_move_speed');
  var size  = block.getFieldValue('otto_dance_size');
  return '        otto.' + mov + '(1,' + speed + ',' + size + ');\n';
};

javaGenerator.forBlock['bipedal_smooth'] = function(block) {
  return '        otto.moonwalker(1,1000,15,1); // smooth criminal\n';
};

javaGenerator.forBlock['bipedal_gesture'] = function(block) {
  var gesture = block.getFieldValue('otto_gesture');
  return '        otto.playGesture(' + gesture + ');\n';
};