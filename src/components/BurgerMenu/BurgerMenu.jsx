import React, {useState} from "react";
import './BurgerMenu.css'
import {Link, NavLink, useNavigate, useLocation} from "react-router-dom";

export default function BurgerMenu({loggedIn}) {

    const location = useLocation()

    const page = document.body
    const [isSubscribed, setIsSubscribed] = useState(false);
    const navigate = useNavigate();
    const profileRoute = () => navigate('/profile');

    const handleChange = (event) => {
        if (event.target.checked) {
            page.style.overflowY = 'hidden'
        } else {
            page.style.overflowY = 'scroll'
        }
        setIsSubscribed(current => !current);
    };

    const stripeClassName = location.pathname !== '/' ? 'burger__container__stripe' : 'burger__container__stripe_main'

    const nonAuthMenu = <ul className='burger-menu-list'>
        <li className='burger-menu-list__string'>
            <Link to='/signup' className='burger-menu__list-navlink'>Регистрация</Link>
        </li>
        <li className='burger-menu-list__string'>
            <Link to='/signin' className='burger-menu__list-navlink'>Войти</Link>
        </li>
    </ul>

    const authMenu = <ul className='burger-menu-list'>
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
            <button className='navigation__account-btn' type='button' onClick={profileRoute}>Аккаунт
            </button>
        </div>
    </ul>

    return (
        <nav className='burger' role='navigation'>
            <div className='burger__container'>
                <input
                    className='burger__container__input'
                    type="checkbox"
                    defaultChecked={isSubscribed}
                    onChange={handleChange}
                />
                <span className={stripeClassName}></span>
                <span className={stripeClassName}></span>
                <span className={stripeClassName}></span>

                {!loggedIn ? nonAuthMenu : authMenu}

                <span className='burger__substrate'/>
            </div>
        </nav>
    )
}