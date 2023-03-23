import React from "react";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

export default function Register({register, loggedIn}) {
    return (
        <WelcomeScreen
            title='Добро пожаловать!'
            subtitle='Уже зарегистрированы? '
            sublink='Войти'
            to='/signin'
            register={register}
            loggedIn={loggedIn}
        />
    )
}

