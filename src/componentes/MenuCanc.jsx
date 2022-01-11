import React from 'react'
import { Link } from 'react-router-dom'
import { CerrarSesion } from '../componentes/CerrarSesion';
import {Encabezado} from '../componentes/Encabezado';
import {TextoInformativo} from '../componentes/TextoInformativo';

export function MenuCanc() {
    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/ballboy/usuario">
                            Usuario
                        </Link>
                    </button>
                </div>
                <div className="w3-col m4 w3-left-align">
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
