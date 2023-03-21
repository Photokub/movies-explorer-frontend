import React from "react";
import './FilterCheckbox.css'

export default function FilterCheckbox({handleFilterCheckbox}) {
    return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox' onChange={handleFilterCheckbox}/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}