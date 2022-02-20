import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import rutas from '../helpers/rutas';
import BarraBienvenida from './BarraBienvenida';
import { CerrarSesion } from './CerrarSesion';
import { Encabezado } from './Encabezado';
import { TextoInformativo } from './TextoInformativo';


export function MenuAdmin() {

    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to={rutas.adminPagina}>
                            Personalizar
                        </Link>
                    </button>
                </div>
                <div className="w3-col m2 w3-padding w3-dropdown-hover">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">Políticas</button>
                    <div className="w3-dropdown-content  w3-round-xlarge w3-bar-block w3-black">
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminHorario}>
                                Horario
                            </Link>
                        </button><br></br>
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminPermisos}>
                                Permisos
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="w3-col m2 w3-padding w3-dropdown-hover">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">Usuarios</button>
                    <div className="w3-dropdown-content  w3-round-xlarge w3-bar-block w3-black">
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminRegistro}>
                                Registrar
                            </Link><br></br>
                        </button>
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminUsers}>
                                Administrar
                            </Link>
                        </button>
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminMeUser}>
                                Mi cuenta
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="w3-col m2 w3-padding">
                    <button className="w3-button w3-round-xlarge w3-hover-white">
                        <Link to={rutas.adminAyuda}>
                            Guía
                        </Link>
                    </button>
                </div>
                <div className="w3-col m4 w3-right-align w3-padding">
                    <CerrarSesion />
                </div>
            </div>
            <BarraBienvenida />
            <Outlet />
            <Encabezado />
            <TextoInformativo />
        </>
    )
}
