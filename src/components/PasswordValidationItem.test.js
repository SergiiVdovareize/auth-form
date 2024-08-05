import { render, screen } from '@testing-library/react';
import PasswordValidationItem from './PasswordValidationItem';

describe('PasswordValidationItem', () => {
    const defaultProps = {
        errorMessage: 'plain error message',
        isSubmitted: false,
        isValid: false
    };

    test('renders valid item', () => {
        const props = {
            ...defaultProps,
            isValid: true,
        };
    
        render(<PasswordValidationItem { ...props }/>);
        const element = screen.getByTestId('password-validation-item');

        expect(element).toHaveClass('validation__item-valid');
        expect(element).not.toHaveClass('validation__item-invalid');
        expect(element).toHaveTextContent(defaultProps.errorMessage)
    });

    test('renders invalid item', () => {
        const props = {
            ...defaultProps,
            isSubmitted: true,
        };
    
        render(<PasswordValidationItem { ...props }/>);
        const element = screen.getByTestId('password-validation-item');

        expect(element).toHaveClass('validation__item-invalid');
        expect(element).not.toHaveClass('validation__item-valid');
        expect(element).toHaveTextContent(defaultProps.errorMessage);
    });

    test('renders default item', () => {
        render(<PasswordValidationItem { ...defaultProps }/>);
        const element = screen.getByTestId('password-validation-item');

        expect(element).toHaveClass('validation__item');
        expect(element).not.toHaveClass('validation__item-invalid');
        expect(element).not.toHaveClass('validation__item-valid');
        expect(element).toHaveTextContent(defaultProps.errorMessage);
    });
});
