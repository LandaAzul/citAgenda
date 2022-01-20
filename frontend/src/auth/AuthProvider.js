import { createContext, useState } from "react";
import roles from "../helpers/roles";
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const history = useHistory();
    const [user, setUser] = useState(null);

    const login = (userCredentials, fromLocation) => {console.log(userCredentials)
        setUser({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token });
        if (fromLocation) { history.push(fromLocation); }
    }

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
