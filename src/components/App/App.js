import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import {Layout} from "../Layout/Layout";
import {LayoutProfile} from "../LayoutProfile/LayoutProfile";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import * as Auth from '../../utils/Auth';
import React, {useCallback, useContext, useEffect, useState} from "react";

function App(callback, deps) {

    const [searchTerm, setSearchTerm] = useState('')
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [isAnyMatches, setIsAnyMatches] = useState(false)
    const [isReqFailed, setReqFailed] = useState(false);
    const location = useLocation()
    const [windowResizing, setWindowResizing] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSubmitBtnActive, setIsSubmitBtnActive] = useState(false)
    const [isFilterActive, setFilterStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [userData, setUserData] = useState({})
    const [errorToolTip, setErrorToolTip] = useState({text: ''})
    const navigate = useNavigate();

    const history = useNavigate()

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
        },
        []);

    //todo useEffect(() => {
    //         if (loggedIn) {
    //             Promise.all([moviesApi.getMovies()])
    //                 .then(([data]) => {
    //                     setBeatfilmsArr(data)
    //                     console.log(beatfilmsArr)
    //                     setReqFailed(false)
    //                 })
    //                 .catch((err) => {
    //                     console.log(`Ошибка ${err}`)
    //                     setReqFailed(true)
    //                 })
    //         }
    //     },
    //     [loggedIn]);

////////////////////////аутентефикация//////////////////////////////////////////

    // const checkToken = useCallback(async () => {
    //     try {
    //         const user = await mainApi.getUserProfile()
    //         if (user) {
    //             setCurrentUser(user)
    //         }
    //     } catch {
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     checkToken();
    // }, [checkToken])


    useEffect(() => {
        mainApi
            .getUserProfile()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const register = useCallback(async ({name, email, password}) => {
        try {
            const res = await Auth.register({name, email, password});
            setLoggedIn(true)
            setUserData({name, email})
            setCurrentUser({name, email})
            return res;
        } catch (err) {
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
                setLoggedIn(true)
                setUserData(data)
                setCurrentUser(data)
            } catch (err) {
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
                navigate('/signin');
            })
    }, [])

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
            }, 1000);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


///////////поиск фильмов ///////////////////

// const getBeatfilmMovies = () => {
//     moviesApi.getMovies()
//         .then(data => {
//             setBeatfilmsArr(data)
//         }).catch((err) => {
//         console.log(`Ошибка ${err}`)
//     })
// }
//
//todo useEffect(() => {
//     moviesApi.getMovies()
//         .then(data => {
//             setBeatfilmsArr(data)
//         }).catch((err) => {
//         console.log(`Ошибка ${err}`)
//     })
// })

// let currentSearchTerm;
// const handleSearchChange = event => {
//     currentSearchTerm = (event.target.value);
//     console.log(currentSearchTerm)
//     localStorage.setItem('searchTerm', JSON.stringify(currentSearchTerm))
//     setSearchTerm(currentSearchTerm)
// };

    //const [isActive, setFilterStatus] = useState(false)


    // const handleSearchChange = event => {
    //     setSearchTerm(event.target.value);
    //     console.log(searchTerm)
    //     localStorage.setItem('searchTerm', JSON.stringify(searchTerm))
    // };

    const handleSearchChange = event => {
        let currentSearchTerm;
        currentSearchTerm = (event.target.value);
        setSearchTerm(event.target.value);
        console.log(searchTerm)
        localStorage.setItem('searchTerm', JSON.stringify(currentSearchTerm))
    };


    const handleFilterCheckbox = (e) => {
        const isChecked = e.target.checked
        localStorage.setItem('filterCheckbox', JSON.stringify(isChecked));
        setFilterStatus(!isChecked)
        console.log(isFilterActive)
    }
    //localStorage.setItem('moviesList', JSON.stringify(results));
    // const movieListStorage = JSON.parse(localStorage.getItem('moviesList')) || [];

    const handleSearchValue = (e) => {
        e.preventDefault()
        const results =
            isFilterActive ?
                beatfilmsArr.filter(
                    (film) =>
                        film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)
                )
                :
                beatfilmsArr.filter(
                    (film) =>
                        (film.nameRU.toLowerCase().includes(searchTermStorage) || film.nameEN.toLowerCase().includes(searchTermStorage)) && (film.duration <= 40)
                )

        setMoviesList(results)
        localStorage.setItem('moviesList', JSON.stringify(results));
        //handleMoviesList()
        //handleMoviesList()
        results.length === 0 ? setIsAnyMatches(true) : setIsAnyMatches(false)
    }

    const movieListStorage = JSON.parse(localStorage.getItem('moviesList')) || [];


    //todo const handleMoviesList = useCallback(()=> {
    //     setMoviesList(movieListStorage)
    // },[])
    //
    // useEffect(()=>{
    //     handleMoviesList()
    // },[])

    // useEffect(()=>{
    //     setMoviesList(movieListStorage)
    // },[])

    const getSearchValue = useCallback((data) => setSearchTerm(data), [searchTerm]);

    const searchTermStorage = JSON.parse(localStorage.getItem('searchTerm')) || [];
    const filterStorageStatus = localStorage.getItem('filterCheckbox');



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
                                savedMovies={savedMovies}
                                filterStorageStatus={filterStorageStatus}
                                searchTermStorage={searchTermStorage}
                                getSearchValue={getSearchValue}
                            />
                        }/>
                        <Route path="/saved-movies" element={
                            <SavedMovies
                                handleSaveMovie={handleSaveMovie}
                                savedMovies={savedMovies}
                            />
                        }
                        />
                    </Route>
                    <Route element={
                        <LayoutProfile/>
                    }>
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
                    <Route path="/signin" element={
                        <Login
                            login={login}
                            loggedIn={loggedIn}
                            userData={userData}
                            setUserData={setUserData}
                            errorToolTip={errorToolTip}
                        />
                    }/>
                    <Route path="/signup" element={
                        <Register
                            onRegister={register}
                            loggedIn={loggedIn}
                            userData={userData}
                            setUserData={setUserData}
                            errorToolTip={errorToolTip}
                        />
                    }/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
