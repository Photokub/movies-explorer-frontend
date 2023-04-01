import React from "react";
import './WelcomeScreen.css'
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";


export default function WelcomeScreen({
                                          title,
                                          subtitle,
                                          sublink,
                                          to,
                                          onRegister,
                                          userData,
                                          setUserData,
                                          loggedIn,
                                          login,
                                          errorToolTip,
                                          hasError,
                                          setHasError
                                      }) {
    const location = useLocation()

    let component
    if (location.pathname === '/signup') {
        component = <RegisterForm
            onRegister={onRegister}
            userData={userData}
            setUserData={setUserData}
            loggedIn={loggedIn}
            errorToolTip={errorToolTip}
            hasError={hasError}
            setHasError={setHasError}
        />
    } else if (location.pathname === '/signin') {
        component = <LoginForm
            login={login}
            userData={userData}
            setUserData={setUserData}
            loggedIn={loggedIn}
            errorToolTip={errorToolTip}
            hasError={hasError}
            setHasError={setHasError}
        />
    }

    return (
        <div className='welcome__warp'>
            <section className='welcome'>
                <img className='welcome__logo' src={logo} alt='логотип'/>
                <p className='welcome__title'>{title}</p>
                {component}
                <p className='welcome__subtitle'>{subtitle}<Link className='welcome__sublink' to={to}>{sublink}</Link>
                </p>
            </section>
        </div>
    )
}