import React, {useState} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'
import Preloader from "../Preloader/Preloader";

export default function Movies({handleSearchChange, handleSearchValue, searchTerm, moviesList, handleFilterCheckbox}) {
    const [isPreloaderActive, setIsPreloaderActive] = useState(false);

    const handlePreloader = (evt) => {
        evt.preventDefault();
        setIsPreloaderActive(true);
    }

    return (
        <section className='movies'>
            <SearchForm
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchValue={handleSearchValue}
                handleFilterCheckbox = {handleFilterCheckbox}
                handlePreloader = {handlePreloader}
            />
            <MoviesCardList
                moviesList={moviesList}
            />
            <Preloader isActive={isPreloaderActive}/>
            <MoreButton/>
        </section>
    )
}