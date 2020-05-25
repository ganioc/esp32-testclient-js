
let numToBuf = (num) => {
  let buf = Buffer.alloc(8);
  let temp = num;
  buf[0] = (temp >> 56) & 0xff;
  temp = num;
  buf[1] = (temp >> 48) & 0xff;
  temp = num;
  buf[2] = (temp >> 40) & 0xff;
  temp = num;
  buf[3] = (temp >> 32) & 0xff;
  temp = num;
  buf[4] = (temp >> 24) & 0xff;
  temp = num;
  buf[5] = (temp >> 16) & 0xff;
  temp = num;
  buf[6] = (temp >> 8) & 0xff;
  temp = num;
  buf[7] = (temp >> 0) & 0xff;

  return buf;
}


let a = new Date().getTime();
// a = 123;
console.log('time num:', a);

console.log('to buffer:', numToBuf(a))

