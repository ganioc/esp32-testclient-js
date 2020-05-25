const prompts = require('prompts');
const net = require('net')
// const util = require('./lib/util')
const frame = require('./lib/frame')

let HOST = '';
let PORT = 9000;

if (process.env.HOST) {
  HOST = process.env.HOST;
} else {
  console.log('No HOST')
  process.exit(1);
}

if (process.env.PORT) {
  PORT = process.env.PORT;
}



const onCancel = prompt => {
  console.log('quit')
  process.exit(1)
}


///////////////////////////
let client = new net.Socket();

client.connect(PORT, HOST);

client.on('error', (e) => {
  console.log(e);
})

client.on('data', (chunk) => {
  console.log('Rx:')
  console.log(chunk)
})


function handleCmd(cmds, cb) {
  let words = cmds.replace(/\s+/g, ' ').split(' ');

  if (words.length < 1) {
    return;
  }
  const cmd1 = words[0].toLowerCase();
  const args = words.splice(1, words.length - 1)

  console.log('cmd:', cmd1)
  console.log('args:', args)

  switch (cmd1) {
    case 'e':
      console.log('To enable sending notification data');
      client.write(frame.frame_en(), (err) => {
        if (err) {
          console.log('send en failed');
        }
      })
      break;
    case 'r':
      console.log('To reset UT device')
      client.write(frame.frame_reset_UT(), (err) => {
        if (err) {
          console.log('send en failed');
        }
      })
      break;
    case 're':
      console.log('To reset ESP32')
      client.write(frame.frame_reset_ESP32(), (err) => {
        if (err) {
          console.log('send en failed');
        }
      })
      break;
    case 'delete':

      break;
    case 'modify':

      break;
    case 'q':
    case 'quit':
    case 'quit()':
      console.log('Bye\n');
      process.exit(0);
    default:
      console.log('Unknown cmds:', cmd1)
      break;
  }
  cb(null);
}

(async () => {
  await new Promise((resolve, reject) => {
    console.log('To delay');
    setTimeout(() => {
      console.log('Delay over\n');
      resolve();
    }, 2000);
  });
  console.log('To prompts');
  while (true) {
    const response = await prompts({
      type: 'text',
      name: 'cmd',
      message: ''
      // validate: value => value< 18?'Nightclub is 18+ only': true
    },
      { onCancel })

    console.log(response)
    await new Promise((resolve, reject) => {
      handleCmd(response.cmd, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    }).catch(err => {
      console.log('ERR:', err);
    });
  }

})();


