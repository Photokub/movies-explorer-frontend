import React from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const LayoutProfile = () => (
    <>
        <Header/>
        <Outlet/>
    </>
);

export {
    LayoutProfile
}