import React from "react";
import './Profile.css'

export default function Profile() {
    return (
        <section className='profile'>
            <div className='profile__container'>
                <p className='profile__title'>Привет, Виталий!</p>
                <form className='profile-form'>
                    <ul className='profile-form__fields'>
                        <li className='profile-form__fields__line'>
                            <p className='profile-form__fields__line__text'>Имя</p>
                            <p className='profile-form__fields__line__text'>Виталий</p>
                        </li>
                        <li className='profile-form__fields__line'>
                            <p className='profile-form__fields__line__text'>E-mail</p>
                            <p className='profile-form__fields__line__text'>pochta@yandex.ru</p>
                        </li>
                    </ul>
                    <button className='profile-form__btn'>Редактировать</button>
                </form>
                <button className='profile__logout-btn'>Выйти из аккаунта</button>
            </div>
        </section>
    )
}