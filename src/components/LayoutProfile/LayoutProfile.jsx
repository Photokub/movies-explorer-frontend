import React from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const LayoutProfile = ({loggedIn, loggedInRef}) => (
    <>
        <Header
            loggedIn={loggedIn}
            loggedInRef={loggedInRef}
        />
        <Outlet/>
    </>
);

export {
    LayoutProfile
}