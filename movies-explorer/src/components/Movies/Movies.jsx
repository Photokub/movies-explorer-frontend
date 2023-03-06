import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies() {
    return (
        <>
            <SearchForm/>
            <Preloader/>
            <MoviesCardList/>
            <MoviesCard/>
        </>
    )
}