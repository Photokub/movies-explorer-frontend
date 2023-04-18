import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './SavedMoviesCardList.css'
import {REQUEST_ERR} from '../../utils/constants'


export default function SavedMoviesCardList({existedCards, isAnyMatches, isReqSavedMoviesFailed, handleSaveMovie, savedMovies }) {

    return (
        <section className='saved-movies-card-list'>
            {
                isReqSavedMoviesFailed
                    ?
                    <p className='saved-movies-card-list__err-message'>{REQUEST_ERR}</p>
                    :
                    !isAnyMatches ? savedMovies?.slice(0, existedCards)?.map((film) =>
                     <MoviesCard
                            key={film.movieId}
                            film={film}
                            handleSaveMovie={handleSaveMovie}
                            savedMovies={savedMovies}
                        />
                    ) : <p className='saved-movies-card-list__message'>Ничего не найдено</p>
            }
        </section>
    )
}