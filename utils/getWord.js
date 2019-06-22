module.exports = (data, index) => {
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
