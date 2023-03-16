import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
    return (
      <section className='saved-movies movies'>
          <SearchForm/>
          <MoviesCardList/>
      </section>
    )
}