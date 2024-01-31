import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";




export const SocketContext = createContext()



export const SocketContextProvider = ({children}) => {
const socket = useRef()
useEffect(()=>{
    socket.current= io('http://localhost:5000')
},[])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}




