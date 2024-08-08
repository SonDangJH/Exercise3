function isValidPassword(password) {
    if (password.length < 8) {
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  
    return uppercaseRegex.test(password) &&
           numberRegex.test(password) &&
           specialCharRegex.test(password);
}

console.log(isValidPassword("abcd"));
console.log(isValidPassword("abcd@1234A"));
console.log(isValidPassword("abcd1234AB"));