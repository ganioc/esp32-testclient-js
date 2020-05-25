const util = require('./util')

let SEQ = 1;

let add_frame = (buf) => {
  console.log('buf:');
  console.log(buf);

  let bufOut = Buffer.alloc(buf.length + 7);
  let index = 0;
  bufOut[index++] = 0x01;
  bufOut[index++] = 0x00;

  bufOut[index++] = SEQ++;
  if (SEQ > 255) {
    SEQ = 0;
  }

  let len = buf.length + 2;
  bufOut[index++] = 0xff & (len >> 8);
  bufOut[index++] = 0xff & len;
  for (let i = 0; i < buf.length; i++) {
    bufOut[index++] = buf[i];
  }
  bufOut[index++] = 0xff;
  bufOut[index++] = 0xff;
  console.log('add_frame, len:', bufOut.length);
  console.log(bufOut);
  return bufOut;
}
module.exports = {
  frame_en: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    return add_frame(buf);
  },
  frame_reset_UT: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x02;
    buf[index++] = 0x00;
    return add_frame(buf);
  },
  frame_reset_ESP32: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x01;
    buf[index++] = 0x00;
    return add_frame(buf);
  },
}