import React from "react";
import './Form.css'

export default function Form({name, title, method, btnText, children}){
    return(
        <form className='form' name={`${name}`} method={`${method}`} noValidate={false}>
            <div className='form__container'>
            {children}
            </div>
            <button className='form__submit-btn' type='submit'>{btnText}</button>
        </form>
    )
}