import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import Form from "../Form/Form";

export default function RegisterForm({ register, loggedIn }){

    const [userData, setUserData] = useState({
        name:'',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    return(
        <Form
            name='register_form'
            method='post'
            btnText='Зарегистрироваться'
            register={register}
            loggedIn={loggedIn}
            userData={userData}
        >
            <label className='form__field'>
                <span className='form__input__title'>Имя</span>
                <input className='form__input'
                       name='name'
                       defaultValue=""
                       required
                       onChange={handleChange}
                />
                <span className='form__input__err' id='name_field-err'></span>
            </label>
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                       name='email'
                       type='email'
                       defaultValue=""
                       required
                       onChange={handleChange}
                />
                <span className='form__input__err' id='name_field-err'></span>
            </label>
            <label className='form__field'>
                <span className='form__input__title'>Пароль</span>
                <input className='form__input'
                       name='password'
                       type='password'
                       defaultValue=""
                       required
                       onChange={handleChange}
                />
                <span className='form__input__err' id='name_field-err'>Что-то пошло не так...</span>
            </label>
        </Form>
    )
}

