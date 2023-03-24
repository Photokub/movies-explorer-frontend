import React from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = ({userData}) => (
    <>
        <Header
            userData={userData}
        />
        <Outlet/>
        <Footer/>
    </>
);

export {
    Layout
}