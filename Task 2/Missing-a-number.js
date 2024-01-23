function findMissingNumber(nums) {
    const n = nums.length
    for (let i = 0; i < n; i++) {
        if (nums.includes(i)) continue;
        return i
    }
}

const numbers = [3, 0, 1, 4, 6, 2, 7, 8];
const missingNumber = findMissingNumber(numbers);

console.log(`The missing number is: ${missingNumber}`);