const AuthForm = () => {
    return <form className="auth" name="auth-form">
        <div className="auth__content">
            <h2 className="auth__header">Sing up</h2>
            <input type="email" name="email" className="auth__input auth__email" placeholder="Enter email"/>
            <input type="password" name="password" className="auth__input auth__password" placeholder="Create your password"/>
            
            <div className="validation">
                <div className="validation__item validation__length">
                    8 characters or more (no spaces)
                </div>
                <div className="validation__item validation__case">
                    Uppercase and lowercase letters
                </div>
                <div className="validation__item validation__digit">
                    At least one digit
                </div>
            </div>

            <input type="button" className="auth__submit" value="Sign up"/>
        </div>        

    </form>
};

export default AuthForm;