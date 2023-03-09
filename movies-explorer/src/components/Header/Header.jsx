import React from "react";
import logo from "../../images/logo.svg"
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <Link className="header__logo-link" to="/">
            <img className="header__logo" src={logo} alt="логотип movies explorer"/>
            </Link>
            <div className='header__container'>
                <Link className="header__link" to="#">Регистрация</Link>
                <button className='header__button' type='button'>Войти</button>
            </div>
        </header>
    )
}