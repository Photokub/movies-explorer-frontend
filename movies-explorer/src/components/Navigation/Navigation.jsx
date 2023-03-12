import React from "react";
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Navigation.css'

export default function Navigation() {
    return (
        <nav className='navigation'>
            <Link className="navigation__logo-link" to="/">
                <img className="navigation__logo" src={logo} alt="логотип movies explorer"/>
            </Link>
            <div className='navigation__container'>
                <Link className="navigation__link" to="#">Регистрация</Link>
                <button className='navigation__button' type='button'>Войти</button>
            </div>
        </nav>
    )
}