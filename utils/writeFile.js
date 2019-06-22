const fs = require('fs');
const textract = require('textract');

module.exports = path => {
  textract.fromFileWithPath(path, (err, text) => {
    if (err) {
      return err;
    }
    fs.writeFileSync('./data.txt', text, 'utf8');
  });
};
