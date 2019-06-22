module.exports = (firstKey, secondKey) => {
  if (typeof Number.parseInt(firstKey) !== 'number') {
    return false;
  }
  if (!/^(\d.\d?(.\d)?)|((I|V|X)(I|V|X))$/g.test(secondKey)) {
    return false;
  }
  return true;
};
