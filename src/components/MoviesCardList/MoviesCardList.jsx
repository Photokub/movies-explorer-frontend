import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'

export default function MoviesCardList({moviesList}) {
    return (
        <section className='movies-card-list'>
                {moviesList.map((film) =>
                    <MoviesCard
                        key={film.id}
                        film={film}
                    />
                )}
        </section>
    )
}