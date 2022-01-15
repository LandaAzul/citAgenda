import React from 'react'
import { Rutas } from './rutas/Rutas'
import AuthProvider from './auth/AuthProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import { PiePagina } from './componentes/PiePagina';
import {Horario} from './componentes/Horario';

export default function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Rutas />
                    <Horario/>  
                    <PiePagina/>
                </AuthProvider>
            </Router>
        </div>
    )
}
