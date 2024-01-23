function isBalanced(exp) {

    // Initialising Variables
    let flag = true
    let count = 0
    let brackets = ['(', '{', '[']

    for (let i = 0; i < exp.length; i++) {
        if (brackets.includes(exp[i]))
            count += 1
        else
            // It is a closing parenthesis
            count -= 1

        if (count < 0) {
            flag = false
            break
        }
    }

    if (count != 0)
        flag = false

    return flag
}

const balancedString = "{[()]}";
const unbalancedString = "[(){]";

console.log(`Is "${balancedString}" balanced? ${isBalanced(balancedString)}`);
console.log(`Is "${unbalancedString}" balanced? ${isBalanced(unbalancedString)}`);