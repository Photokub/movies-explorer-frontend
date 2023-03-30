import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import {REQUEST_ERR} from '../../utils/constants'

export default function MoviesCardList({moviesList, existedCards, isAnyMatches, isReqFailed, handleSaveMovie, savedMovies, movieListStorage}) {

    return (
        <section className='movies-card-list'>
            {
                isReqFailed
                    ?
                    <p className='movies-card-list__err-message'>{REQUEST_ERR}</p>
                    :
                    !isAnyMatches ? movieListStorage?.slice(0, existedCards)?.map((film) =>
                     <MoviesCard
                            key={film.id}
                            film={film}
                            handleSaveMovie={handleSaveMovie}
                            savedMovies={savedMovies}
                        />
                    ) : <p className='movies-card-list__message'>Ничего не найдено</p>
            }
        </section>
    )
}