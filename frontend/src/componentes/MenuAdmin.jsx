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
            <div className="w3-container w3-black w3-hide-small">
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Página
                    </button>
                    <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black" >
                        <Link to={rutas.adminPagina}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Personalizar
                            </div>
                        </Link>
                        <Link to={rutas.adminImagenes}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Imágenes
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Políticas
                    </button>
                    <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                        <Link to={rutas.adminHorario}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Horario
                            </div>
                        </Link>
                        <Link to={rutas.adminPermisos}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Permisos
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Usuarios
                    </button>
                    <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                        <Link to={rutas.adminRegistro}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Registrar
                            </div>
                        </Link>
                        <Link to={rutas.adminUsers}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Administrar
                            </div>
                        </Link>
                        <Link to={rutas.adminMeUser}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Mi cuenta
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Guia
                    </button>
                    <div className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-black">
                        <Link to={rutas.adminAyuda}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Ayuda
                            </div>
                        </Link>
                        <Link to={rutas.adminAcerca}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Acerca de
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m4 w3-right-align w3-padding">
                    <CerrarSesion />
                </div>
            </div>
            <div className="w3-container w3-black w3-hide-medium w3-hide-large">
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Página
                    </button>
                    <div style={{ position: 'relative', marginLeft: '15px' }} className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-dark-gray">
                        <Link to={rutas.adminPagina}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Personalizar
                            </div>
                        </Link>
                        <Link to={rutas.adminImagenes}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Imágenes
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Políticas
                    </button>
                    <div style={{ position: 'relative', marginLeft: '15px' }} className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-dark-gray">
                        <Link to={rutas.adminHorario}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Horario
                            </div>
                        </Link>
                        <Link to={rutas.adminPermisos}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Permisos
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Usuarios
                    </button>
                    <div style={{ position: 'relative', marginLeft: '15px' }} className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-dark-gray">
                        <Link to={rutas.adminRegistro}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Registrar
                            </div>
                        </Link>
                        <Link to={rutas.adminUsers}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Administrar
                            </div>
                        </Link>
                        <Link to={rutas.adminMeUser}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Mi cuenta
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w3-col m2 w3-dropdown-hover w3-padding w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-hover-white w3-round-xlarge">
                        Guia
                    </button>
                    <div style={{ position: 'relative', marginLeft: '15px' }} className="w3-dropdown-content w3-bar-block w3-round-xlarge w3-dark-gray">
                        <Link to={rutas.adminAyuda}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Ayuda
                            </div>
                        </Link>
                        <Link to={rutas.adminAcerca}>
                            <div style={{ textDecoration: 'underline' }} className="w3-bar-item w3-button w3-round-xlarge w3-hover-white">
                                Acerca de
                            </div>
                        </Link>
                    </div>
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
