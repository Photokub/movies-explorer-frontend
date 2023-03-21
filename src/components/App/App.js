import {Route, Routes} from 'react-router-dom';
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
import React, {useState} from "react";

function App() {

    const [searchTerm, setSearchTerm] = useState("");
    const [beatfilmsArr, setBeatfilmsArr] = useState([])
    const [moviesList, setMoviesList] = useState([])

    ///////////поиск фильмов ///////////////////

    const getbeatfilmMovies = () => {
        moviesApi.getMovies()
            .then(data => {
                setBeatfilmsArr(data)
            }).catch((err) => {
            console.log(`Ошибка ${err}`)
        })
    }

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchValue = (e) => {
        e.preventDefault()
        getbeatfilmMovies()
        console.log(beatfilmsArr)
        const results = beatfilmsArr.filter((film) => film.nameRU.includes(searchTerm) || film.nameEN.includes(searchTerm))
        setMoviesList( results )
    }


    return (
        <div className="App">
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<Main/>}/>
                    <Route path="/movies" element={
                        <Movies
                            searchTerm = {searchTerm}
                            onHandleSearchValue={handleSearchValue}
                            onHandleSearchChange={handleSearchChange}
                            moviesList = {moviesList}
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
