import React from "react";
import './MoviesCard.css'
import SaveCheckbox from "../SaveCheckbox/SaveCheckbox";

export default function MoviesCard({film}) {
    const timeFull  = film.duration

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    return (
        <section className='movies-card-element'>
            <div className='movies-card-element__label'>
                <p className='movies-card-element__label__title'>{film.nameRU}</p>
                <p className='movies-card-element__label__subtitle'>{getTimeFromMins(timeFull)}</p>
                <SaveCheckbox/>
            </div>
            <img className='movies-card-element__image' src={`https://api.nomoreparties.co/${film.image.url}`} alt={`Афиша ${film.nameRU}`}/>
        </section>
    )
}