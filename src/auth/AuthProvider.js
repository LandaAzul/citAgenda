import { Children, createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({children}) {

//const [user, setUser] = useState(null)
const [user, setUser] = useState({id:1 , role:'Administrador'})

const contextValue = {
    user
}

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
