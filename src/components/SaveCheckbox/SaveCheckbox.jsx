import React from "react";
import './SaveCheckbox.css'
import {useLocation} from "react-router-dom";

export default function SaveCheckbox({handleSaveMovie}) {
    const location = useLocation()

    return(
        <label className='save-checkbox'>
            <input className='save-checkbox__switcher' type='checkbox' onChange={handleSaveMovie}/>
            <span className={ location.pathname !=='/saved-movies' ?  'save-checkbox__point' : 'save-checkbox__delete-point' } />
        </label>
    )
}