import React, {useEffect, useState} from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";
import {
    EMAIL_REG_EXP,
    INCORRECT_EMAIL,
    MAX_LENGTH_NAME, MAX_LENGTH_NAME_MESSAGE,
    MAX_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD_MESSAGE,
    MIN_LENGTH_NAME, MIN_LENGTH_NAME_MESSAGE,
    MIN_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD_MESSAGE, NAME_REG_EXP,
    REQUIRED_FIELD
} from "../../utils/constants";

export default function RegisterForm({
                                         onRegister,
                                         loggedIn,
                                         userData,
                                         setUserData,
                                         errorToolTip,
                                         hasError,
                                         setHasError
                                     }) {

    useEffect(() => {
        setHasError(false)
    }, [])

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
        onRegister({name, email, password})
        hasError ? setHasError(true) : setHasError(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
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
            hasError={hasError}
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
                           required: REQUIRED_FIELD,
                           minLength: {
                               value: MIN_LENGTH_NAME,
                               message: MIN_LENGTH_NAME_MESSAGE
                           },
                           maxLength: {
                               value: MAX_LENGTH_NAME,
                               message: MAX_LENGTH_NAME_MESSAGE
                           },
                           pattern: {
                               value: NAME_REG_EXP,
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
                           required: REQUIRED_FIELD,
                           pattern: {
                               value: EMAIL_REG_EXP,
                               message: INCORRECT_EMAIL
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
                           required: REQUIRED_FIELD,
                           minLength: {
                               value: MIN_LENGTH_PASSWORD,
                               message: MIN_LENGTH_PASSWORD_MESSAGE
                           },
                           maxLength: {
                               value: MAX_LENGTH_PASSWORD,
                               message: MAX_LENGTH_PASSWORD_MESSAGE
                           },
                       })}
                />
                {errors.password &&
                    <span className='form__input__err' id='name_field-err'>{errors?.password?.message}</span>}
            </label>
        </Form>
    )
}

