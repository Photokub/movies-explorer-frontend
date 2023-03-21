import React from "react";
import './MoviesCard.css'
import SaveCheckbox from "../SaveCheckbox/SaveCheckbox";

export default function MoviesCard({film}) {
    return (
        <section className='movies-card-element'>
            <div className='movies-card-element__label'>
                <p className='movies-card-element__label__title'>{film.nameRU}</p>
                <p className='movies-card-element__label__subtitle'>{film.duration}</p>
                <SaveCheckbox/>
            </div>
            <img className='movies-card-element__image' src={`https://api.nomoreparties.co/${film.image.url}`} alt={`Афиша ${film.nameRU}`}/>
        </section>
    )
}