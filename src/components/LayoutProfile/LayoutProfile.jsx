import React from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const LayoutProfile = ({loggedIn}) => (
    <>
        <Header
            loggedIn={loggedIn}
        />
        <Outlet/>
    </>
);

export {
    LayoutProfile
}