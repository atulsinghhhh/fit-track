import React, { useContext } from "react"
import { authDataProvider } from "../Context/AuthContext"
import { Navigate } from "react-router";
import PageLoader from "./Pageloader";


const ProtectRoute=({children})=>{
    const {user,loading}=useContext(authDataProvider);

    // console.log("loading:", loading);
    // console.log("user:", user);

    if(loading) return <PageLoader/>

    if(!user) return <Navigate to="/login" replace />

    return children
}

export default ProtectRoute