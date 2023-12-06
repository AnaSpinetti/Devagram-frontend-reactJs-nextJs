const validateEmail = (email) => {
    let emailString = email.toString();
    return emailString.includes('@') && emailString.includes('.') && emailString.length >= 5;
}

const validatePassword = (password) => {
    return password?.toString().length > 5;
}

const validateConfirmPassword = (password, confirmPassword) => {
    return validatePassword(password) && password === confirmPassword;
}

const validateName = (name) => {
    return name?.toString().length > 2;
}

export {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword
}