import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";
import {Layout} from "../Layout/Layout";
import {LayoutProfile} from "../LayoutProfile/LayoutProfile";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import * as Auth from '../../utils/Auth';
import React, {useCallback, useEffect, useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [isAnyMatches, setIsAnyMatches] = useState(false)
    const [isReqFailed, setReqFailed] = useState(false);
    const location = useLocation()
    const [windowResizing, setWindowResizing] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSubmitBtnActive, setIsSubmitBtnActive] = useState(false)
    const [userData, setUserData] = useState({
        name: "", email: "", password: ""
    })
    console.log(userData)

    // const authenticate = useCallback((data) => {
    //     setLoggedIn(true)
    //     //setCurrentUser(data)
    // }, [setLoggedIn]);

    const register =  useCallback(async ({name, email, password}) => {
            console.log(userData)
        try {
            const res = await Auth.register({name , email, password});
            setLoggedIn(true)
            setUserData({name, email, password})
            return res;
        } catch {
            setIsSubmitBtnActive(false)
        }
    }, []);

    //////////////////добавление и удалениекарточки и избранное///////////////////

    const handleSaveMovie = (movieCard) => {
        const id = movieCard.id
        const isSaved = savedMovies.some((movies) => movies.id === id)
        !isSaved ?
            mainApi
                .saveMovie(movieCard)
                .then((newMovie) =>
                        setSavedMovies([newMovie, ...savedMovies]),
                ).catch((err) => {
                console.log(`Ошибка ${err}`)
            })
            :
            mainApi
                .deleteMovie(id)
                .then(
                    setSavedMovies(movies => movies.filter((m) => m.id !== movieCard.id)),
                ).catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }


    //todo function handleSaveMovie(e) {
    //     const movieCard = e.currentTarget
    //     const id = movieCard.id
    //     const isSaved = savedMovies.some((movies) => movies.id === id)
    //     !isSaved ?
    //         setSavedMovies( [movieCard, ...savedMovies])
    //         :
    //         setSavedMovies(movies => movies.filter((m) => m.id !== movieCard.id))
    //
    //     console.log(savedMovies)
    // }



/////////////////////таймаут на ресайз экрана/////////////////////////

    useEffect(() => {
        let timeout;
        const handleResize = () => {
            clearTimeout(timeout);

            setWindowResizing(true);

            timeout = setTimeout(() => {
                setWindowResizing(false);
            }, 1000);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //////////////////получение фильмов с BeatFilms//////////////////////////////

    useEffect(() => {
        Promise.all([moviesApi.getMovies()])
            .then(([data]) => {
                setBeatfilmsArr(data)
                console.log(beatfilmsArr)
                setReqFailed(false)
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
                setReqFailed(true)
            })
    }, []);

    ///////////поиск фильмов ///////////////////

    //TODO const getBeatfilmMovies = () => {
    //     moviesApi.getMovies()
    //         .then(data => {
    //             setBeatfilmsArr(data)
    //         }).catch((err) => {
    //         console.log(`Ошибка ${err}`)
    //     })
    // }

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
        console.log(searchTerm)
        localStorage.setItem('searchTerm', JSON.stringify(searchTerm))
    };

    const handleSearchValue = (e) => {
        e.preventDefault()
        console.log(beatfilmsArr)
        const results = beatfilmsArr.filter((film) => film.nameRU.toLowerCase().includes(searchTerm) || film.nameEN.toLowerCase().includes(searchTerm))
        setMoviesList(results)
        console.log(moviesList)
        localStorage.setItem('moviesList', JSON.stringify(moviesList));
        results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    }

    const handleFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        localStorage.setItem('filterCheckbox', JSON.stringify(isChecked));
    }

    return (
        <div className="App">
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<Main/>}/>
                    <Route path="/movies" element={
                        <Movies
                            searchTerm={searchTerm}
                            handleSearchValue={handleSearchValue}
                            handleSearchChange={handleSearchChange}
                            moviesList={moviesList}
                            handleFilterCheckbox={handleFilterCheckbox}
                            isAnyMatches={isAnyMatches}
                            isReqFailed={isReqFailed}
                            windowResizing={windowResizing}
                            handleSaveMovie={handleSaveMovie}
                        />
                    }/>
                    <Route path="/saved-movies" element={<SavedMovies/>}/>
                </Route>
                <Route element={<LayoutProfile/>}>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={
                    <Register
                        onRegister={register}
                        loggedIn={loggedIn}
                        userData={userData}
                        setUserData={setUserData}
                    />
                }/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
