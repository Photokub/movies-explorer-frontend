import React from "react";
import './Form.css'
import {Navigate} from "react-router-dom";
import ErrorToolTip from "../ErrorToolTip/ErrorToolTip";

export default function Form({name, method, btnText, children, loggedIn, handleSubmit, isValid, errorToolTip}){

    if (loggedIn) {
        return <Navigate to="/movies"/>;
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
            <ErrorToolTip
                errorToolTip={errorToolTip}
            />
            <button className={!isValid ? 'form__submit-btn_disabled' : 'form__submit-btn_enabled'} type='submit' disabled={!isValid}>{btnText}</button>
        </form>
    )
}