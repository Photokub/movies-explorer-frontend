import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'

export default function Movies({onHandleSearchChange, onHandleSearchValue, searchTerm, moviesList}) {
    return (
        <section className='movies'>
            <SearchForm
                searchTerm={searchTerm}
                onHandleSearchChange={onHandleSearchChange}
                onHandleSearchValue={onHandleSearchValue}
            />
            <MoviesCardList
                moviesList={moviesList}
            />
            <MoreButton/>
        </section>
    )
}