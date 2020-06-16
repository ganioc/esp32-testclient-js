const util = require('./util')

let SEQ = 1;

let changeBuf2Num = (buf) => {
  console.log('\nchange buf to number');
  console.log('input:', buf);

  let num = buf.toString();

  console.log('output num:', num);
  console.log('');
}

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
  frame_en: (str) => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    if (str === undefined) {
      buf[index++] = 0x01;
    } else {
      try {
        buf[index++] = parseInt(str);
        console.log('mode is: ', parseInt(str))
      } catch (e) {
        console.log(e);
        buf[index++] = 0x01;
      }
    }


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
  frame_set_timestamp: (time) => {

    console.log('input time:')
    console.log(time);
    let strTime = time.toString().slice(0);
    let bufTime = Buffer.from(strTime);
    let buf2 = Buffer.from(bufTime);

    let buf = Buffer.alloc(bufTime.length + 3);
    let index = 0;
    let tm = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x02;
    for (let i = 0; i < bufTime.length; i++) {
      buf[index++] = bufTime[i];
      buf2[i] = bufTime[i]
    }

    // let buf2 = Buffer.from([buf[3], buf[4], buf[5], buf[6], buf[7], buf[8], buf[9], buf[10]]);

    changeBuf2Num(buf2);
    return add_frame(buf);
  },
  frame_get_timestamp: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x03;
    return add_frame(buf);
  },
  frame_get_mode: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x03;
    buf[index++] = 0x01
    return add_frame(buf);
  },
  frame_stop_mode: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01;
    buf[index++] = 0x00;
    buf[index++] = 0x01
    return add_frame(buf);
  },
  frame_read_switch: (num) => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x01 + num
    buf[index++] = 0x01;
    buf[index++] = 0x00;
    return add_frame(buf);

  },
  frame_read_version: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x04;
    buf[index++] = 0x01
    return add_frame(buf);
  },
  frame_set_upgrade: (url) => {
    let buf = Buffer.alloc(3 + url.length);
    console.log('url:', url);
    console.log('url length:', url.length);
    console.log('buf length:', buf.length);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x05;

    let bufUrl = Buffer.from(url)
    for (let i = 0; i < url.length; i++) {
      buf[index++] = bufUrl[i];
    }

    return add_frame(buf);
  },
  frame_get_upgrade: () => {
    let buf = Buffer.alloc(4);
    let index = 0;
    buf[index++] = 0x01;
    buf[index++] = 0x10;
    buf[index++] = 0x06;
    buf[index++] = 0x01
    return add_frame(buf);
  }
}