import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import './Movies.css'

export default function Movies() {
    return (
        <section className='movies'>
            <SearchForm/>
            <Preloader/>
            <MoviesCardList/>
            <MoviesCard/>
        </section>
    )
}