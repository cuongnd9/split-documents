const getWord = require('./getWord');
const isMatch = require('./isMatch');

module.exports = data => {
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
      Number.parseInt(firstWord.word) >= previousFirstValue
    ) {
      currentIndex = firstWord.nextIndex;
      previousFirstValue = Number.parseInt(firstWord.word);
    }
  }
  for (let i = currentIndex + 2; i < data.length; i++) {
    const lastWord = getWord(data, i);
    if (
      !Number.isNaN(lastWord.word) &&
      Number.parseInt(lastWord.word) >= previousFirstValue
    ) {
      currentIndex = lastWord.nextIndex - 1;
      break;
    }
  }
  return {
    value: data.substring(0, currentIndex),
    nextIndex: currentIndex + 1
  };
};
