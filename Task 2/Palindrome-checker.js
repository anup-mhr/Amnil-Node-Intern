function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const reversedStr = cleanedStr.split('').reverse().join('');

  return cleanedStr === reversedStr;
}

const testString1 = "racecar";
const testString2 = "hello";

console.log(isPalindrome(testString1))
console.log(isPalindrome(testString2))