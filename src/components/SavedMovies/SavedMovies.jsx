import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({savedMovies, handleSaveMovie, filterStorageStatus, searchTermStorage, handleFilterCheckbox}) {
    return (
      <section className='saved-movies movies'>
          <SearchForm
              filterStorageStatus={filterStorageStatus}
              searchTermStorage={searchTermStorage}
              handleFilterCheckbox={handleFilterCheckbox}
          />
          <SavedMoviesCardList
              handleSaveMovie={handleSaveMovie}
              savedMovies={savedMovies}
          />
      </section>
    )
}