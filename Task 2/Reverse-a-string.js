function reverseString(string) {
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }

  return reversedString;
}

const originalString = 'Hello, World!';
const reversedResult = reverseString(originalString);

console.log(reversedResult);