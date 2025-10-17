import { createContext, useState } from "react";

export const global = createContext()

export function Global({ children }) {
    const [docs,setDocs] = useState([])
    return (
        <global.Provider value={{docs,setDocs}}>
            {children}
        </global.Provider>)
}