import React from "react";
import './SaveCheckbox.css'
import {useLocation} from "react-router-dom";

export default function SaveCheckbox({film, handleSaveMovie, handleSaveCheckbox, checkboxStatus}) {
    const location = useLocation()

    const handleSaveClick = () => {
        handleSaveMovie(film)
    };

    return(
        <label className='save-checkbox'>
            <input className='save-checkbox__switcher' type='checkbox' defaultChecked={checkboxStatus} onChange={handleSaveClick}/>
            <span className={ location.pathname !=='/saved-movies' ?  'save-checkbox__point' : 'save-checkbox__delete-point' } />
        </label>
    )
}