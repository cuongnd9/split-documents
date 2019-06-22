const fs = require('fs');
const textract = require('textract');
const thinid = require('thinid');

const delay = () => new Promise(resolve => setTimeout(resolve));

const extractFile = path =>
  new Promise((resolve, reject) =>
    textract.fromFileWithPath(path, async (err, text) => {
      await delay();
      if (err) {
        return reject(err);
      }
      resolve(text);
    })
  );

module.exports = async () => {
  const docxDir = './docx-files';
  if (!fs.existsSync(docxDir)) {
    fs.mkdirSync(docxDir);
  }
  const fileNames = fs.readdirSync(docxDir, 'utf8');
  for (const file of fileNames) {
    const path = `./docx-files/${file}`;
    await extractFile(path)
      .then(text => {
        const dir = './documents';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        fs.writeFileSync(`./documents/${thinid()}.txt`, text, 'utf8');
      })
      .catch(err => new Error(err));
  }
};
