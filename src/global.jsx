import { createContext, useState } from "react";

export const GlobalContext = createContext()

export function Global({ children }) {
    const [notif, setNotif] = useState(0)
    const [no,setNo] = useState(1)
    return (
        <GlobalContext.Provider value={{notif,setNotif, no,setNo}}>
            {children}
        </GlobalContext.Provider>)
}