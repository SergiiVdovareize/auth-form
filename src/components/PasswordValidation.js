import PasswordValidationItem from "./PasswordValidationItem";

const PasswordValidation = ({ passwordValidation = {}, isSubmitted }) => {
    const itemList = [{
        key: 1,
        errorMessage: 'Between 8 and 64 characters (no spaces)',
        isValid: passwordValidation.minLength && passwordValidation.maxLength && passwordValidation.spaces,
    }, {
        key: 2,
        errorMessage: 'Uppercase and lowercase letters',
        isValid: passwordValidation.upperCase && passwordValidation.lowerCase,
    }, {
        key: 3,
        errorMessage: 'At least one digit',
        isValid: passwordValidation.digits,
    }];

    return <div data-testid="password-validation" className="validation">
        { itemList.map(({ key, errorMessage, isValid }) => (
            <PasswordValidationItem key={key} errorMessage={errorMessage} isSubmitted={isSubmitted} isValid={isValid}/>
        ))}
    </div>;
};

export default PasswordValidation;
