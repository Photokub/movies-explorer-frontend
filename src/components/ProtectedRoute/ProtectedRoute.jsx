import React from 'react';
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRouteElement = ({loggedIn, loggedInRef}) => {
    return (
        loggedInRef ? <Outlet/> : <Navigate to="/signin"/>

    )}

export default ProtectedRouteElement;