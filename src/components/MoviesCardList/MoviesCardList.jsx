import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import {REQUEST_ERR} from '../../utils/constants'

export default function MoviesCardList({moviesList, existedCards, isAnyMatches, isReqFailed}) {
    return (
        <section className='movies-card-list'>

            {/*    if(!isAnyMatches){*/}
            {/*    moviesList.slice(0, existedCards).map((film) =>*/}
            {/*    <MoviesCard*/}
            {/*    key={film.id}*/}
            {/*    film={film}*/}
            {/*    />*/}
            {/*    )*/}
            {/*}else if(isReqFailed){*/}
            {/*    <p className='movies-card-list__err-message'>{REQUEST_ERR}</p>*/}
            {/*} else{*/}
            {/*    <p className= 'movies-card-list__message'>Ничего не найдено</p>*/}
            {/*}*/}


            {
                isReqFailed ? <p className='movies-card-list__err-message'>{REQUEST_ERR}</p> :
                    !isAnyMatches ? moviesList?.slice(0, existedCards)?.map((film) =>
                        <MoviesCard
                            key={film.id}
                            film={film}
                        />
                    ) : <p className='movies-card-list__message'>Ничего не найдено</p>
            }
        </section>
    )
}