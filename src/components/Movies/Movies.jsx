import React, {useState, useMemo} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'
import Preloader from "../Preloader/Preloader";

export default function Movies({
                                   handleSearchChange,
                                   handleSearchValue,
                                   searchTerm,
                                   moviesList,
                                   handleFilterCheckbox,
                                   isAnyMatches,
                                   isReqFailed,
                                   windowResizing,
                                   handleSaveMovie,
                                   savedMovies,
                                   filterStorageStatus,
                                   searchTermStorage,
                                   getSearchValue,
                                   movieListStorage,
                                   isLoading
                               }) {
    const windowInnerWidth = window.innerWidth;
    const windowWidth = useMemo(() => windowInnerWidth, [windowInnerWidth]);

    const cardsQt = useMemo(() => {
        if (windowWidth > 984) {
            return {
                existed: 12,
                expected: 3
            }
        }

        if (windowWidth > 568 && windowWidth <= 984) {
            return {
                existed: 8,
                expected: 2
            }
        }

        if (windowWidth < 568) {
            return {
                existed: 5,
                expected: 1
            }
        }
    }, [windowWidth])

    const [existedCards, setExistedCards] = useState(cardsQt.existed)

    const handleShowMore = () => {
        setExistedCards(existedCards + cardsQt.expected)
    }

    ///////////////////////preloader///////////////

    const handlePreloader = (evt) => {
        evt.preventDefault();
    }

    return (
        <section className='movies'>
            <SearchForm
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchValue={handleSearchValue}
                handleFilterCheckbox={handleFilterCheckbox}
                handlePreloader={handlePreloader}
                filterStorageStatus={filterStorageStatus}
                searchTermStorage={searchTermStorage}
                getSearchValue={getSearchValue}
            />
            {isLoading ?
                <Preloader/>
                :
                !windowResizing && <MoviesCardList
                    existedCards={existedCards}
                    moviesList={moviesList}
                    isAnyMatches={isAnyMatches}
                    isReqFailed={isReqFailed}
                    handleSaveMovie={handleSaveMovie}
                    savedMovies={savedMovies}
                    movieListStorage={movieListStorage}
                />
            }


            <MoreButton
                existedCards={existedCards}
                moviesList={moviesList}
                handleShowMore={handleShowMore}
            />
        </section>
    )
}