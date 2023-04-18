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
    const [searchSavedMoviesTerm, setSearchSavedMoviesTerm] = useState('')
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
    const [isSavedMoviesFilterActive, setSavedMoviesFilterStatus] = useState(false)
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false)
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
                localStorage.setItem('loggedInStatus', 'true')
                setLoggedIn(true)
                setUserData(data)
                setCurrentUser(data)
                setIsInfoToolTipPopupOpen(true)
            } catch {
            }
        }, []
    )

    useEffect(() => {
        const timeout = setTimeout(() => setIsInfoToolTipPopupOpen(false), 7000);
        return () => clearTimeout(timeout);
    });

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
        localStorage.setItem('searchTerm', JSON.stringify(currentSearchTerm))
    };

    const handleSavedMoviesSearchChange = event => {
        setSearchSavedMoviesTerm(event.target.value);
    };

    const filterStorageStatus = localStorage.getItem('filterCheckbox');

    const handleFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        localStorage.setItem('filterCheckbox', isChecked);
        isChecked === undefined ?
            setFilterStatus(JSON.parse(localStorage.getItem('filterCheckbox')))
            :
            setFilterStatus(isChecked);
    }

    const handleStorageFilter = () => {
        const filterStorageStatusParsed = JSON.parse(localStorage.getItem('filterCheckbox'));
        (filterStorageStatusParsed !== undefined || null) && setFilterStatus(filterStorageStatusParsed)
        isFilterActive === undefined && setFilterStatus(filterStorageStatusParsed)
    }

    const handleSavedMoviesFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        setSavedMoviesFilterStatus(isChecked)
    }

    const handleSearchValue = (e) => {
        e.preventDefault()
        handleStorageFilter()
        getBeatfilmMovies()
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

    //todo const handleSearchSavedMoviesValue = (e) => {
    //     e.preventDefault()
    //     const basicSavedMoviesList = getSavedMovies()
    //     setSavedMovies(basicSavedMoviesList)
    //     const results =
    //         !isSavedMoviesFilterActive ?
    //             savedMovies.filter(
    //                 (film) =>
    //                     film.nameRU.toLowerCase().includes(searchSavedMoviesTerm) || film.nameEN.toLowerCase().includes(searchSavedMoviesTerm)
    //             )
    //             :
    //             savedMovies.filter(
    //                 (film) =>
    //                     (film.nameRU.toLowerCase().includes(searchSavedMoviesTerm) || film.nameEN.toLowerCase().includes(searchSavedMoviesTerm)) && (film.duration <= 40)
    //             )
    //     setSavedMovies(results)
    //     results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    // }

    const handleSearchSavedMoviesValue = async (e) => {
        try {
            setIsLoading(true)
            e.preventDefault()
            const basicSavedMoviesList = await mainApi.getMovies()
            setSavedMovies(basicSavedMoviesList)
            const results =
                !isSavedMoviesFilterActive ?
                    basicSavedMoviesList.filter(
                        (film) =>
                            film.nameRU.toLowerCase().includes(searchSavedMoviesTerm) || film.nameEN.toLowerCase().includes(searchSavedMoviesTerm)
                    )
                    :
                    basicSavedMoviesList.filter(
                        (film) =>
                            (film.nameRU.toLowerCase().includes(searchSavedMoviesTerm) || film.nameEN.toLowerCase().includes(searchSavedMoviesTerm)) && (film.duration <= 40)
                    )
            setSavedMovies(results)
            results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }

    }

    console.log(savedMovies)
    console.log(searchSavedMoviesTerm)
    console.log(isFilterActive)
    console.log(isSavedMoviesFilterActive)

////////////////////////добавление и удалениекарточки и избранное////////////////////////

    const handleSaveMovie = (movieCard) => {
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

    const getSavedMovies = useCallback(() => {
        setIsLoading(true)
        mainApi
            .getMovies()
            .then((data) => {
                setSavedMovies(data)
            })
            .catch((err) =>

                console.error(err))

            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    //todo const getSavedMovies = useCallback(async () => {
    //     setIsLoading(true)
    //     try {
    //         mainApi
    //             .getMovies()
    //             .then((data) =>
    //                 setSavedMovies(data)
    //             )
    //     } catch {
    //     }finally {
    //         setIsLoading(false)
    //     }
    // }, [])

    // todo const getBeatfilmMovies = useCallback(() => {
    //     setIsLoading(true)
    //     moviesApi.getMovies()
    //         .then((data) => {
    //             setBeatfilmsArr(data);
    //         }).catch((err) => {
    //         setReqFailed(true)
    //     }).finally(() => {
    //         setIsLoading(false)
    //     })
    // }, [])

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

    ////////////////////////событие на закрытие окна////////////////////////


    useEffect(() => {
        window.addEventListener("onunload", handleUnload);
        return () => {
            window.removeEventListener("onunload", handleUnload);
        }
    }, []);

    const handleUnload = () => {
        localStorage.removeItem('loggedInStatus')
    };

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
                                    getSavedMovies={getSavedMovies}
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
                                    handleSavedMoviesSearchChange={handleSavedMoviesSearchChange}
                                    handleSearchSavedMoviesValue={handleSearchSavedMoviesValue}
                                    isReqFailed={isReqFailed}
                                    isAnyMatches={isAnyMatches}
                                    getSavedMovies={getSavedMovies}
                                    handleSavedMoviesFilterCheckbox={handleSavedMoviesFilterCheckbox}
                                    isLoading={isLoading}
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
                                    isInfoToolTipPopupOpen={isInfoToolTipPopupOpen}
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
