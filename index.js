const prompts = require('prompts');


const onCancel = prompt => {
  console.log('quit')
  process.exit(1)
}

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
    case 'list':

      break;
    case 'add':

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


