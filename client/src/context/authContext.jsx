import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { useQuery } from "@tanstack/react-query";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login = async (values) => {
        const res = await makeRequest.post("/auth/login", values)
        setCurrentUser(res.data)
    };


    const logout = async () => {
        await makeRequest.post("/auth/logout");
        setCurrentUser(null)
    }


 


    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },
    [currentUser])

    return (
        <AuthContext.Provider value={{login,currentUser,logout}}>
            {children}
        </AuthContext.Provider>
    )

}