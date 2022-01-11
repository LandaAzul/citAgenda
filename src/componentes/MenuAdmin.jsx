import React from 'react'
import { Link } from 'react-router-dom'
import { CerrarSesion } from '../componentes/CerrarSesion';
import {Encabezado} from '../componentes/Encabezado';
import {TextoInformativo} from '../componentes/TextoInformativo';

export function MenuAdmin() {
    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/admin/pagina">
                            Personalizar
                        </Link>
                    </button>
                </div>
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/admin/politicas">
                            Políticas
                        </Link>
                    </button>
                </div>
                <div className="w3-col m2 w3-padding w3-dropdown-hover">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">Usuarios</button>
                    <div className="w3-dropdown-content w3-bar-block w3-black">
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to="/users/admin/registroAdmin">
                                Registrar
                            </Link><br></br>
                        </button>
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to="/users/admin/usuarios">
                                Administrar
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to="/users/admin/ayuda">
                            Guía
                        </Link>
                    </button>
                </div>
                <div className="w3-col m4 w3-right-align w3-padding">
                    <CerrarSesion />
                </div>
            </div>
            <Encabezado />
            <TextoInformativo />
        </>
    )
}
