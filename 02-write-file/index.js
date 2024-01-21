const fs = require('node:fs');
const path = require('node:path');

const fileName = path.join(__dirname, 'text.txt');
fs.open(fileName, 'a', (err) => {
  if (err) {
    console.log(err);
  }
});

const readline = require('node:readline');
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('\x1b[40m', '\x1b[32m', 'Hello! Write your text, please', '\x1b[37m');

io.on ('line', (input) => {
  if (input !== 'exit') {
    fs.appendFile(fileName, `${input}\n`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    io.close();
  }
})

io.on ('close', () => {
  console.log('\x1b[32m', 'Goodbye!', '\x1b[37m');
})