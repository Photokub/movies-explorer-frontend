import React from "react";
import './Footer.css'
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className='footer__list'>
                    <li className='footer__list__cell'><Link className='footer__link' to='#'>Яндекс.Практикум</Link></li>
                    <li className='footer__list__cell'><Link className='footer__link' to='#'>Github</Link></li>
                </ul>
            </div>
        </footer>
    )
}