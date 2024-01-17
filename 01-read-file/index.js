const fs = require('node:fs');
const path = require('node:path');

const pathFile = path.join(`${__dirname}/text.txt`);

const nodeReadable = fs.createReadStream(pathFile);

(async () => {
  for await (const line of nodeReadable) {
    console.log(line.toString());
  }  
})();
