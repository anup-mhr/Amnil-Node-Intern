function reverseWords(sentence) {
    const words = sentence.split(' ');

    const reversedWords = words.reverse();

    const reversedSentence = reversedWords.join(' ');

    return reversedSentence;
}

const inputSentence = "Hello World, how are you?";
const reversedResult = reverseWords(inputSentence);

console.log(`Reversed sentence: ${reversedResult}`);