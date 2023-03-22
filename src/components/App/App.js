import {Route, Routes, useLocation} from 'react-router-dom';
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
import React, {useEffect, useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const location = useLocation()

    useEffect(() => {
        Promise.all([moviesApi.getMovies()])
            .then(([data]) => {
                setBeatfilmsArr(data)
                console.log(beatfilmsArr)
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }, [location.pathname === '/movies']);

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
        localStorage.setItem('moviesList', JSON.stringify(moviesList));
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
                        />
                    }/>
                    <Route path="/saved-movies" element={<SavedMovies/>}/>
                </Route>
                <Route element={<LayoutProfile/>}>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )
}

export default App;
