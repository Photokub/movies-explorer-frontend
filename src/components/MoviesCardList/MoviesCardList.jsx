import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'

export default function MoviesCardList({moviesList, existedCards,isAnyMatches}) {
    return (
        <section className='movies-card-list'>
            {
                !isAnyMatches ? moviesList?.slice(0, existedCards)?.map((film) =>
                    <MoviesCard
                        key={film.id}
                        film={film}
                    />
                ) : <p className= 'movies-card-list__message'>Ничего не найдено</p>
            }
        </section>
    )
}