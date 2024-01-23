function calculateFactorial(n) {
    if (n < 0) return "Undefined";
    else if (n === 0 || n === 1) return 1;
    else {
        let fact = 1;
        for (let i = 2; i <= n; i++) {
            fact *= i;
        }
        return fact;
    }
}

const number = 5;
const factorialResult = calculateFactorial(number);

console.log(factorialResult)