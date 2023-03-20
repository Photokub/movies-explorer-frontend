import {Route, Routes } from 'react-router-dom';
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

function App() {


    return (
        <div className="App">
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<Main/>}/>
                    <Route path="/movies" element={<Movies/>}/>
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
