import React from 'react'
import './ErrorToolTip.css'

export default function ErrorToolTip({errorToolTip}){

    return(
        <section className='error-tip'>
            <p className='error-tip__text'>{errorToolTip.text}</p>
        </section>
    )
}