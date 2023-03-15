import React from "react";
import './BurgerMenu.css'
import {Link, NavLink} from "react-router-dom";

export default function BurgerMenu() {
    return (
        <nav className='burger' role='navigation'>
            <div className='burger__container'>
                <input className='burger__container__input' type="checkbox"/>
                <span className='burger__container__stripe'></span>
                <span className='burger__container__stripe'></span>
                <span className='burger__container__stripe'></span>
                <ul className='burger-menu-list'>
                    <li className='burger-menu-list__string'>
                        <Link to='/' className='burger-menu__list-navlink'>Главная</Link>
                    </li>
                    <li className='burger-menu-list__string'>
                        <NavLink
                            className={({isActive}) => `${isActive ? "burger-menu__list-navlink_active" : "burger-menu__list-navlink"}`}
                            to='movies'>Фильмы</NavLink>
                    </li>
                    <li className='burger-menu-list__string'>
                        <NavLink
                            className={({isActive}) => `${isActive ? "burger-menu__list-navlink_active" : "burger-menu__list-navlink"}`}
                            to='saved-movies'>Сохранённые фильмы</NavLink>
                    </li>
                    <div className='navigation__container_auth burger-menu__container_auth'>
                        <button className='navigation__account-btn' type='button'>Аккаунт</button>
                    </div>
                </ul>
                <span className='burger__substrate'/>
            </div>
        </nav>
    )
}