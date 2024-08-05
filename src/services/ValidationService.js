import ValidationRegex from "./ValidationRegex";

const validationService = {
    validateForm(data) {
        const passwordValidation = this.validatePassword(data.password);

        return {
            email: {
                isValid: this.isEmailValid(data.email),
            },
            password: {
                isValid:  Object.values(passwordValidation).every(value => value === true),
                data: passwordValidation,
            },
        };
    },
    
    isEmailValid(value) {
        return ValidationRegex.EMAIL.test(value);
    },

    validatePassword(value = '') {
        return {
            minLength: value.length >= 8,
            maxLength: value.length <= 64,
            spaces: ValidationRegex.SPACES.test(value),
            digits: ValidationRegex.DIGIT.test(value),
            lowerCase: ValidationRegex.LOWER_CASE.test(value),
            upperCase: ValidationRegex.UPPER_CASE.test(value),
        };
    },
};

export default validationService;
