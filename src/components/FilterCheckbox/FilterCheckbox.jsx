import React from "react";
import './FilterCheckbox.css'

export default function FilterCheckbox() {
    return (
        <label className='filter'>
        <input className='filter__item' type='checkbox'/>
        <p className="filter__title">Короткометражки</p>
        </label>
    )
}