const fs = require('node:fs');
const path = require('node:path');

const pathFolder = path.join(`${__dirname}/secret-folder`);
const allFiles = fs.readdir(pathFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log (err);
  }
  files.forEach ((file) => {
    if (file.isFile()) {
      fs.stat(`${pathFolder}/${file.name}`, (err, stats) => {
        if (err) {
          console.log (err);
        }
        let name = path.parse(file.name).name;
        let extension = `${path.extname(`${pathFolder}/${file.name}`)}`.slice(1);
        let size = `${(stats.size/1024).toFixed(3)}kb`;
        console.log ('\x1b[36m', `${name} - ${extension} - ${size}`, '\x1b[37m');
      });
    }
  })
});