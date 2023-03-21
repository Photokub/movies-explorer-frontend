import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'

export default function Movies({handleSearchChange, handleSearchValue, searchTerm, moviesList, handleFilterCheckbox}) {
    return (
        <section className='movies'>
            <SearchForm
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchValue={handleSearchValue}
                handleFilterCheckbox = {handleFilterCheckbox}
            />
            <MoviesCardList
                moviesList={moviesList}
            />
            <MoreButton/>
        </section>
    )
}