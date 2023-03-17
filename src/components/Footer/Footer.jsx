import React from "react";
import './Footer.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className='footer__list'>
                    <li className='footer__list__cell'><a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel="noreferrer">Яндекс.Практикум</a></li>
                    <li className='footer__list__cell'><a className='footer__link' href='https://github.com/Photokub' target='_blank' rel="noreferrer">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}