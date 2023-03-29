import React, {useCallback, useState} from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";

export default function LoginForm({login, loggedIn, userData, setUserData, errorToolTip, hasError}){

    const [errorStatus, setErrorStatus] = useState(false)
    const [loginStatus, setLoginStatus] = useState(false)

    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const email = watch('email')
    const password = watch('password')

    const handleLoginSubmit = () => {
        login({ email, password })
        hasError ? setErrorStatus(true) : setErrorStatus(false)
       // handleErr()
    }

    // const handleErr = useCallback(() => {
    //     !loggedIn ? setErrorStatus(true) : setErrorStatus(false)
    // }, [loggedIn])



    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        console.log(userData)
    }

    return(
        <Form
            name='register'
            method='post'
            btnText='Войти'
            login={login}
            loggedIn={loggedIn}
            userData={userData}
            handleSubmit={handleSubmit(handleLoginSubmit)}
            isValid={isValid}
            errorToolTip={errorToolTip}
            errorStatus={errorStatus}
        >
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

