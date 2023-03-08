import { Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import AboutProject from "../AboutProject/AboutProject";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import './App.css';

function App() {
    return (
            <div className="App">
                <Header/>
                <Main/>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<AboutProject/>} />
                    <Route path="/movies" element={<Movies/>} />
                    <Route path="/saved-movies" element={<SavedMovies/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/signin" element={<Login/>} />
                    <Route path="/signup" element={<Register/>} />
                </Routes>
                <Footer/>
            </div>
    )
}

export default App;
