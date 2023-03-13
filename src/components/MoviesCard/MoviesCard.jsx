import React from "react";
import './MoviesCard.css'
import image from '../../images/pic__COLOR_pic.png'
import saved_enabled from '../../images/save9.svg'
import saved_disabled from '../../images/save9d.svg'

export default function MoviesCard() {
    return (
        <section className='movies-card-element'>
            <div className='movies-card-element__label'>
                <p className='movies-card-element__label__title'>33 слова о дизайне</p>
                <p className='movies-card-element__label__subtitle'>1ч 47м</p>
                <img className='movies-card-element__label__enabled' src={saved_enabled} alt='фильм сохранен'/>
                {/*<img className='movies-card-element__label__disabled' src={saved_disabled} alt='фильм не сохранен'/>*/}
            </div>
            <img className='movies-card-element__image' src={image} alt='картинка фильма'/>
        </section>
    )
}