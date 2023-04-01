import React from "react";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

export default function Register({onRegister, loggedIn, userData, setUserData, errorToolTip, hasError, setHasError}) {
    return (
        <WelcomeScreen
            title='Добро пожаловать!'
            subtitle='Уже зарегистрированы? '
            sublink='Войти'
            to='/signin'
            onRegister={onRegister}
            loggedIn={loggedIn}
            userData={userData}
            setUserData={setUserData}
            errorToolTip={errorToolTip}
            hasError={hasError}
            setHasError={setHasError}
        />
    )
}

