import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import React from "react";

export default function Login({login, loggedIn, userData ,setUserData, errorToolTip}) {
    return (
        <WelcomeScreen
            title='Рады видеть!'
            subtitle='Ещё не зарегистрированы? '
            sublink='Регистрация'
            to='/signup'
            login={login}
            loggedIn={loggedIn}
            userData={userData}
            setUserData={setUserData}
            errorToolTip={errorToolTip}
        />
    )
}