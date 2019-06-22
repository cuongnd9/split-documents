const fs = require('fs');
const textract = require('textract');
const thinid = require('thinid');

module.exports = path => {
  textract.fromFileWithPath(path, (err, text) => {
    if (err) {
      return err;
    }
    fs.writeFileSync('./documents/data.txt', text, 'utf8');
  });
};
