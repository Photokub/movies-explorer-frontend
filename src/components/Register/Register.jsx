import React from "react";
import './Register.css'
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

export default function Register() {
    return (
        <WelcomeScreen
            title='Добро пожаловать!'
            subtitle='Уже зарегистрированы? '
            sublink='Войти'
        />
    )
}

