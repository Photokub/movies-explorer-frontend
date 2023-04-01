import React from "react";

import './Header.css'
import Navigation from "../Navigation/Navigation";

export default function Header({userData, loggedIn}) {
    return (
        <header className="header">
            <Navigation
                userData={userData}
                loggedIn={loggedIn}
            />
        </header>
    )
}