import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import React from "react";

export default function Login() {
    return (
        <WelcomeScreen
            title='Рады видеть!'
            subtitle='Ещё не зарегистрированы? '
            sublink='Регистрация'
        />
    )
}