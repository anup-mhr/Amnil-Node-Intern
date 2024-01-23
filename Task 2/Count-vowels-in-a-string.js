function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    return str.toLowerCase().split('').filter(x => vowels.includes(x)).length;
}

const str = "Hello, World!";
const vowelCountResult = countVowels(str);

console.log(`Number of vowels in "${testString}": ${vowelCountResult}`);
