import React from "react";
import {Link, animateScroll as scroll} from "react-scroll";
import './NavTab.css'

export default function NavTab() {

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    return (
        <nav className='nav-tab'>
            <Link
                className='nav-tab__link'
                to='about-project'
                spy={true}
                smooth={true}
                onClick={scrollToTop}
            >О проекте</Link>
            <Link
                className='nav-tab__link'
                to='techs'
                spy={true}
                smooth={true}
                onClick={scrollToTop}
            >Технологии</Link>
            <Link
                className='nav-tab__link'
                to='about-me'
                spy={true}
                smooth={true}
                onClick={scrollToTop}
            >Студент</Link>
        </nav>
    )
}