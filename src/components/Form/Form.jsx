import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import {Navigate} from "react-router-dom";

export default function Form({name, method, btnText, children, loggedIn, handleSubmit}){



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
            <button className='form__submit-btn form__submit-btn_disabled' type='submit' >{btnText}</button>
        </form>
    )
}