import React, {useState, useMemo} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import './Movies.css'
import Preloader from "../Preloader/Preloader";

export default function Movies({handleSearchChange, handleSearchValue, searchTerm, moviesList, handleFilterCheckbox}) {
    const [isPreloaderActive, setIsPreloaderActive] = useState(false);
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
        setIsPreloaderActive(true);
    }

    return (
        <section className='movies'>
            <SearchForm
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleSearchValue={handleSearchValue}
                handleFilterCheckbox={handleFilterCheckbox}
                handlePreloader={handlePreloader}
            />
            <MoviesCardList
                existedCards={existedCards}
                moviesList={moviesList}
            />
            <Preloader isActive={isPreloaderActive}/>
            <MoreButton
                existedCards={existedCards}
                moviesList={moviesList}
                handleShowMore={handleShowMore}
            />
        </section>
    )
}