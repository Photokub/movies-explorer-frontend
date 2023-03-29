import React from 'react'
import './ErrorToolTip.css'

export default function ErrorToolTip({errorToolTip, errorStatus}){

    const errorClassName = errorStatus ? 'error-tip_enabled' : 'error-tip_disabled'
    const errText ='Что-то пошло не так:'

    return(
        <section className={errorClassName}>
            <p className='error-tip__text'>{errText}<br/>{errorToolTip.text}</p>
        </section>
    )
}