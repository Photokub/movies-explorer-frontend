import {Route, Routes, useNavigate} from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import {Layout} from "../Layout/Layout";
import {LayoutProfile} from "../LayoutProfile/LayoutProfile";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import * as Auth from '../../utils/Auth';
import React, {useCallback, useEffect, useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState('')
    const [errorToolTip, setErrorToolTip] = useState({text: ''})
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [userData, setUserData] = useState({})
    const [isAnyMatches, setIsAnyMatches] = useState(false)
    const [isReqFailed, setReqFailed] = useState(false);
    const [windowResizing, setWindowResizing] = useState(false);
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isFilterActive, setFilterStatus] = useState(JSON.parse(localStorage.getItem('filterCheckbox')))
    const authStorageData = localStorage.getItem('loggedInStatus')
    const isLoggedInStorage = JSON.parse(authStorageData)
    const [loggedIn, setLoggedIn] = useState(isLoggedInStorage);
    const navigate = useNavigate();

////////////////////////аутентефикация////////////////////////

    const checkToken = useCallback(async () => {
        try {
            const user = await mainApi.getUserProfile()
            if (!user) {
                throw new Error('Invalid user')
            }
            localStorage.setItem('loggedInStatus', 'true')
            getBeatfilmMovies()
            setUserData(user)
            setCurrentUser(user)
            await getSavedMovies()
        } catch {
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken])

    const register = useCallback(async ({name, email, password}) => {
        try {
            setHasError(false)
            const res = await Auth.register({name, email, password});
            if (!res) {
                localStorage.setItem('loggedInStatus', 'false')
            }
            localStorage.setItem('loggedInStatus', 'true')
            setLoggedIn(true)
            setUserData({name, email})
            setCurrentUser({name, email})
            await getBeatfilmMovies()
            return res;
        } catch (err) {
            setHasError(true)
            setErrorToolTip({text: `${err}`})
        }
    }, []);

    const login = useCallback(async ({password, email}) => {
            try {
                const data = await Auth.login({password, email});
                if (!data) {
                    setLoggedIn(false)
                }
                console.log(data)
                localStorage.setItem('loggedInStatus', 'true')
                setLoggedIn(true)
                setUserData(data)
                setCurrentUser(data)
                await getSavedMovies()
            } catch (err) {
                setHasError(true)
                setErrorToolTip({text: `${err}`})
            }
        }, []
    )

    const updateUser = useCallback(async ({name, email}) => {
            try {
                const data = await mainApi.updateUserData({name, email});
                if (!data) {
                    setLoggedIn(false)
                }
                console.log(data)
                localStorage.setItem('loggedInStatus', 'true')
                setLoggedIn(true)
                setUserData(data)
                setCurrentUser(data)
            } catch {
            }
        }, []
    )

    const logOut = useCallback(() => {
        Auth.logOut()
            .then(() => {
                setLoggedIn(false)
                setUserData({});
                setCurrentUser({})
                setIsAnyMatches(false)
                localStorage.removeItem('searchTerm')
                localStorage.removeItem('moviesList')
                localStorage.removeItem('filterCheckbox')
                localStorage.removeItem('SavedMoviesList')
                localStorage.removeItem('loggedInStatus')
                navigate('/');
            })
    }, [])

////////////////////////получение фильмов с BeatFilms////////////////////////

    const getBeatfilmMovies = useCallback(() => {
        setIsLoading(true)
        moviesApi.getMovies()
            .then((data) => {
                setBeatfilmsArr(data);
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
            setReqFailed(true)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

////////////////////////поиск фильмов////////////////////////

    const searchTermStorage = JSON.parse(localStorage.getItem('searchTerm')) || [];

    const handleSearchChange = event => {
        let currentSearchTerm;
        currentSearchTerm = (event.target.value);
        setSearchTerm(event.target.value);
        console.log(searchTerm)
        localStorage.setItem('searchTerm', JSON.stringify(currentSearchTerm))
    };

    const filterStorageStatus = localStorage.getItem('filterCheckbox');

    const handleFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        localStorage.setItem('filterCheckbox', isChecked);
        isChecked === undefined ?
            setFilterStatus(JSON.parse(localStorage.getItem('filterCheckbox')))
            :
            setFilterStatus(isChecked);
        console.log(isFilterActive)
    }

    const handleStorageFilter = () => {
        const filterStorageStatusParsed = JSON.parse(localStorage.getItem('filterCheckbox'));
        (filterStorageStatusParsed !== undefined || null) && setFilterStatus(filterStorageStatusParsed)
        isFilterActive === undefined && setFilterStatus(filterStorageStatusParsed)
    }

    const handleSearchValue = (e) => {
        e.preventDefault()
        handleStorageFilter()
        const results =
            !isFilterActive ?
                beatfilmsArr.filter(
                    (film) =>
                        film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)
                )
                :
                beatfilmsArr.filter(
                    (film) =>
                        (film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)) && (film.duration <= 40)
                )
        localStorage.setItem('moviesList', JSON.stringify(results));
        setMoviesList(results)
        results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    }

    const movieListStorage = JSON.parse(localStorage.getItem('moviesList')) || [];

    const handleSearchSavedMoviesValue = (e) => {
        e.preventDefault()
        handleStorageFilter()
        const results =
            !isFilterActive ?
                savedMovies.filter(
                    (film) =>
                        film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)
                )
                :
                savedMovies.filter(
                    (film) =>
                        (film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)) && (film.duration <= 40)
                )
        localStorage.setItem('SavedMoviesList', JSON.stringify(results));
        setSavedMovies(results)
        results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    }

////////////////////////добавление и удалениекарточки и избранное////////////////////////

    console.log(beatfilmsArr)
    console.log(moviesList)

    const handleSaveMovie = (movieCard) => {
        console.log(movieCard)
        console.log(savedMovies)
        const id = movieCard.id
        const movieId = movieCard.movieId
        const isSaved = savedMovies.some((movie) => (movie.movieId === id || movieId) || (movie.id === id || movieId))
        const searchTerm = id
        const searchTermInSavedArray = movieId
        const movieInArray = savedMovies.find(movie => (movie.movieId === searchTerm) || (movie.movieId === searchTermInSavedArray))
        !isSaved ?
            mainApi
                .saveMovie(movieCard)
                .then((newMovie) =>
                    setSavedMovies([newMovie, ...savedMovies])
                ).catch((err) => {
                console.log(`Ошибка ${err}`)
            })
            :
            mainApi
                .deleteMovie(movieInArray._id)
                .then(() => {
                        setSavedMovies(movies => movies.filter((m) => m._id !== movieInArray._id))
                    }
                ).catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }

    const getSavedMovies = useCallback(async () => {
        try {
            mainApi
                .getMovies()
                .then((data) =>
                    setSavedMovies(data)
                )
        } catch {
        }
    }, [])

    console.log(savedMovies)

////////////////////////таймаут на ресайз экрана////////////////////////

    useEffect(() => {
        let timeout;
        const handleResize = () => {
            clearTimeout(timeout);

            setWindowResizing(true);

            timeout = setTimeout(() => {
                setWindowResizing(false);
            }, 500);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <Routes>
                    <Route element={
                        <Layout
                            userData={userData}
                            loggedIn={loggedIn}
                        />
                    }>
                        <Route path='/' element={
                            <Main/>
                        }/>
                        <Route path='/movies'
                               element={<ProtectedRouteElement loggedIn={loggedIn}/>}>
                            <Route path="/movies" element={
                                <Movies
                                    handleSearchValue={handleSearchValue}
                                    handleSearchChange={handleSearchChange}
                                    moviesList={moviesList}
                                    handleFilterCheckbox={handleFilterCheckbox}
                                    isAnyMatches={isAnyMatches}
                                    isReqFailed={isReqFailed}
                                    windowResizing={windowResizing}
                                    handleSaveMovie={handleSaveMovie}
                                    savedMovies={savedMovies}
                                    filterStorageStatus={filterStorageStatus}
                                    searchTermStorage={searchTermStorage}
                                    movieListStorage={movieListStorage}
                                    isLoading={isLoading}
                                />
                            }/>
                        </Route>
                        <Route path='/saved-movies'
                               element={<ProtectedRouteElement loggedIn={loggedIn}/>}>
                            <Route path="/saved-movies" element={
                                <SavedMovies
                                    handleSaveMovie={handleSaveMovie}
                                    savedMovies={savedMovies}
                                    filterStorageStatus={filterStorageStatus}
                                    searchTermStorage={searchTermStorage}
                                    handleFilterCheckbox={handleFilterCheckbox}
                                    handleSearchChange={handleSearchChange}
                                    handleSearchSavedMoviesValue={handleSearchSavedMoviesValue}
                                    isReqFailed={isReqFailed}
                                    isAnyMatches={isAnyMatches}
                                />
                            }
                            />
                        </Route>
                    </Route>
                    <Route element={
                        <LayoutProfile
                            loggedIn={loggedIn}
                        />
                    }>
                        <Route path='/profile'
                               element={<ProtectedRouteElement loggedIn={loggedIn}/>}>
                            <Route path="/profile" element={
                                <Profile
                                    logOut={logOut}
                                    userData={userData}
                                    setUserData={setUserData}
                                    updateUser={updateUser}
                                />
                            }
                            />
                        </Route>
                    </Route>
                    <Route path="/signin" element={
                        <Login
                            login={login}
                            loggedIn={loggedIn}
                            userData={userData}
                            setUserData={setUserData}
                            errorToolTip={errorToolTip}
                            hasError={hasError}
                            setHasError={setHasError}
                        />
                    }/>
                    <Route path="/signup" element={
                        <Register
                            onRegister={register}
                            loggedIn={loggedIn}
                            userData={userData}
                            setUserData={setUserData}
                            errorToolTip={errorToolTip}
                            hasError={hasError}
                            setHasError={setHasError}
                        />
                    }/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
