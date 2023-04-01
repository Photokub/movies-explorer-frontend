import React from "react";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({
                                        savedMovies,
                                        handleSaveMovie,
                                        filterStorageStatus,
                                        searchTermStorage,
                                        handleFilterCheckbox,
                                        handleSearchChange,
                                        handleSearchSavedMoviesValue,
                                        isReqFailed,
                                        isAnyMatches
                                    }) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                filterStorageStatus={filterStorageStatus}
                searchTermStorage={searchTermStorage}
                handleFilterCheckbox={handleFilterCheckbox}
                handleSearchChange={handleSearchChange}
                handleSearchSavedMoviesValue={handleSearchSavedMoviesValue}
            />
            <SavedMoviesCardList
                handleSaveMovie={handleSaveMovie}
                savedMovies={savedMovies}
                isReqFailed={isReqFailed}
                isAnyMatches={isAnyMatches}
            />
        </section>
    )
}