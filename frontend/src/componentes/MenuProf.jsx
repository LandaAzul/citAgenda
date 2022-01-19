import React from 'react'
import { Link } from 'react-router-dom'
import { CerrarSesion } from './CerrarSesion';
import {Encabezado} from './Encabezado';
import {TextoInformativo} from './TextoInformativo';

export function MenuProf() {
    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/profesor/usuario">
                            Usuario
                        </Link>
                    </button>
                </div>
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/profesor/politicas">
                            Políticas
                        </Link>
                    </button>
                </div>
                <div className="w3-col m2 w3-left-align">
                    <button disabled className="w3-button">

                    </button>
                </div>
                <div className="w3-col m6 w3-right-align w3-padding">
                    <CerrarSesion />
                </div>
            </div>
            <Encabezado />
            <TextoInformativo />
        </>
    )
}
