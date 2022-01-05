import React from 'react'
import {Rutas} from './rutas/Rutas'
import AuthProvider from './auth/AuthProvider'

export default function App() {
    return (
        <div>
            <AuthProvider>
                <Rutas/>
            </AuthProvider>
        </div>
    )
}
