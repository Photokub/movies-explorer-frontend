import React from "react";
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList'
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
                                        savedMovies,
                                        handleSaveMovie,
                                        filterStorageStatus,
                                        searchTermStorage,
                                        handleFilterCheckbox,
                                        handleSavedMoviesSearchChange,
                                        handleSearchSavedMoviesValue,
                                        isReqFailed,
                                        isAnyMatches,
                                        getSavedMovies,
                                        handleSavedMoviesFilterCheckbox,
                                        isLoading
                                    }) {
    return (
        <section className='saved-movies movies'>
            <SearchForm
                filterStorageStatus={filterStorageStatus}
                searchTermStorage={searchTermStorage}
                handleFilterCheckbox={handleFilterCheckbox}
                handleSavedMoviesSearchChange={handleSavedMoviesSearchChange}
                handleSearchSavedMoviesValue={handleSearchSavedMoviesValue}
                getSavedMovies={getSavedMovies}
                handleSavedMoviesFilterCheckbox={handleSavedMoviesFilterCheckbox}
            />
            {isLoading ?
                <Preloader/>
                :
                <SavedMoviesCardList
                    handleSaveMovie={handleSaveMovie}
                    savedMovies={savedMovies}
                    isReqFailed={isReqFailed}
                    isAnyMatches={isAnyMatches}
                />
            }
        </section>
    )
}