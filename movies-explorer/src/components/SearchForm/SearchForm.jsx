import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'

export default function SearchForm() {
    return (
        <div className='search-form-container'>
            <form className='search-form'>
                <input className='search-form__input'/>
                <button className='search-form__button'>Поиск</button>
            </form>
            <FilterCheckbox/>
        </div>
    )
}