import React from "react";
import './MoviesCard.css'
import image from '../../images/pic__COLOR_pic.png'

export default function MoviesCard() {
    return (
        <section className='movies-card-element'>
            <div className='movies-card-element__label'>
                <p className='movies-card-element__label__title'>33 слова о дизайне</p>
                <p className='movies-card-element__label__subtitle'>1ч 47м</p>
                <label className='save-checkbox'>
                    <input className='save-checkbox__switcher' type='checkbox'/>
                    <span className='save-checkbox__point' />
                </label>
            </div>
            <img className='movies-card-element__image' src={image} alt='картинка фильма'/>
        </section>
    )
}