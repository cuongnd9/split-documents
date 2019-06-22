const fs = require('fs');
const extractDocxFile = require('./utils/extractDocxFile');
const getTOC = require('./utils/getTOC');
const findIndexOfTOC = require('./utils/findIndexOfTOC');
const writeResultFiles = require('./utils/writeResutFiles');

const extractDocxFiles = async () => {
  await extractDocxFile();
};

const app = async () => {
  extractDocxFiles();

  const documentsDir = './documents';
  const fileNames = fs.readdirSync(documentsDir, 'utf8');
  fileNames.forEach(file => {
    const data = fs.readFileSync(documentsDir + `/${file}`, 'utf8');
    const indexOfTOC = findIndexOfTOC(data);
    // New data, remove contents before TOC(table of contents).
    const newData = data.substring(indexOfTOC);

    const tableOfContents = getTOC(newData);
    const contents = newData.substring(tableOfContents.nextIndex);

    writeResultFiles(tableOfContents.value, contents);
  });
};

app();
