import { fireEvent, render, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

jest.mock('./PasswordValidation');

describe('Auth Form', () => {
    test('switches password field type', () => {
        render(<AuthForm/>);
        const passwordField = screen.getByTestId('password-field');
        const passwordVisibilityIcon = screen.getByTestId('password-visibility');
        

        expect(passwordField).toHaveAttribute('type', 'password');
        expect(passwordVisibilityIcon).toHaveClass('password-toggle_closed');
        expect(passwordVisibilityIcon).not.toHaveClass('password-toggle_open');

        fireEvent.click(passwordVisibilityIcon);
        expect(passwordField).toHaveAttribute('type', 'text');
        expect(passwordVisibilityIcon).toHaveClass('password-toggle_open');
        expect(passwordVisibilityIcon).not.toHaveClass('password-toggle_closed');
    });

    test('renders invalid form fields', () => {
        render(<AuthForm/>);
        const submitButton = screen.getByTestId('submit-button');
        const emailField = screen.getByTestId('email-field');
        const passwordField = screen.getByTestId('password-field');
        fireEvent.click(submitButton);

        expect(emailField).toHaveClass('auth__input_invalid');
        expect(passwordField).toHaveClass('auth__input_invalid');

        fireEvent.change(emailField, {target: {value: 'em'}});
        fireEvent.change(passwordField, {target: {value: 'ps'}});

        expect(emailField).not.toHaveClass('auth__input_invalid');
        expect(passwordField).not.toHaveClass('auth__input_invalid');
    });

    test('renders valid form fields', () => {
        render(<AuthForm/>);
        const submitButton = screen.getByTestId('submit-button');
        const emailField = screen.getByTestId('email-field');
        const passwordField = screen.getByTestId('password-field');
        
        fireEvent.change(emailField, {target: {value: 'temp@mail.co'}});
        fireEvent.change(passwordField, {target: {value: 'StrongPas2'}});
        fireEvent.click(submitButton);

        expect(emailField).toHaveClass('auth__input_valid');
        expect(passwordField).toHaveClass('auth__input_valid');
    });
});
