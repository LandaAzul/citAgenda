import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({children}) {

const [user, setUser] = useState({id:1 , role:'Administrador'})

const login = (userCredentials) => setUser({id:1 , role:'Administrador'});
const logout = () => setUser(null);

const isLogged = () => !!user;
const hasRole = (role) => user?.role === role;

const contextValue = {
    user,
    isLogged,
    hasRole,
    login,
    logout
}

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
