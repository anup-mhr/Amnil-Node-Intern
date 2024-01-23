function convertToTitleCase(sentence) {
  const words = sentence.split(' ');

  const titleCaseWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const titleCaseSentence = titleCaseWords.join(' ');

  return titleCaseSentence;
}

const sentence = "this is a sample sentence";
const titleCaseResult = convertToTitleCase(sentence);

console.log(`Result: ${titleCaseResult}`);