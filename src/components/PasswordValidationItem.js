const PasswordValidationItem = ({ errorMessage, isSubmitted, isValid }) => {
    const classList = ['validation__item'];
    if (isValid) {
        classList.push('validation__item-valid');
    } else if (isSubmitted) {
        classList.push('validation__item-invalid');
    }

    return <div data-testid="password-validation-item" className={classList.join(' ')}>
        { errorMessage }
    </div>;
};

export default PasswordValidationItem;
