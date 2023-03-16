import React from "react";
import Form from "../Form/Form";

export default function LoginForm(){
    return(
        <Form
            name='register'
            method='post'
            btnText='Войти'
        >
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
                <span className='form__input__err' id='name_field-err'></span>
            </label>
        </Form>
    )
}

