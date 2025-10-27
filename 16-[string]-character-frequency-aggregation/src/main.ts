const compressAndSort = (input: string): string => {
  const frequencyMap = new Map<string, number>();

  for (let i = 0; i < input.length; i += 2) {
    const char = input[i];
    const count = parseInt(input[i + 1]);

    if (!isNaN(count)) {
      const charCount = frequencyMap.get(char) || 0 + 1;
      frequencyMap.set(char, charCount);
    }
  }

  let result = "";
  for (const [char, count] of frequencyMap.entries()) {
    result += char;
    result += count;
  }

  return result;
};

const input = "a3b2c5g1g9c2"; // output - a3b2c7g10

console.log(compressAndSort(input));
