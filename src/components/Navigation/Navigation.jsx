import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Navigation.css'

export default function Navigation() {

    const location = useLocation()
    console.log(location)

    const navContainer =
        <div className='navigation__container'>
            <Link className="navigation__link" to="#">Регистрация</Link>
            <button className='navigation__button' type='submit'>Войти</button>
        </div>

    const navContainerAuth =
        <div className='navigation__auth-warp'>
            <div className='navigation__film-nav-container'>
                <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='movies'>Фильмы</NavLink>
                <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='saved-movies'>Сохранённые фильмы</NavLink>
            </div>
            <div className='navigation__container_auth'>
                <button className='navigation__account-btn' type='button'>Аккаунт</button>
            </div>
        </div>



    return (
        <nav className={location.pathname !== '/' ? 'navigation_authorized' : 'navigation'}>
            <Link className="navigation__logo-link" to="/">
                <img className="navigation__logo" src={logo} alt="логотип movies explorer"/>
            </Link>
            {location.pathname !== '/' ? navContainerAuth : navContainer}
        </nav>
    )
}