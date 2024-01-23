function findIntersection(arr1, arr2) {
    const commonElements = [];

    for (const element of arr1) {
        if (arr2.includes(element)) {
            commonElements.push(element);
        }
    }

    return commonElements;
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];
const result = findIntersection(arr1, arr2);

console.log("Intersection of the arrays:", result);
