import React from "react";
import { useForm } from "react-hook-form";
import './Form.css'
import {Navigate} from "react-router-dom";

export default function Form({name, method, btnText, children, onRegister, userData, loggedIn, handleSubmit}){

   // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // const onSubmit = (e) => {
    //     let {name, email, password} = userData;
    //     e.preventDefault();
    //     onRegister({name, email, password})
    // }

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