import React from "react";
import Form from "../Form/Form";
import logo from '../../images/logo.svg'
import {Link} from "react-router-dom";
import './Register.css'

export default function Register() {
    return (
        <div className='register__warp'>
            <section className='register'>
                <img className='register__logo' src={logo} alt='логотип'/>
                <p className='register__title'>Добро пожаловать!</p>
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
                <p className='register__subtitle'>Уже зарегистрированы? <Link className='register__sublink' to='/signin'>Войти</Link></p>
            </section>
        </div>
    )
}