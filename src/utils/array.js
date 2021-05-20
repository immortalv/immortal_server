const getDifference = (arr1, arr2) => {
  const ids = arr1.map(({ id }) => id);

  return arr2.reduce((acc, cur) => {
    if (!ids.includes(cur.id)) acc.push(cur.key);
    return acc;
  }, []);
};

module.exports = {
  getDifference,
};
