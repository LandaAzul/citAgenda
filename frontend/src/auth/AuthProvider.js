import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import rutas from '../helpers/rutas';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [roll, setRoll] = useState(null);
    const [datosempresa, setdatosempresa] = useState({})
    const [updatedates, setudd] = useState(false)

    const login = (userCredentials) => {
        setUser({ id: userCredentials.data.userFound._id, documento: userCredentials.data.userFound.documento, nombre: userCredentials.data.userFound.nombre, activo: userCredentials.data.userFound.activo, role: userCredentials.data.userFound.rol[0].name, token: userCredentials.data.token });
        setRoll(userCredentials.data.userFound.rol[0].name)
        window.localStorage.setItem('sesionCitas', JSON.stringify({ id: userCredentials.data.userFound._id, nombre: userCredentials.data.userFound.nombre, role: userCredentials.data.userFound.rol[0].name, activo: userCredentials.data.userFound.activo, token: userCredentials.data.token }))
    }

    useEffect(() => {
        let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
        const traerDatosEmpresa = async () => {
            try {
                const res = await axios.get(rutas.server + 'api/empresa');
                let idEm = res.data.map(user => user._id).join();
                const datosEmpresa = await axios.get(rutas.server + 'api/empresa/configuracion/' + idEm);
                if (!ignore) {
                    if (datosEmpresa.data.message) {
                        setdatosempresa(datosEmpresa.data.message);
                        //console.log(datosEmpresa)
                    }
                }
            }
            catch (e) { /*if (!ignore) { }*/ }
        }

        traerDatosEmpresa();
        return () => { ignore = true };
    }, []);

    useEffect(() => {
        let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
        const traerDatosEmpresa = async () => {
            try {
                const res = await axios.get(rutas.server + 'api/empresa');
                let idEm = res.data.map(user => user._id).join();
                const datosEmpresa = await axios.get(rutas.server + 'api/empresa/configuracion/' + idEm);
                if (!ignore) {
                    if (datosEmpresa.data.message) {
                        setdatosempresa(datosEmpresa.data.message);
                    }
                }
            }
            catch (e) { /*if (!ignore) { }*/ }
        }

        traerDatosEmpresa();
        return () => { ignore = true };
    }, [updatedates]);


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

    const upDateDates = () => {
        setudd(!updatedates);
    }

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        roll,
        datosempresa,
        updatedates,
        isLogged,
        hasRole,
        login,
        logout,
        upDateDates
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
