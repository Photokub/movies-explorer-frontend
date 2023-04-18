import React from 'react'
import './InfoToolTip.css'
import {REQUEST_ERR, SUCCESS_PROFILE_MESSAGE} from "../../utils/constants";

export function InfoToolTip({isInfoTooltipPopupOpen, isReqChangingUserData}) {

    const infoClassName = isInfoTooltipPopupOpen || isReqChangingUserData ? 'info-tip_enabled' : 'info-tip_disabled'
    const infoTipTextClassName = isReqChangingUserData ? 'info-tip__err-text' : 'info-tip__text'
    const infoText = !isReqChangingUserData ? SUCCESS_PROFILE_MESSAGE : REQUEST_ERR

    return (
        <section className={infoClassName}>
            <p className={infoTipTextClassName}>{infoText}</p>
        </section>
    )
}