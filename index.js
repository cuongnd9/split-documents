const fs = require('fs');
const writeFile = require('./utils/writeFile');
const getTableOfContents = require('./utils/getTableOfContents');
const findIndexOfTOC = require('./utils/getTableOfContents');

const path = './documents/Group-6-Topic_Detection_final.docx';

const data = fs.readFileSync('./data.txt', 'utf8');

const indexOfTOC = findIndexOfTOC(data);
// New data, remove contents before TOC(table of contents).
const newData = data.substring(indexOfTOC);

const tableOfContents = getTableOfContents(newData);
console.log(tableOfContents.value);
console.log(newData.substring(tableOfContents.nextIndex));
