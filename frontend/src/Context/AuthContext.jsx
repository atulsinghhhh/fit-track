import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const authDataProvider=createContext();

const AuthProvider=({children})=>{
    const baseUrl="http://localhost:5001/api"

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchProfile=async()=>{
            try {
                const response=await axios.get(`${baseUrl}/auth/me`,{
                    withCredentials: true
                });
                setIsLoggedIn(true);
                setUser(response.data.user);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                setIsLoggedIn(false);
                setUser(null);
            } finally{
                setLoading(false);
            }
        }
        fetchProfile();
    },[baseUrl])

    const value={
        baseUrl,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading
    }

    return(
        <authDataProvider.Provider value={value}>
            {children}
        </authDataProvider.Provider>
    )
}

export default AuthProvider