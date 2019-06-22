const fs = require('fs');
const textract = require('textract');

const path = './documents/Group-6-Topic_Detection_final.docx';

textract.fromFileWithPath(path, (err, text) => {
  if (err) {
    return err;
  }
  fs.writeFileSync('./data.txt', text, 'utf8');
})
