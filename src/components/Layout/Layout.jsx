import React from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";


const Layout = ({userData, loggedIn}) => (
    <>
        <Header
            userData={userData}
            loggedIn={loggedIn}
        />
        <Outlet/>
        <Footer/>
    </>
);

export {
    Layout
}