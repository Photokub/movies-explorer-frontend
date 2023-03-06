import {useEffect, useState, useCallback} from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import logo from '../../logo.svg';
import './App.css';

function App() {
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
