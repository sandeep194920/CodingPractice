/* 

Using slice

size = 3
1st - i = 0
2nd - i = 3 


*/

const chunk = (array: number[], size = 1) => {
  const results = [];

  for (let i = 0; i < array.length; i += size) {
    const subArray = array.slice(i, i + size);
    results.push(subArray);
  }

  return results;
};

const result = chunk([1, 2, 3, 4, 5, 6, 7], 2);

console.log({ result });

/* 

Examples :

chunk(['a', 'b', 'c', 'd']); // => [['a'], ['b'], ['c'], ['d']]
chunk([1, 2, 3, 4], 2); // => [[1, 2], [3, 4]]
chunk([1, 2, 3, 4], 3); // => [[1, 2, 3], [4]]


*/

export default chunk;
