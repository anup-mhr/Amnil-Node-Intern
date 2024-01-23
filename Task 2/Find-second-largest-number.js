function findSecondLargest(arr) {
    if (arr.length < 2) {
        return "Array is too small";
    }

    return arr.sort((x, y) => y - x)[1]
}

const numbers = [5, 2, 8, 1, 9, 3];
const secondLargestResult = findSecondLargest(numbers);

console.log(`Second largest number in the array: ${secondLargestResult}`);