function powerWithoutMathPow(x, n) {
    if (n === 0) {
        return 1;
    }

    let result = 1;
    const absN = Math.abs(n);

    for (let i = 0; i < absN; i++) {
        result *= x;
    }

    return n < 0 ? 1 / result : result;
}

const base = 2;
const exponent = 3;
const result = powerWithoutMathPow(base, exponent);

console.log(`${base}^${exponent} is: ${result}`);
