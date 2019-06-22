const fs = require('fs');
const textract = require('textract');
const thinid = require('thinid');

module.exports = () => {
  const docxDir = './docx-files';
  if (!fs.existsSync(docxDir)) {
    fs.mkdirSync(docxDir);
  }

  const fileNames = fs.readdirSync(docxDir, 'utf8');
  fileNames.forEach(file => {
    const path = `./docx-files/${file}`
    textract.fromFileWithPath(path, (err, text) => {
      if (err) {
        throw new Error(err);
      }

      const dir = './documents';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFileSync(`./documents/${thinid()}.txt`, text, 'utf8');
    });
  });
};
