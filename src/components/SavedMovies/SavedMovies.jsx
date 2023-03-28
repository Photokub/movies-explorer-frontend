import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({savedMovies, handleSaveMovie}) {
    return (
      <section className='saved-movies movies'>
          <SearchForm/>
          <SavedMoviesCardList
              handleSaveMovie={handleSaveMovie}
              savedMovies={savedMovies}
          />
      </section>
    )
}