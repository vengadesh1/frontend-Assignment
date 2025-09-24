import React from "react";
import { Navigate } from "react-router";

function PrivateRoute({children}){
    const token = localStorage.getItem("credentials");
    console.log(token)
    return token ? children : <Navigate to="/" />
    
}

export default PrivateRoute;