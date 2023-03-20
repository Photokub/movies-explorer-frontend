import React from "react";
import './FilterCheckbox.css'

export default function FilterCheckbox() {
    return (
        <label className='filter'>
            <input className='filter__switcher' type='checkbox'/>
            <span className='filter__switcher__point'></span>
            <p className="filter__title">Короткометражки</p>
        </label>
    )
}