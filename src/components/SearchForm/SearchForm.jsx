import React, {useRef, useState, useEffect} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {moviesApi} from '../../utils/MoviesApi'
import './SearchForm.css'

export default function SearchForm() {
    const searchFormBorder = useRef(null)
    const searchFormInput = useRef(null)
    const borderBlur = '1.5px solid rgba(100, 100, 100, .2)'
    const borderFocus = '1.5px solid rgba(100, 100, 100, .8)'
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [beatfilmsArr, setBeatfilmsArr] = useState([])

    // useEffect(() => {
    //         Promise.all([moviesApi.getMovies()])
    //             .then(([data]) => {
    //                 {
    //                     setBeatfilmsArr(data)
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(`Ошибка ${err}`)
    //             })
    //
    // }, []);

    //console.log(beatfilmsArr)

    const getbeatfilmMovies = () => {
        moviesApi.getMovies()
            .then(data => {
                setBeatfilmsArr(data)
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }


    const handleChange = event => {
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    };

    const handleSearchValue = (e) => {
        e.preventDefault()
        getbeatfilmMovies()
        console.log(beatfilmsArr)
         console.log(searchTerm)
        const results =  beatfilmsArr.forEach((film) => film.nameRU.includes(searchTerm))
        return results
        // setSearchTerm(e.target.value)
    }


    // useEffect(() => {
    //     getbeatfilmMovies()
    //     console.log(beatfilmsArr)
    //     const results =  beatfilmsArr.filter(film => film.includes(searchTerm))
    //     //     .filter(film =>
    //     //     film.toLowerCase().includes(searchTerm)
    //     // );
    //     setSearchResults(results);
    //     console.log(searchResults)
    // }, [searchTerm]);

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
            <form className='search-form' ref={searchFormBorder} style={formBorder} onSubmit={handleSearchValue}>
                <input
                    required
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм'
                    value={searchTerm}
                    ref={searchFormInput}
                    onChange={handleChange}
                    onFocus={() => handleFocus(searchFormInput.current)}
                    onBlur={handleBlur}/>
                <button className='search-form__button' type='submit' >Поиск</button>
                <FilterCheckbox/>
            </form>
            <hr className='search-form-container__border'></hr>
        </div>
    )
}