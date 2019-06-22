const fs = require('fs');
const extractDocxFile = require('./utils/extractDocxFile');
const getTableOfContents = require('./utils/getTableOfContents');
const findIndexOfTOC = require('./utils/findIndexOfTOC');
const writeResultFiles = require('./utils/writeResutFiles');

const extractDocxFiles = async () => {
  const path = './docx-files/Group-6-Topic_Detection_final.docx';
  await extractDocxFile(path);
}

const app = () => {
  extractDocxFiles();

  const data = fs.readFileSync('./documents/data.txt', 'utf8');
  const indexOfTOC = findIndexOfTOC(data);
  // New data, remove contents before TOC(table of contents).
  const newData = data.substring(indexOfTOC);

  const tableOfContents = getTableOfContents(newData);
  const contents = newData.substring(tableOfContents.nextIndex);

  writeResultFiles(tableOfContents.value, contents)
};

app();
