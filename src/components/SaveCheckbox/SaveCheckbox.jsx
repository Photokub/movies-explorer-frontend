import React from "react";
import './SaveCheckbox.css'

export default function SaveCheckbox() {
    return(
        <label className='save-checkbox'>
            <input className='save-checkbox__switcher' type='checkbox'/>
            <span className='save-checkbox__point' />
        </label>
    )
}