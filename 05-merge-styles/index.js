const fs = require('node:fs');
const path = require('node:path');

const pathFolder = path.join(__dirname, 'styles');
const pathFile = path.join(__dirname, 'project-dist/bundle.css');

fs.truncate(pathFile, (err) => {
  if (err) {
    fs.open(pathFile, 'a', (err) => {
      if (err) {
        console.log('meow');
      }
    })
  }
})

fs.open(pathFile, 'a', (err) => {
  if (err) {
    console.log(err);
  }
});

fs.readdir(pathFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach ((file) => {
    let fileName = path.join(pathFolder, file.name);
    if (file.isFile() && path.extname(fileName) === '.css') {
      let nodeReadable = fs.createReadStream(fileName);
      (async () => {
        for await (const line of nodeReadable) {
          fs.appendFile(pathFile, line.toString(), (err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      })();
    }
  })
})