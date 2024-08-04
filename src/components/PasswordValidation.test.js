import { render, screen } from '@testing-library/react';
import PasswordValidation from './PasswordValidation';
import PasswordValidationItem from './PasswordValidationItem';

// jest.mock('./PasswordValidationItem', () => ({ errorMessage, isSubmitted, isValid }) => <div data-testid="mocked-validation-item">{errorMessage}</div>);
jest.mock('./PasswordValidationItem')
describe.only('password validation', () => {

    const defaultProps = {
        passwordValidation: {
            minLength: false,
            maxLength: false,
            spaces: false,
            upperCase: false,
            lowerCase: false,
            digits: false,
        },
        isSubmitted: false,
    };

    test('renders 3 invalid items', () => {
        render(<PasswordValidation { ...defaultProps }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem).toHaveBeenCalledTimes(3);
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(1, { errorMessage: 'Between 8 and 64 characters (no spaces)', isSubmitted: false, isValid: false }, {});
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(2, { errorMessage: 'Uppercase and lowercase letters', isSubmitted: false, isValid: false }, {});
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(3, { errorMessage: 'At least one digit', isSubmitted: false, isValid: false }, {});
    });

    test('renders valid items', () => {
        const props = {
            passwordValidation: {
                minLength: true,
                maxLength: true,
                spaces: true,
                upperCase: true,
                lowerCase: true,
                digits: true,   
            },
            isSubmitted: true,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem).toHaveBeenCalledTimes(3);
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(1, { errorMessage: 'Between 8 and 64 characters (no spaces)', isSubmitted: true, isValid: true }, {});
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(2, { errorMessage: 'Uppercase and lowercase letters', isSubmitted: true, isValid: true }, {});
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(3, { errorMessage: 'At least one digit', isSubmitted: true, isValid: true }, {});
    });

    test('renders invalid length message because of min length', () => {
        const props = {
            passwordValidation: {
                minLength: false,
                maxLength: true,
                spaces: true,
            },
            isSubmitted: false,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(1, { errorMessage: 'Between 8 and 64 characters (no spaces)', isSubmitted: false, isValid: false }, {});
    });

    test('renders invalid length message because of max length', () => {
        const props = {
            passwordValidation: {
                minLength: true,
                maxLength: false,
                spaces: true,
            },
            isSubmitted: false,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(1, { errorMessage: 'Between 8 and 64 characters (no spaces)', isSubmitted: false, isValid: false }, {});
    });

    test('renders invalid length message because of spaces', () => {
        const props = {
            passwordValidation: {
                minLength: true,
                maxLength: true,
                spaces: false,
            },
            isSubmitted: false,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(1, { errorMessage: 'Between 8 and 64 characters (no spaces)', isSubmitted: false, isValid: false }, {});
    });

    test('renders invalid case message because of upper letters', () => {
        const props = {
            passwordValidation: {
                upperCase: false,
                lowerCase: true,
            },
            isSubmitted: false,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(2, { errorMessage: 'Uppercase and lowercase letters', isSubmitted: false, isValid: false }, {});
    });

    test('renders invalid case message because of lower letters', () => {
        const props = {
            passwordValidation: {
                upperCase: true,
                lowerCase: false,
            },
            isSubmitted: false,
        };
    
        render(<PasswordValidation { ...props }/>);
        const element = screen.getByTestId('password-validation')

        expect(element).toHaveClass('validation');
        expect(PasswordValidationItem)
            .toHaveBeenNthCalledWith(2, { errorMessage: 'Uppercase and lowercase letters', isSubmitted: false, isValid: false }, {});
    });
})