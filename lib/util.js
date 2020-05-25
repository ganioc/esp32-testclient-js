const CMD_REQUEST = 0x01
const CMD_RESPONSE = 0x02
const CMD_NOTIFICATION = 0x03

const TARGET_ULTRA_SONIC = 0x01
const TARGET_SWITCH_1 = 0x02
const TARGET_SWITCH_2 = 0x03
const TARGET_ESP32 = 0x10
const TARGET_HOST = 0x11
//

const UT_WORKING_MODE = 0x01
// mode=1, Send every packet
// mode=2,  Send every other packet
const UT_MODE_1 = 0x1
const UT_MODE_2 = 0x2

const ESP32_RESET = 0x30
const ESP32_SET_TIMESTAMP = 0x31

const STATE_IDLE = 0x0
const STATE_SEQ1 = 0x01
const STATE_SEQ2 = 0x02
const STATE_LEN1 = 0x03
const STATE_LEN2 = 0x04
const STATE_CONTENT = 0x05

module.exports = {
  CMD_REQUEST,
  CMD_RESPONSE,
  CMD_NOTIFICATION,

  TARGET_ULTRA_SONIC,
  TARGET_SWITCH_1,
  TARGET_SWITCH_2,
  TARGET_ESP32,
  TARGET_HOST,
  //

  UT_WORKING_MODE,
  // mode=1, Send every packet
  // mode=2,  Send every other packet
  UT_MODE_1,
  UT_MODE_2,

  ESP32_RESET,
  ESP32_SET_TIMESTAMP,

  STATE_IDLE,
  STATE_SEQ1,
  STATE_SEQ2,
  STATE_LEN1,
  STATE_CONTENT,
}