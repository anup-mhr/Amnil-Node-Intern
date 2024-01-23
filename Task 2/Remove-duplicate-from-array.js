function removeDuplicates(arr) {
    // Use a Set to store unique values
    const uniqueSet = new Set(arr);

    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
}

const inputArray = [1, 2, 3, 4, 3, 2, 5, 6, 7, 8, 7, 9];
const resultArray = removeDuplicates(inputArray);

console.log("Array with Duplicates Removed:", resultArray);