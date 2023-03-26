import React from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";

export default function RegisterForm({ onRegister, loggedIn, userData, setUserData, errorToolTip }) {

    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const name = watch('name')
    const email = watch('email')
    const password = watch('password')

    const handleRegisterSubmit = () => {
        onRegister({ name, email, password })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        console.log(userData)
    }

    return (
        <Form
            name='register_form'
            method='post'
            btnText='Зарегистрироваться'
            onRegister={onRegister}
            loggedIn={loggedIn}
            userData={userData}
            handleSubmit={handleSubmit(handleRegisterSubmit)}
            isValid={isValid}
            errorToolTip={errorToolTip}
        >
            <label className='form__field'>
                <span className='form__input__title'>Имя</span>
                <input className='form__input'
                       type='text'
                       name='name'
                       required
                       value={name}
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
                {errors.name && <span className='form__input__err' id='name_field-err'>{errors?.name?.message}</span>}
            </label>
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                       type='email'
                       required
                       value={email}
                       onChange={handleChange}
                       {...register('email', {
                           required: 'Обязательное поле',
                           pattern: {
                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                               message: 'Некорректный емайл'
                           }
                       })}
                />
                {errors.email && <span className='form__input__err' id='name_field-err'>{errors?.email?.message}</span>}
            </label>
            <label className='form__field'>
                <span className='form__input__title'>Пароль</span>
                <input className='form__input'
                       type='password'
                       required
                       value={password}
                       onChange={handleChange}
                       {...register('password', {
                           required: 'Обязательное поле',
                           minLength: {
                               value: 6,
                               message: 'Введите минимум 6 символа'
                           },
                           maxLength: {
                               value: 20,
                               message: 'Допустимо максимум 20 символов'
                           },
                       })}
                />
                {errors.password && <span className='form__input__err' id='name_field-err'>{errors?.password?.message}</span>}
            </label>
        </Form>
    )
}

