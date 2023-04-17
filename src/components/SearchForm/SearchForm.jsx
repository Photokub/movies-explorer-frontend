import React, {useEffect, useRef, useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'
import {useLocation} from "react-router-dom";

export default function SearchForm({
                                       handleSearchChange,
                                       handleSearchValue,
                                       handleFilterCheckbox,
                                       handlePreloader,
                                       filterStorageStatus,
                                       searchTermStorage,
                                       handleSearchSavedMoviesValue,
                                       handleSavedMoviesSearchChange,
                                       getSavedMovies,
                                       handleSavedMoviesFilterCheckbox
                                   }) {

    const location = useLocation()
    const moviesOnLocation = location.pathname === '/movies'

    const submitState = moviesOnLocation ? handleSearchValue : handleSearchSavedMoviesValue

    ////////////border style//////////////
    const searchFormBorder = useRef(null)
    const searchFormInput = useRef(null)
    const borderBlur = '1.5px solid rgba(100, 100, 100, .2)'
    const borderFocus = '1.5px solid rgba(100, 100, 100, .8)'

    const borderStyle = {border: borderBlur}
    const [formBorder, setFormBorder] = useState(borderStyle)

    const handleFocus = (searchFormInput) => {
        (document.activeElement === searchFormInput) && setFormBorder({border: borderFocus});
    };

    const handleBlur = (searchFormInput) => {
        searchFormInput && setFormBorder({border: borderBlur});
    };

    useEffect(()=>{
        searchFormInput.value === undefined && getSavedMovies()
    },[])

    return (
        <div className='search-form-container'>
            <form className='search-form' ref={searchFormBorder} style={formBorder} onSubmit={submitState}
                  onLoad={handlePreloader}>
                <input
                    required
                    name='search_field'
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм'
                    ref={searchFormInput}
                    value={moviesOnLocation ? searchTermStorage : undefined}
                    onChange={moviesOnLocation ? handleSearchChange : handleSavedMoviesSearchChange}
                    onFocus={() => handleFocus(searchFormInput.current)}
                    onBlur={handleBlur}/>
                <button className='search-form__button' type='submit'>Поиск</button>
                <FilterCheckbox
                    handleFilterCheckbox={handleFilterCheckbox}
                    filterStorageStatus={filterStorageStatus}
                    handleSavedMoviesFilterCheckbox={handleSavedMoviesFilterCheckbox}
                />
            </form>
            <hr className='search-form-container__border'></hr>
        </div>
    )
}