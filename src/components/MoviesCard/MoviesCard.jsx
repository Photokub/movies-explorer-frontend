import React from "react";
import './MoviesCard.css'
import SaveCheckbox from "../SaveCheckbox/SaveCheckbox";
import {useLocation} from "react-router-dom";

export default function MoviesCard({film, handleSaveMovie, savedMovies}) {
    const location = useLocation()
    const timeFull  = film.duration

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    }

    return (
        <section className='movies-card-element'>
            <div className='movies-card-element__label'>
                <p className='movies-card-element__label__title'>{film.nameRU}</p>
                <p className='movies-card-element__label__subtitle'>{getTimeFromMins(timeFull)}</p>
                <SaveCheckbox
                    handleSaveMovie={handleSaveMovie}
                    film={film}
                    savedMovies={savedMovies}
                />
            </div>
            <img className='movies-card-element__image' src={location.pathname !== '/saved-movies' ? `https://api.nomoreparties.co/${film.image.url}` : film.image} alt={`Афиша ${film.nameRU}`}/>
        </section>
    )
}