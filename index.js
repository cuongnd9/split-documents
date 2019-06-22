const fs = require('fs');
const textract = require('textract');

const path = './documents/Group-6-Topic_Detection_final.docx';

textract.fromFileWithPath(path, (err, text) => {
  if (err) {
    return err;
  }
  fs.writeFileSync('./data.txt', text, 'utf8');
});

const data = fs.readFileSync('./data.txt', 'utf8');

const startKeyword = 'mục lục';
const positionKeyword = data
  .toLowerCase()
  .trim()
  .indexOf(startKeyword);
const startTableOfContents = positionKeyword + startKeyword.length + 2;

// New data, remove contents before TOC(table of contents).
const newData = data.substring(startTableOfContents);

isMatch = (firstKey, secondKey) => {
  if (typeof Number.parseInt(firstKey) !== 'number') {
    return false;
  }
  if (!/^(\d.\d?(.\d)?)|((I|V|X)(I|V|X))$/g.test(secondKey)) {
    return false;
  }
  return true;
};

getWord = (data, index) => {
  let word = '';
  while (data.charAt(index) !== ' ' && index < data.length) {
    word += data.charAt(index);
    index++;
  }
  return {
    word,
    nextIndex: index < data.length ? index + 1 : -1
  };
};

getTableOfContents = data => {
  let currentIndex = 0;
  let previousFirstValue = 0;
  for (let i = 0; i < data.length; i++) {
    const firstWord = getWord(data, i);
    const secondWord =
      firstWord.nextIndex !== -1 ? getWord(data, firstWord.nextIndex) : '';
    i = firstWord.nextIndex - 1;
    if (
      isMatch(firstWord.word, secondWord.word) &&
      !Number.isNaN(firstWord.word) &&
      !Number.isNaN(previousFirstValue) &&
      Number.parseInt(firstWord.word) >= Number.parseInt(previousFirstValue)
    ) {
      currentIndex = firstWord.nextIndex;
      previousFirstValue = Number.parseInt(firstWord.word);
    }
  }
  for (let i = currentIndex + 2; i < data.length; i++) {
    const lastWord = getWord(data, i);
    if (!Number.isNaN(lastWord.word) && Number.parseInt(lastWord.word) >= previousFirstValue) {
      currentIndex = lastWord.nextIndex - 1;
      break;
    }
  }
  return {
    data: data.substring(0, currentIndex),
    nextIndex: currentIndex + 1
  };
};

console.log(getTableOfContents(newData).data);
