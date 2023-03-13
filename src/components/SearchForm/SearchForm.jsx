import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'

export default function SearchForm() {
    return (
        <div className='search-form-container'>
            <form className='search-form'>
                <input className='search-form__input' type='text' placeholder='Фильм'/>
                <button className='search-form__button' type='submit'>Поиск</button>
                <FilterCheckbox/>
            </form>
            <hr className='search-form-container__border'></hr>
        </div>
    )
}