import React from "react";
import './SaveCheckbox.css'
import {useLocation} from "react-router-dom";

export default function SaveCheckbox() {
    const location = useLocation()

    return(
        <label className='save-checkbox'>
            <input className='save-checkbox__switcher' type='checkbox'/>
            <span className={ location.pathname !=='/saved-movies' ?  'save-checkbox__point' : 'save-checkbox__delete-point' } />
        </label>
    )
}