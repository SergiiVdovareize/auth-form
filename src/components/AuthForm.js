import { useEffect, useRef, useState } from "react";
import validationService from "../services/ValidationService";
import PasswordValidation from "./PasswordValidation";

const AuthForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [passwordSubmitted, setPasswordSubmitted] = useState(false)
    const [validationData, setValidationData] = useState({ email: {}, password: { data: {}}})
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(() => {
        setValidationData(validationService.validateForm({ email, password }))
    }, [email, password])
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailSubmitted(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordSubmitted(false);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setEmailSubmitted(true);
        setPasswordSubmitted(true);

        if (!validationData.email.isValid) {
            emailRef.current.focus()
        } else if (!validationData.password.isValid) {
            passwordRef.current.focus()
        }
    }

    const getEmailFieldClassList = () => {
        const classList = ['auth__input', 'auth__email']
        
        if (emailSubmitted) {
            classList.push(validationData.email.isValid ? 'auth__input_valid' : 'auth__input_invalid')
        }

        return classList.join(' ')
    }

    const getPasswordFieldClassList = () => {
        const classList = ['auth__input', 'auth__password']
        
        if (passwordSubmitted) {
            classList.push(Object.values(validationData.password.data).every(isValid => !!isValid) ? 'auth__input_valid' : 'auth__input_invalid')
        }

        return classList.join(' ')
    }

    return <form className="auth" action="#" name="auth-form" onSubmit={handleFormSubmit} noValidate>
        <div className="auth__content">
            <h2 className="auth__header">Sign up</h2>
            <input type="email" name="email" placeholder="Enter email"
                className={getEmailFieldClassList()}
                ref={emailRef}
                defaultValue={email}
                onChange={handleEmailChange} />

            <div className={`validation ${emailSubmitted && !validationData.email.isValid ? '' : 'validation_hidden'} `}>
                <div className="validation__item validation__item-invalid">
                    Email is not valid
                </div>
            </div>

            <div className="auth__input-with-icon">
                <input type={passwordVisibility ? 'text' : 'password'} name="password" placeholder="Create your password"
                    className={getPasswordFieldClassList()} 
                    ref={passwordRef}
                    maxLength={64}
                    defaultValue={password}
                    onChange={handlePasswordChange}/>

                <input type="button" className={`password-toggle ${passwordVisibility ? 'password-toggle_open' : 'password-toggle_closed'}`}
                    onClick={togglePasswordVisibility}
                />
            </div>
            
            <PasswordValidation passwordValidation={validationData.password.data} isSubmitted={passwordSubmitted}/>

            <input type="submit" className="auth__submit" value="Sign up"/>
        </div>        
    </form>
};

export default AuthForm;
