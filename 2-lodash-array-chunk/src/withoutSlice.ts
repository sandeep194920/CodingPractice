/* 
* Idea
- Maintain 2 arrays - One for main result ane one for chunk.
- Fill the chunk in for-loop - make sure the size is reached or the last element is reached (in both these conditions, add chunk to results array)
- Return the results



*/

const chunk = (array: number[], size = 1) => {
  const results = [];
  let chunk = [];

  for (let i = 0; i < array.length; i++) {
    chunk.push(array[i]);

    if (chunk.length === size || i === array.length - 1) {
      results.push(chunk);
      chunk = [];
    }
  }
  return results;
};

const result = chunk([1, 2, 3, 4, 5], 2);

console.log({ result });

export default chunk;
