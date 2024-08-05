import validationService from './ValidationService';

describe('ValidationService', () => {
    describe('isEmailValid', () => {
        it('should return true for a valid email', () => {
            expect(validationService.isEmailValid('test@example.com')).toBe(true);
        });

        it('should return false for an invalid email', () => {
            expect(validationService.isEmailValid('invalid-email')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should return correct validation for a valid password', () => {
            const password = 'Valid1Password';
            const validation = validationService.validatePassword(password);
            expect(validation).toEqual({
                minLength: true,
                maxLength: true,
                spaces: true,
                digits: true,
                lowerCase: true,
                upperCase: true,
            });
        });

        it('should return correct validation for a password with spaces', () => {
            const password = 'Invalid Password7';
            const validation = validationService.validatePassword(password);
            expect(validation.spaces).toBe(false);
        });

        it('should return correct validation for a password without digits', () => {
            const password = 'InvalidPassword';
            const validation = validationService.validatePassword(password);
            expect(validation.digits).toBe(false);
        });

        it('should return correct validation for a password without lowercase letters', () => {
            const password = 'INVALIDPASSWORD1';
            const validation = validationService.validatePassword(password);
            expect(validation.lowerCase).toBe(false);
        });

        it('should return correct validation for a password without uppercase letters', () => {
            const password = 'invalidpassword1';
            const validation = validationService.validatePassword(password);
            expect(validation.upperCase).toBe(false);
        });

        it('should return correct validation for a short password', () => {
            const password = 'Short1';
            const validation = validationService.validatePassword(password);
            expect(validation.minLength).toBe(false);
        });

        it('should return correct validation for a long password', () => {
            const password = 'A'.repeat(65);
            const validation = validationService.validatePassword(password);
            expect(validation.maxLength).toBe(false);
        });
    });
});
