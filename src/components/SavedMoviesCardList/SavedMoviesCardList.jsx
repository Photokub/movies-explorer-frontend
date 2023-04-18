import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './SavedMoviesCardList.css'
import {REQUEST_ERR, NO_RESULTS} from '../../utils/constants'


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
                    ) : <p className='saved-movies-card-list__message'>{NO_RESULTS}</p>
            }
        </section>
    )
}