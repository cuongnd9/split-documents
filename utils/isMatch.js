module.exports = (firstKey, secondKey) => {
  if (Number.isNaN(Number.parseInt(firstKey))) {
    return false;
  }
  const regex = /\d+\.\d*(\.\d*)*$/g;
  if (!regex.test(secondKey)) {
    return false;
  }
  return true;
};
