import React from 'react'
import './ErrorToolTip.css'
import {ERR_TEXT} from "../../utils/constants";

export default function ErrorToolTip({
                                         errorToolTip,
                                         hasError
}) {

    const errorClassName = hasError ? 'error-tip_enabled' : 'error-tip_disabled'
    return (
        <section className={errorClassName}>
            <p className='error-tip__text'>{ERR_TEXT}<br/>{errorToolTip.text}</p>
        </section>
    )
}