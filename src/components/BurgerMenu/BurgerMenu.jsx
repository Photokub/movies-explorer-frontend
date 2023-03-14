import React from "react";
import './BurgerMenu.css'
import {Link, NavLink} from "react-router-dom";

export default function BurgerMenu() {
    return (
        <nav className='burger' role='navigation' >
            <div className='burger__container'>
                <input className='burger__container__input' type="checkbox"/>
                <span className='burger__container__stripe'></span>
                <span className='burger__container__stripe'></span>
                <span className='burger__container__stripe'></span>
                <ul className='burger_menu'>
                    <li>
                        <Link to='/' className='navigation__movies-navlink'>Главная</Link>
                    </li>
                    <li>
                    <div className='navigation__film-nav-container_burger'>
                        <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='movies'>Фильмы</NavLink>
                        <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='saved-movies'>Сохранённые фильмы</NavLink>
                    </div>
                    </li>
                    <li>
                    <div className='navigation__container_auth'>
                        <button className='navigation__account-btn' type='button'>Аккаунт</button>
                    </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}