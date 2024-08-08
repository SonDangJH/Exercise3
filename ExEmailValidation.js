function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

console.log(isValidEmail("aloo"));
console.log(isValidEmail("ALOO@gmail.com"));