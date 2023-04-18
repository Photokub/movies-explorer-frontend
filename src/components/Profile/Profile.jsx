import React, {useContext} from "react";
import './Profile.css'
import {useForm} from "react-hook-form";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {InfoToolTip} from "../InfoToolTip/InfoToolTip";

export default function Profile({logOut, userData, setUserData, updateUser, isInfoToolTipPopupOpen, isReqChangingUserData}) {

    const currentUser = useContext(CurrentUserContext)

    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        defaultValues: {
            name: currentUser.name,
            email: currentUser.email,
        },
        mode: 'onChange'
    });

    const name = watch('name')
    const email = watch('email')

    const handleUpdateSubmit = () => {
        updateUser({name, email})
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const invalidData = !isValid || (email === currentUser.email && name === currentUser.name)

    return (
        <section className='profile'>
            <div className='profile__container'>
                <p className='profile__title'>Привет, {currentUser.name}!</p>
                <form className='profile-form' onSubmit={handleSubmit(() => {
                    handleUpdateSubmit()
                })}>
                    <div className='profile-form__container'>
                        <label className='profile-form__field'>
                            <span className='profile-form__input__title'>Имя</span>
                            <input className='profile-form__input'
                                   type='text'
                                   name='name_field'
                                   required
                                   defaultValue={currentUser.name}
                                   onChange={handleChange}
                                   {...register('name', {
                                       required: 'Обязательное поле',
                                       minLength: {
                                           value: 2,
                                           message: 'Введите минимум 2 символа'
                                       },
                                       maxLength: {
                                           value: 20,
                                           message: 'Допустимо максимум 20 символов'
                                       },
                                       pattern: {
                                           value: /^[A-Za-zА-Яа-яЁё /h -]+$/,
                                           message: 'Вы должны использовать только латиницу, кириллицу, пробел или дефис'
                                       }
                                   })}
                            />
                            {errors.name && <span className='profile-form__input__err'
                                                  id='name_field-err'>{errors?.name?.message}</span>}
                        </label>
                        <label className='profile-form__field'>
                            <span className='profile-form__input__title'>E-mail</span>
                            <input className='profile-form__input'
                                   type='email'
                                   name='email_field'
                                   required
                                   defaultValue={currentUser.email}
                                   onChange={handleChange}
                                   {...register('email', {
                                       required: 'Обязательное поле',
                                       pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: 'Некорректный емайл'
                                       }
                                   })}
                            />
                            {errors.email && <span className='profile-form__input__err'
                                                   id='name_field-err'>{errors?.email?.message}</span>}
                        </label>
                        <InfoToolTip
                            isInfoTooltipPopupOpen={isInfoToolTipPopupOpen}
                            isReqChangingUserData={isReqChangingUserData}
                        />
                        <button className={invalidData ? 'profile-form__btn_disabled' : 'profile-form__btn_enabled'}
                                type='submit' disabled={invalidData}>Редактировать
                        </button>
                    </div>
                </form>
                <button className='profile__logout-btn' onClick={logOut}>Выйти из аккаунта</button>
            </div>
        </section>
    )
}