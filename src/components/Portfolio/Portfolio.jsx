import React from "react";
import './Portfolio.css'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h6 className="portfolio__title">Портфолио</h6>
            <ul className="portfolio__list">
                <li className="portfolio__string"><a className='portfolio__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">Статичный сайт</a></li>
                <li className="portfolio__string"><a className='portfolio__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">Адаптивный сайт</a></li>
                <li className="portfolio__string"><a className='portfolio__link' href='https://photokub.github.io/russian-travel/' target='_blank' rel="noreferrer">Одностраничное приложение</a></li>
            </ul>
        </section>
    )
}