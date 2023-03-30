import React, {useState} from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = ({userData, loggedIn, loggedInRef}) => (
        <>
        <Header
            userData={userData}
            loggedIn={loggedIn}
            loggedInRef={loggedInRef}
        />
        <Outlet/>
        <Footer/>
    </>
);



export {
    Layout
}
