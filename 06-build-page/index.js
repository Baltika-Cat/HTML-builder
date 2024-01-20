const fs = require('node:fs');
const path = require('node:path');
const promise = require('node:fs/promises');

const newFolder = path.join(__dirname, 'project-dist');
fs.mkdir(newFolder, {recursive: true}, (err) => {
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

const regExp = /{{\w+}}/g;
let tag = '';
const htmlReadable = fs.createReadStream(path.join(__dirname, 'template.html'));
let text = '';
/* (async () => {  
  for await (const line of htmlReadable) {
    if (line.toString().match(regExp)) {
      text += line.toString();
      let regArray = line.toString().match(regExp);
      regArray.forEach ((item) => {
        tag = item.replace('{{', '');
        tag = tag.replace('}}', '');
        let compText = '';
        let componentsReadable = fs.createReadStream(path.join(__dirname, `components/${tag}.html`));
        (async () => {
          for await (const compLine of componentsReadable) {
            compText += compLine.toString();
          }
          text = text.replace(item, compText);
          fs.appendFile(htmlFile, text, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })();
      })
    }
  }
})(); */

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
        console.log(tag)
        text = text.replace(`{{${tag}}}`, data.toString());
        (async () => {
          await promise.writeFile(htmlFile, text, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })()
        console.log(text)
      })
    }
  })
})