function findLongestWord(sentence) {

    const words = sentence.split(' ');
    let longestWord = '';
    let maxLength = 0;

    for (const word of words) {
        if (word.length > maxLength) {
            maxLength = word.length;
            longestWord = word;
        }
    }
    return longestWord;
}

const sentence = "The quick brown fox jumps over the lazy dog";
const longestWord = findLongestWord(sentence);

console.log(`Longest word in the sentence: "${longestWord}"`);