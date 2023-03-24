import React from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";

export default function RegisterForm({ onRegister, loggedIn, userData, setUserData   }) {

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

    const handleOnSubmit = () => {
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
            //handleSubmit={handleSubmit}
            handleSubmit={handleSubmit(handleOnSubmit)}
        >
            <label className='form__field'>
                <span className='form__input__title'>Имя</span>
                <input className='form__input'
                       type='text'
                       name='name'
                    //defaultValue=""
                       required
                       value={userData.name}
                       onChange={handleChange}
                       {...register('name', {
                           required: 'Обязательное поле',
                           minLength: {
                               value: 2,
                               message: 'вы должны заполнить минимум 2 символа'
                           },
                           maxLength: {
                               value: 20,
                               message: 'вы должны заполнить максимум 20 символов'
                           },
                           pattern: {
                               value: /^[A-Za-zА-Яа-яЁё /h -]+$/,
                               message: 'Имя не должно содержать цифры'
                           }
                       })}
                    //ref={nameRef}
                />
                {errors.email && <span className='form__input__err' id='name_field-err'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}
                {/*<span className='form__input__err' id='name_field-err'></span>*/}
            </label>
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                    //name='email'
                       type='email'
                       required
                    //value={userData.email}
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
                {errors.email && <span className='form__input__err' id='name_field-err'>{errors?.email?.message || 'Что-то пошло не так...'}</span>}
                {/*<span className='form__input__err' id='name_field-err'></span>*/}
            </label>
            <label className='form__field'>
                <span className='form__input__title'>Пароль</span>
                <input className='form__input'
                       name='password'
                       type='password'
                       required
                       value={userData.password}
                       onChange={handleChange}
                />
                <span className='form__input__err' id='name_field-err'>Что-то пошло не так...</span>
            </label>
        </Form>
    )
}

