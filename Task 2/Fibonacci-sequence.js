function generateFibonacciSequence(numTerms) {
  const fibonacciSequence = [];

  if (numTerms >= 1) {
    fibonacciSequence.push(0);
  }
  if (numTerms >= 2) {
    fibonacciSequence.push(1);
  }

  for (let i = 2; i < numTerms; i++) {
    const nextTerm = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
    fibonacciSequence.push(nextTerm);
  }

  return fibonacciSequence;
}

const numTerms = 10;
const fibonacciResult = generateFibonacciSequence(numTerms);

console.log(`Fibonacci sequence up to ${numTerms} terms: ${fibonacciResult}`);
