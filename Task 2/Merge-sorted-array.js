function mergeSortedArrays(arr1,arr2){
    return [...arr1,...arr2].sort((x,y)=>x-y)
}

const sortedArray1 = [1, 3, 5, 7, 9];
const sortedArray2 = [2, 4, 6, 8, 10];
const resultArray = mergeSortedArrays(sortedArray1, sortedArray2);

console.log("Merged Sorted Array:", resultArray);
