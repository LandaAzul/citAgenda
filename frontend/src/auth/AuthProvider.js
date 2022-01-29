import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [roll, setRoll] = useState(null);

    const login = (userCredentials) => {
        setUser({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, activo: userCredentials.data.userFound.activo, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token });
        setRoll(userCredentials.data.userFound.rol[0].name)
        window.localStorage.setItem('sesionCitas', JSON.stringify({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token }))

    }

    useEffect(() => {
        const userLogueado = window.localStorage.getItem('sesionCitas')
        if (userLogueado) {
            const datosGuardados = JSON.parse(userLogueado);
            setUser(datosGuardados);
            setRoll(datosGuardados.role)
        }
    }, [])

    const logout = () => {
        setUser(null);
        setRoll(null);
        window.localStorage.removeItem('sesionCitas');
    }

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        roll,
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
