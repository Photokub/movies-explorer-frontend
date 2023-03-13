import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'

export default function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            {/*{props.cards.map((card) => <MoviesCard/>)}*/}
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
        </section>
    )
}