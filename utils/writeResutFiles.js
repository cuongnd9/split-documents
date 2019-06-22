const fs = require('fs');
const thinid = require('thinid');

module.exports = (tableOfContents, contents) => {
  const tocDir = './table-of-contents';
  const contentsDir = './contents';
  if (!fs.existsSync(tocDir)) {
    fs.mkdirSync(tocDir);
  }
  if (!fs.existsSync(contentsDir)) {
    fs.mkdirSync(contentsDir);
  }

  const fileName = thinid();
  fs.writeFileSync(
    `./table-of-contents/${fileName}.txt`,
    tableOfContents,
    'utf8'
  );
  fs.writeFileSync(`./contents/${fileName}.txt`, contents, 'utf8');
};
