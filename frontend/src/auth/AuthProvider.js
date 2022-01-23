import { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const history = useHistory();
    const [user, setUser] = useState(null);

    const login = (userCredentials, fromLocation) => {
        setUser({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token });
        window.localStorage.setItem('sesionCitas', JSON.stringify({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token }))
        if (fromLocation) { history.push(fromLocation); }
    }

    useEffect(() => {
        const userLogueado = window.localStorage.getItem('sesionCitas')
        if (userLogueado) {
            const datosGuardados = JSON.parse(userLogueado);
            setUser(datosGuardados);
        }
    }, [])

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('sesionCitas');
    }

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
