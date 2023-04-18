import React from 'react'
import './InfoToolTip.css'

export function InfoToolTip({isInfoTooltipPopupOpen}) {

    const infoClassName = isInfoTooltipPopupOpen ? 'info-tip_enabled' : 'info-tip_disabled'
    const infoText = 'Данные пользователя были успешно изменены'

    return (
        <section className={infoClassName}>
            <p className='info-tip__text'>{infoText}</p>
        </section>
    )
}