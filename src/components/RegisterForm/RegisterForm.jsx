import React from "react";
import Form from "../Form/Form";

export default function RegisterForm({ register, loggedIn, userData, setUserData }){

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
                       type='text'
                       name='name'
                       //defaultValue=""
                       required
                       value={userData.name}
                       onChange={handleChange}
                       //ref={nameRef}
                />
                <span className='form__input__err' id='name_field-err'></span>
            </label>
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                       name='email'
                       type='email'
                       required
                       value={userData.email}
                       onChange={handleChange}
                />
                <span className='form__input__err' id='name_field-err'></span>
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

