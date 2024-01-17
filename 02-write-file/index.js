const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fileName = 'text.txt';
fs.open(fileName, 'a', (err) => {
  if (err) {
    throw err;
  }
});

console.log('\x1b[40m', '\x1b[32m', 'Hello! Write your text, please', '\x1b[37m');

io.on ('line', (input) => {
  if (input !== 'exit') {
    fs.appendFile(pathFile, `${input}\n`, (err) => {
      if (err) {
        throw err;
      }
    });
  } else {
    io.close();
  }
})

io.on ('close', () => {
  console.log('\x1b[32m', 'Goodbye!', '\x1b[37m');
})

const pathFile = path.join(`${__dirname}/${fileName}`);