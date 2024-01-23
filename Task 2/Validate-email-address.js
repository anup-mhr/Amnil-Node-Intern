function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

const emailToValidate = "user@example.com";
const isValid = isValidEmail(emailToValidate);

console.log(`Is "${emailToValidate}" a valid email address? ${isValid}`);