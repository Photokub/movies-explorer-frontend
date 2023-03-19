import React, { useRef, useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css'

export default function SearchForm() {
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


    return (
        <div className='search-form-container'>
            <form className='search-form' ref={searchFormBorder} style={formBorder}>
                <input
                    className='search-form__input'
                    type='text' placeholder='Фильм'
                    ref={searchFormInput}
                    onFocus={() => handleFocus(searchFormInput.current)}
                    onBlur={handleBlur}/>
                <button className='search-form__button' type='submit'>Поиск</button>
                <FilterCheckbox/>
            </form>
            <hr className='search-form-container__border'></hr>
        </div>
    )
}