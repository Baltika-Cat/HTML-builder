const fs = require('node:fs');
const path = require('node:path');

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

fs.access(newFolder, (err) => {
  if (err) {
    fs.mkdir(newFolder, {recursive: true}, (err) => {
      if (err) {
        console.log ('Directory is already created');
      }
    })
    fs.readdir(oldFolder, {withFileTypes: true}, (err, files) => {
      if (err) {
        console.log (err);
      }
      files.forEach ((file) => {
        if (file.isFile()) {
          let oldFile = path.join(oldFolder, file.name);
          let newFile = path.join(newFolder, file.name);
          fs.copyFile(oldFile, newFile, (err) => {
            if (err) {
              console.log('File already exists in the destination directory');
            }
          })
        }
      })
    })
  } else {
    fs.rm(newFolder, {recursive: true}, (err) => {
      if (err) {
        console.log(err);
      }
      fs.mkdir(newFolder, {recursive: true}, (err) => {
        if (err) {
          console.log ('Directory is already created');
        }
      })
      fs.readdir(oldFolder, {withFileTypes: true}, (err, files) => {
        if (err) {
          console.log (err);
        }
        files.forEach ((file) => {
          if (file.isFile()) {
            let oldFile = path.join(oldFolder, file.name);
            let newFile = path.join(newFolder, file.name);
            fs.copyFile(oldFile, newFile, (err) => {
              if (err) {
                console.log('File already exists in the destination directory');
              }
            })
          }
        })
      })
    })
  }
})