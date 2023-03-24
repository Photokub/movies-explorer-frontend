import React from "react";
import './Form.css'
import {Navigate} from "react-router-dom";

export default function Form({name, method, btnText, children, loggedIn, handleSubmit, isValid}){

    if (loggedIn) {
        return <Navigate to="/"/>;
    }

    return(
        <form
            className='form'
            name={`${name}`}
            method={`${method}`}
            noValidate={true}
            onSubmit={handleSubmit}
        >
            <div className='form__container'>
            {children}
            </div>
            <button className={!isValid ? 'form__submit-btn_disabled' : 'form__submit-btn_enabled'} type='submit' disabled={true}>{btnText}</button>
        </form>
    )
}