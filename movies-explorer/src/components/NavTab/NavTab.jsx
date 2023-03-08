import React from "react";
import {Link} from 'react-router-dom'
import  './NavTab.css'

export default function NavTab() {
    return (
        <section className='nav-tab'>
            <Link className='nav-tab__link'>О проекте</Link>
            <Link className='nav-tab__link'>Технологии</Link>
            <Link className='nav-tab__link'>Студент</Link>
        </section>
    )
}