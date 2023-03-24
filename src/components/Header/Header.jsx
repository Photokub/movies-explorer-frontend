import React from "react";

import './Header.css'
import Navigation from "../Navigation/Navigation";

export default function Header({userData}) {
    return (
        <header className="header">
            <Navigation
                userData={userData}
            />
        </header>
    )
}