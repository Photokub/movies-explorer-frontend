import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function SavedMovies() {
    return (
      <>
          <p>Saved Movies</p>
          <MoviesCardList/>
          <MoviesCard/>
      </>
    )
}