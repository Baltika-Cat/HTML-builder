const fs = require('node:fs');
const path = require('node:path');
const promise = require('node:fs/promises');

const newFolder = path.join(__dirname, 'project-dist');
fs.mkdir(newFolder, {recursive: true}, (err) => {
  if (err) {
    console.log('Directory has been already created');
  }
})
const assetsFolder = path.join(newFolder, 'assets');
fs.mkdir(assetsFolder, {recursive: true}, (err) => {
  if (err) {
    console.log('Directory has been already created');
  }
})

const htmlFile = path.join(newFolder, 'index.html');
const cssFile = path.join(newFolder, 'style.css');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');

fs.open(htmlFile, 'a', (err) => {
  if (err) {
    console.log(err);
  }
})

fs.open(cssFile, 'a', (err) => {
  if (err) {
    console.log(err);
  }
})

const regExp = /{{\w+}}/g;
let text = '';

fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
  if (err) {
    console.log(err);
  }
  text = data.toString();
})

fs.readdir(componentsFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach ((file) => {
    let fileName = path.join(componentsFolder, file.name);
    if (file.isFile() && path.extname(fileName) === '.html') {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          console.log(err);
        }
        let tag = (file.name).slice(0, (file.name).lastIndexOf('.'));
        text = text.replace(`{{${tag}}}`, data.toString());
        text = text.replace('\n\n', '\n');
        (async () => {
          await promise.writeFile(htmlFile, text, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })()
      })
    }
  })
})

let styleText = '';

fs.readdir(path.join(stylesFolder), {withFileTypes: true}, (err, styleFiles) => {
  if (err) {
    console.log(err);
  }
  styleFiles.forEach ((styleFile) => {
    let fileName = path.join(stylesFolder, styleFile.name);
    if (styleFile.isFile() && path.extname(fileName) === '.css') {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          console.log(err);
        }
        styleText += data.toString();
        (async () => {
          await promise.writeFile(cssFile, styleText, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })();
      })
    }
  })
})

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach ((file) => {
    let oldFile = path.join(__dirname, 'assets', file.name);
    let newFile = path.join(assetsFolder, file.name);
    if (file.isFile()) {
      fs.copyFile(oldFile, newFile, (err) => {
        if (err) {
          console.log(/*'File already exists in the destination directory'*/err);
        }
      })
    } else if (file.isDirectory()) {
      fs.mkdir(path.join(newFile), {recursive: true}, (err) => {
        if (err) {
          console.log('Directory has been already created');
        }
      })
      fs.readdir(oldFile, {withFileTypes: true}, (err, filesDeep) => {
        if (err) {
          console.log(err);
        }
        if (filesDeep) {
          filesDeep.forEach ((fileDeep) => {
            fs.copyFile(path.join(oldFile, fileDeep.name), path.join(newFile, fileDeep.name), (err) => {
              if (err) {
                console.log(/*'File already exists in the destination directory'*/err);
              }
            })
          })
        }
      })
    }
  })
})