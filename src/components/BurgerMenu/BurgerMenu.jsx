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
                <ul className='burger-menu-list'>
                    <li className='burger-menu-list__string'>
                        <Link to='/' className='burger-menu__list-navlink'>Главная</Link>
                    {/*<div className='navigation__film-nav-container_burger'>*/}
                    {/*    <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='movies'>Фильмы</NavLink>*/}
                    {/*    <NavLink className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`} to='saved-movies'>Сохранённые фильмы</NavLink>*/}
                    {/*</div>*/}
                    </li>
                    <li className='burger-menu-list__string'>
                        <NavLink className={({isActive}) => `${isActive ? "burger-menu__list-navlink_active" : "burger-menu__list-navlink"}`} to='movies'>Фильмы</NavLink>
                    </li>
                    <li className='burger-menu-list__string'>
                        <NavLink className={({isActive}) => `${isActive ? "burger-menu__list-navlink_active" : "burger-menu__list-navlink"}`} to='saved-movies'>Сохранённые фильмы</NavLink>
                    </li>
                    {/*<li>*/}
                    {/*</li>*/}
                    <div className='navigation__container_auth navigation__container_auth_burger'>
                        <button className='burger-menu-list__btn' type='button'>Аккаунт</button>
                    </div>
                </ul>
            </div>
        </nav>
    )
}