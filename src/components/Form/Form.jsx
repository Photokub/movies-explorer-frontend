import React from "react";
import './Form.css'

export default function Form({name, title, method, btnText, children}){
    return(
        <form className='form' name={`${name}`} method={`${method}`} title={`${title}`} noValidate={false}>
            {children}
            <button className='form__submit-btn' type='submit'>{btnText}</button>
        </form>
    )
}