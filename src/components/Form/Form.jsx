import React, {useEffect} from "react";
import './Form.css'
import {Navigate , useNavigate} from "react-router-dom";
import ErrorToolTip from "../ErrorToolTip/ErrorToolTip";

export default function Form({name, method, btnText, children, loggedIn, handleSubmit, isValid, errorToolTip, errorStatus}){

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
                errorStatus={errorStatus}
            />
            <button className={!isValid ? 'form__submit-btn_disabled' : 'form__submit-btn_enabled'} type='submit' disabled={!isValid}>{btnText}</button>
        </form>
    )
}