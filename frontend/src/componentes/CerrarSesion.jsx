import React from 'react'
import useAuth from '../auth/useAuth'
import {Link} from 'react-router-dom'

export function CerrarSesion() {

const {logout} = useAuth();

    return (
        <div>
            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small"
            onClick={logout}>
                <Link to="/">
                    <b>CERRAR SESION</b>
                </Link>
            </button>
        </div>
    )
}
