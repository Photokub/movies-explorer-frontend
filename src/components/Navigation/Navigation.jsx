import React, {useEffect, useState} from "react";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Navigation.css'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {BURGER_MENU_THRESHOLD} from "../../utils/constants";

export default function Navigation({loggedIn}) {

    const navigate = useNavigate();
    const signinRoute = () => navigate('/signin');
    const profileRoute = () => navigate('/profile');
    const location = useLocation()
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const navContainer =
        <div className='navigation__container'>
            <Link className="navigation__link" to="/signup">Регистрация</Link>
            <button className='navigation__button' type='submit' onClick={signinRoute}>Войти</button>
        </div>
    const navContainerAuth =
        <div className='navigation__auth-warp'>
            <div className='navigation__film-nav-container'>
                <NavLink
                    className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`}
                    to='movies'>Фильмы</NavLink>
                <NavLink
                    className={({isActive}) => `${isActive ? "navigation__movies-navlink_active" : "navigation__movies-navlink"}`}
                    to='saved-movies'>Сохранённые фильмы</NavLink>
            </div>
            <div className='navigation__container_auth'>
                <button className='navigation__account-btn' type='button' onClick={profileRoute}>Аккаунт</button>
            </div>
        </div>

    const navContainerMainAuth =
        <div className='navigation__auth-warp'>
            <div className='navigation__film-nav-container'>
                <NavLink
                    className={({isActive}) => `${isActive ? "navigation__movies-navlink-main_active" : "navigation__movies-navlink-main"}`}
                    to='movies'>Фильмы</NavLink>
                <NavLink
                    className={({isActive}) => `${isActive ? "navigation__movies-navlink-main_active" : "navigation__movies-navlink-main"}`}
                    to='saved-movies'>Сохранённые фильмы</NavLink>
            </div>
            <div className='navigation__container_auth'>
                <button className='navigation__account-btn_main' type='button' onClick={profileRoute}>Аккаунт</button>
            </div>
        </div>

    const menu = loggedIn && location.pathname !== '/' ? navContainerMainAuth : loggedIn && location.pathname === '/' ? navContainerAuth : navContainer

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    });

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return (
        <nav className={location.pathname !== '/' ? 'navigation_authorized' : 'navigation'}>
            <Link className="navigation__logo-link" to="/">
                <img className="navigation__logo" src={logo} alt="логотип movies explorer"/>
            </Link>
            {windowSize.innerWidth <= BURGER_MENU_THRESHOLD ? <BurgerMenu loggedIn={loggedIn}/> : menu}
        </nav>
    )
}