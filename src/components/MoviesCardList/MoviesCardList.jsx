import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import {REQUEST_ERR} from '../../utils/constants'
import {useLocation} from "react-router-dom";

export default function MoviesCardList({moviesList, existedCards, isAnyMatches, isReqFailed, handleSaveMovie, savedMovies}) {
    return (
        <section className='movies-card-list'>
            {
                isReqFailed ? <p className='movies-card-list__err-message'>{REQUEST_ERR}</p> :
                    !isAnyMatches ? moviesList?.slice(0, existedCards)?.map((film) =>
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