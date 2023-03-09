import React from "react";
import {Link} from 'react-router-dom'
import  './NavTab.css'

export default function NavTab() {
    return (
        <section className='nav-tab'>
            <Link className='nav-tab__link' to="#">О проекте</Link>
            <Link className='nav-tab__link' to="#">Технологии</Link>
            <Link className='nav-tab__link' to="#">Студент</Link>
        </section>
    )
}