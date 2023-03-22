import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'

export default function MoviesCardList({moviesList,existedCards}) {
    return (
        //TODO <section className='movies-card-list'>
        //         {moviesList.map((film) =>
        //             <MoviesCard
        //                 key={film.id}
        //                 film={film}
        //             />
        //         )}
        // </section>
    <section className='movies-card-list'>
        {moviesList?.slice(0, existedCards)?.map((film) =>
            <MoviesCard
                key={film.id}
                film={film}
            />
        )}
    </section>
    )
}