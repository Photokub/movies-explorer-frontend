import React, {useState, useMemo} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'
import Preloader from "../Preloader/Preloader";
import {
    LARGE_SCREEN_EXISTED,
    LARGE_SCREEN_EXPECTED,
    LARGE_SCREEN_WIDTH, MEDIUM_SCREEN_EXISTED, MEDIUM_SCREEN_EXPECTED,
    MEDIUM_SCREEN_WIDTH, SMALL_SCREEN_EXISTED, SMALL_SCREEN_EXPECTED
} from "../../utils/constants";

export default function Movies({
                                   handleSearchChange,
                                   handleSearchValue,
                                   moviesList,
                                   handleFilterCheckbox,
                                   isAnyMatches,
                                   isReqFailed,
                                   windowResizing,
                                   handleSaveMovie,
                                   savedMovies,
                                   filterStorageStatus,
                                   searchTermStorage,
                                   movieListStorage,
                                   isLoading,
                                   getSavedMovies
                               }) {
    const windowInnerWidth = window.innerWidth;
    const windowWidth = useMemo(() => windowInnerWidth, [windowInnerWidth]);

    const cardsQt = useMemo(() => {
        if (windowWidth > LARGE_SCREEN_WIDTH) {
            return {
                existed: LARGE_SCREEN_EXISTED,
                expected: LARGE_SCREEN_EXPECTED
            }
        }

        if (windowWidth > MEDIUM_SCREEN_WIDTH && windowWidth <= LARGE_SCREEN_WIDTH) {
            return {
                existed: MEDIUM_SCREEN_EXISTED,
                expected: MEDIUM_SCREEN_EXPECTED
            }
        }

        if (windowWidth < MEDIUM_SCREEN_WIDTH) {
            return {
                existed: SMALL_SCREEN_EXISTED,
                expected: SMALL_SCREEN_EXPECTED
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
                handleSearchChange={handleSearchChange}
                handleSearchValue={handleSearchValue}
                handleFilterCheckbox={handleFilterCheckbox}
                handlePreloader={handlePreloader}
                filterStorageStatus={filterStorageStatus}
                searchTermStorage={searchTermStorage}
                getSavedMovies={getSavedMovies}
            />
            {isLoading ?
                <Preloader/>
                :
                !windowResizing && <MoviesCardList
                    existedCards={existedCards}
                    isAnyMatches={isAnyMatches}
                    isReqFailed={isReqFailed}
                    handleSaveMovie={handleSaveMovie}
                    savedMovies={savedMovies}
                    movieListStorage={movieListStorage}
                />
            }
            {!isLoading &&
                <MoreButton
                    existedCards={existedCards}
                    moviesList={moviesList}
                    handleShowMore={handleShowMore}
                />
            }
        </section>
    )
}