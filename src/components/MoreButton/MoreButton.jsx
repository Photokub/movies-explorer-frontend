import React from "react";
import './MoreButton.css'

export default function MoreButton({handleShowMore, existedCards, moviesList}) {
    return (
        <section className ={`more-btn ${moviesList.length > existedCards ? 'more-btn_active' : '' }`}>
            <button className='more-btn__button' type="button" onClick={handleShowMore}>Ещё</button>
        </section>
    )
}