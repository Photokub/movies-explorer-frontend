import React from "react";
import './Portfolio.css'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h6 className="portfolio__title">Портфолио</h6>
            <ul className="portfolio__list">
                <li className="portfolio__list__string">Статичный сайт</li>
                <li className="portfolio__list__string">Адаптивный сайт</li>
                <li className="portfolio__list__string">Одностраничное приложение</li>
            </ul>
        </section>
    )
}