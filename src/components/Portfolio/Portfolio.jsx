import React from "react";
import './Portfolio.css'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h6 className="portfolio__title">Портфолио</h6>
            <ul className="portfolio__list">
                <li className="portfolio__list__string">Статичный сайт<a className='portfolio__list__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">↗</a></li>
                <li className="portfolio__list__string">Адаптивный сайт<a className='portfolio__list__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">↗</a></li>
                <li className="portfolio__list__string">Одностраничное приложение<a className='portfolio__list__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">↗</a></li>
            </ul>
        </section>
    )
}