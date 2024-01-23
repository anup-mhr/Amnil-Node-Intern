function calculateArraySum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

const arr = [1, 2, 3, 4, 5];
const sumResult = calculateArraySum(arr);

console.log(`The sum of the array elements is: ${sumResult}`);