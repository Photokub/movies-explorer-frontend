import React, {useState} from "react";
import './Form.css'
import {Navigate} from "react-router-dom";

export default function Form({name, method, btnText, children, register, loggedIn, userData}){

    const handleSubmit = (e) => {
        let {name, email, password} = {userData};
        e.preventDefault();
        register({name, email, password})
    }

    if (loggedIn) {
        return <Navigate to="/"/>;
    }

    return(
        <form
            className='form'
            name={`${name}`}
            method={`${method}`}
            noValidate={false}
            onSubmit={handleSubmit}
        >
            <div className='form__container'>
            {children}
            </div>
            <button className='form__submit-btn' type='submit'>{btnText}</button>
        </form>
    )
}