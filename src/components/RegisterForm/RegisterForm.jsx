import Form from "../Form/Form";
import React from "react";

export default function RegisterForm(){
    return(
        <Form
            name='register'
            title='Добро пожаловать!'
            method='post'
            btnText='Зарегистрироваться'
        >
            <label className='form__field'>
                <span className='form__input__title'>Имя</span>
                <input className='form__input'
                       name='name_field'
                       defaultValue=""
                       required
                />
                <span className='form__input__err' id='name_field-err'></span>
            </label>
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                       name='email_field'
                       defaultValue=""
                       required
                />
                <span className='form__input__err' id='name_field-err'></span>
            </label>
            <label className='form__field'>
                <span className='form__input__title'>Пароль</span>
                <input className='form__input'
                       name='email_field'
                       type='password'
                       defaultValue=""
                       required
                />
                <span className='form__input__err' id='name_field-err'>Что-то пошло не так...</span>
            </label>
        </Form>
    )
}

