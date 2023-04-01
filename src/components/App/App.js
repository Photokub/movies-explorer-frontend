import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
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
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState('')
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [isAnyMatches, setIsAnyMatches] = useState(false)
    const [isReqFailed, setReqFailed] = useState(false);
    const location = useLocation()
    const [windowResizing, setWindowResizing] = useState(false);

    //const [loggedIn, setLoggedIn] = useState(false);
    const [isSubmitBtnActive, setIsSubmitBtnActive] = useState(false)
    //const [isFilterActive, setFilterStatus] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isFilterActive, setFilterStatus] = useState(JSON.parse(localStorage.getItem('filterCheckbox')))
    const [currentUser, setCurrentUser] = useState({})
    const [userData, setUserData] = useState({})
    const [errorToolTip, setErrorToolTip] = useState({text: ''})
    const navigate = useNavigate();

    const loggedInRef = useRef({})
    //loggedInRef.current = loggedIn

    //localStorage.setItem('loggedInStatus', 'false')

    const authStorageData = localStorage.getItem('loggedInStatus')

    const isLoggedInStorage = JSON.parse(authStorageData)

    const [loggedIn, setLoggedIn] = useState(isLoggedInStorage);


    const history = useNavigate()

////////////////////////аутентефикация//////////////////////////////////////////

    const checkToken = useCallback(async () => {
        try {
            const user = await mainApi.checkToken()
            if (!user) {
                throw new Error('Invalid user')
            }
            localStorage.setItem('loggedInStatus', 'true')
            getBeatfilmMovies()
            setUserData(user)
            setCurrentUser(user)
        } catch {
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken])


    // useEffect(() => {
    //     mainApi
    //         .getUserProfile()
    //         .then((data) => {
    //             setLoggedIn(true)
    //             //loggedInRef.current = loggedIn
    //             setCurrentUser(data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    const register = useCallback(async ({name, email, password}) => {
        try {
            setHasError(false)
            const res = await Auth.register({name, email, password});
            if(!res){
                localStorage.setItem('loggedInStatus', 'false')
            }
            localStorage.setItem('loggedInStatus', 'true')
            setLoggedIn(true)
            getBeatfilmMovies()
            setUserData({name, email})
            setCurrentUser({name, email})
            return res;
        } catch (err) {
            setHasError(true)
            setErrorToolTip({text: `${err}`})
            setIsSubmitBtnActive(false)
        }
    }, []);


    //todo const register = useCallback(({name, email, password}) => {
    //     Auth
    //         .register({name, email, password})
    //         .then(({name, email}) => {
    //             setLoggedIn(true)
    //             setUserData({name, email})
    //             setCurrentUser({name, email})
    //         })
    //         .catch((err)=> err.json())
    //         .then(errJson=>{
    //             // handle error message here
    //             console.log(errJson) });
    // },[])


    const login = useCallback(async ({password, email}) => {
            try {
                const data = await Auth.login({password, email});
                if (!data) {
                    setLoggedIn(false)
                }
                console.log(data)
                //setLoggedIn(true)
                localStorage.setItem('loggedInStatus', 'true')
                setUserData(data)
                setCurrentUser(data)
                getBeatfilmMovies()
            } catch (err) {
                setHasError(true)
                setErrorToolTip({text: `${err}`})
                setIsSubmitBtnActive(false)
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
                //setLoggedIn(true)
                localStorage.setItem('loggedInStatus', 'true')
                setUserData(data)
                setCurrentUser(data)
            } catch {
                setIsSubmitBtnActive(false)
            }
        }, []
    )

    const logOut = useCallback(() => {
        Auth.logOut()
            .then(() => {
                setLoggedIn(false)
                setUserData({});
                setCurrentUser({})
                localStorage.removeItem('searchTerm')
                localStorage.removeItem('moviesList')
                localStorage.removeItem('filterCheckbox')
                localStorage.removeItem('SavedMoviesList')
                localStorage.removeItem('loggedInStatus')
                navigate('/');
            })
    }, [])


    //////////////////получение фильмов с BeatFilms//////////////////////////////

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

///////////поиск фильмов ///////////////////


    const searchTermStorage = JSON.parse(localStorage.getItem('searchTerm')) || [];

    const handleSearchChange = event => {
        let currentSearchTerm;
        currentSearchTerm = (event.target.value);
        setSearchTerm(event.target.value);
        console.log(searchTerm)
        localStorage.setItem('searchTerm', JSON.stringify(currentSearchTerm))
    };

    const filterStorageStatus = localStorage.getItem('filterCheckbox');
    const filterStorageStatusParsed = JSON.parse(filterStorageStatus)
    // useEffect(() => {
    //     (filterStorageStatusParsed === null) ? setFilterStatus(filterStorageStatusParsed) : setFilterStatus(false)
    // }, [])



    const handleFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        debugger
        localStorage.setItem('filterCheckbox', isChecked);
        //const filterStorageStatusParsed = JSON.parse(localStorage.getItem('filterCheckbox'));
        //(filterStorageStatusParsed === null) ? setFilterStatus(filterStorageStatusParsed) : setFilterStatus(false)
        //setFilterStatus(filterStorageStatusParsed)
        isChecked === undefined ?
            setFilterStatus(JSON.parse(localStorage.getItem('filterCheckbox')))
            :
            setFilterStatus(isChecked);
        //setFilterStatus(JSON.parse(filterStorageStatus))
        console.log(isFilterActive)
    }

    const handleStorageFilter = () => {
        const filterStorageStatusParsed = JSON.parse(localStorage.getItem('filterCheckbox'));
        debugger
        (filterStorageStatusParsed !==  undefined||null) && setFilterStatus(filterStorageStatusParsed)
        isFilterActive === undefined && setFilterStatus(filterStorageStatusParsed)
    }

    const handleSearchValue = (e) => {
        e.preventDefault()
        //isFilterActive === undefined && setFilterStatus(JSON.parse(localStorage.getItem('filterCheckbox')))
        handleStorageFilter()
        debugger
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
        //todo/setMoviesList(movieListStorage)
        results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    }

    const movieListStorage = JSON.parse(localStorage.getItem('moviesList')) || [];

    const getSearchValue = useCallback((data) => setSearchTerm(data), [searchTerm]);

    const handleSearchSavedMoviesValue = (e) => {
        e.preventDefault()
        debugger
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

    //todo/const savedMovieListStorage = JSON.parse(localStorage.getItem('SavedMoviesList')) || [];

    //////////////////добавление и удалениекарточки и избранное///////////////////
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

    useEffect(() => {
        getSavedMovies()
    }, [getSavedMovies])


    /////////////////////таймаут на ресайз экрана/////////////////////////

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
                            loggedInRef={loggedInRef}
                        />
                    }>
                        <Route path='/' element={
                            <Main/>
                        }/>
                        <Route path='/movies'
                               element={<ProtectedRouteElement loggedIn={loggedIn} loggedInRef={loggedInRef}/>}>
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
                                    savedMovies={savedMovies}
                                    filterStorageStatus={filterStorageStatus}
                                    searchTermStorage={searchTermStorage}
                                    getSearchValue={getSearchValue}
                                    movieListStorage={movieListStorage}
                                    isLoading={isLoading}
                                />
                            }/>
                        </Route>
                        <Route path='/saved-movies'
                               element={<ProtectedRouteElement loggedIn={loggedIn} loggedInRef={loggedInRef}/>}>
                            <Route path="/saved-movies" element={
                                <SavedMovies
                                    handleSaveMovie={handleSaveMovie}
                                    savedMovies={savedMovies}
                                    filterStorageStatus={filterStorageStatus}
                                    searchTermStorage={searchTermStorage}
                                    handleFilterCheckbox={handleFilterCheckbox}
                                    handleSearchChange={handleSearchChange}
                                    handleSearchSavedMoviesValue={handleSearchSavedMoviesValue}
                                />
                            }
                            />
                        </Route>
                    </Route>
                    <Route element={
                        <LayoutProfile
                            loggedIn={loggedIn}
                            loggedInRef={loggedInRef}
                        />
                    }>
                        <Route path='/profile'
                               element={<ProtectedRouteElement loggedIn={loggedIn} loggedInRef={loggedInRef}/>}>
                            <Route path="/profile" element={
                                <Profile
                                    logOut={logOut}
                                    loggedIn={loggedIn}
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
                        />
                    }/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
