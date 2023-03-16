import {Route, Routes, useResolvedPath} from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {

    const shouldHide = useResolvedPath('signin' || 'signup' || '*');

    return (
        <div className="App">
            {!shouldHide && <Header/>}
            {/*<Header/>*/}
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/saved-movies" element={<SavedMovies/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={<Register/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            {/*<Footer/>*/}
            {!shouldHide && <Footer/>}
            <Routes>

            </Routes>
        </div>
    )
}

export default App;
