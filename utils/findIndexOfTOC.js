const startKeyword = 'mục lục';

module.exports = data => {
  const positionKeyword = data
    .toLowerCase()
    .trim()
    .indexOf(startKeyword);
  return positionKeyword + startKeyword.length + 2;
};
