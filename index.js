const prompts = require('prompts');
const net = require('net')
// const util = require('./lib/util')
const frame = require('./lib/frame')
const robot = require('robotjs')

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
  console.log('Hex', chunk)
  robot.keyTap("enter")
})


function handleCmd(cmds, cb) {
  let words = cmds.replace(/\s+/g, ' ').split(' ');

  if (words.length < 1) {
    return;
  }
  const cmd1 = words[0].toLowerCase();
  const args = words.splice(1, words.length - 1)

  // if (cmd1.length === 0) {
  //   return;
  // }

  console.log('cmd:', cmd1)
  console.log('args:', args)

  switch (cmd1) {

    case 'e':
      console.log('To enable sending notification data');
      client.write(frame.frame_en(args[0]), (err) => {
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
    case 't':
      console.log('To set timestamp')

      client.write(frame.frame_set_timestamp(new Date().getTime()), (err) => {
        if (err) {
          console.log('send en failed');
        }
      })
      break;
    case 'tg':
      console.log('To get timestamp')

      client.write(frame.frame_get_timestamp(), (err) => {
        if (err) {
          console.log('send en failed');
        }
      })
      break;
    case 'mr':
      console.log('To get working mode')
      client.write(frame.frame_get_mode(), (err) => {
        if (err) {
          console.log('send mr failed')
        }
      })
      break;
    case 'ms':
      console.log('To stop working mode')
      client.write(frame.frame_stop_mode(), (err) => {
        if (err) {
          console.log('send ms failed')
        }
      })
      break;
    case 'r1':
      console.log('To read switch 1')
      client.write(frame.frame_read_switch(1), (err) => {
        if (err) {
          console.log('send r1 failed')
        }
      })
      break;
    case 'r2':
      console.log('To read switch 2')
      client.write(frame.frame_read_switch(2), (err) => {
        if (err) {
          console.log('send r2 failed')
        }
      })
      break;
    case 'v':
      console.log('To read version')
      client.write(frame.frame_read_version(), (err) => {
        if (err) {
          console.log('send v failed')
        }
      })
      break;
    case 'u':
      console.log('To upgrade')
      console.log('url:', args[0])
      if (args[0].length === 0) {
        console.log('empty url')
      } else {
        client.write(frame.frame_set_upgrade(args[0]), (err) => {
          if (err) {
            console.log('send u failed')
          }
        })
      }

      break;
    case 'ug':
      console.log('To get upgrade status')
      client.write(frame.frame_get_upgrade(), (err) => {
        if (err) {
          console.log('send ug failed')
        }
      })
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


