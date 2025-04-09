
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const basePath = './test/'
const files = fs.readdirSync(basePath);

const mocha = new Mocha();

files.forEach(file=>{
  if(file.indexOf('.test') > -1){
    mocha.addFile(path.join(basePath, file));
  }
})

mocha.run((number)=>{
  if(number == 0) process.exit(0);
  else process.exit(1);
})