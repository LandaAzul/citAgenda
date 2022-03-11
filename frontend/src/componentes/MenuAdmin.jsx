import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import rutas from '../helpers/rutas';
import BarraBienvenida from './BarraBienvenida';
import { CerrarSesion } from './CerrarSesion';
import { Encabezado } from './Encabezado';
import { TextoInformativo } from './TextoInformativo';

const Tamano = {
    width: '150px',
    margin:'0px auto',
    //height: '155px',
    overFlow: 'auto',
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid blue',
    boxShadow: '5px 2px 15px black',
    zIndex: 5
}

export function MenuAdmin() {

    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-col m2 w3-padding w3-dropdown-hover w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">
                        Página
                    </button>
                    <div className="w3-responsive w3-left-align w3-white w3-border w3-round-large" style={Tamano}>
                        <div style={{marginLeft:'15px'}} className="w3-hoverable">
                            <Link to={rutas.adminPagina}>
                                Personalizar
                            </Link>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <Link to={rutas.adminImagenes}>
                                Imágenes
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w3-col m2 w3-padding w3-dropdown-hover w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">
                        Políticas
                    </button>
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
                <div className="w3-col m2 w3-padding w3-dropdown-hover w3-black">
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
                <div className="w3-col m2 w3-padding w3-dropdown-hover w3-black">
                    <button style={{ textDecoration: 'underline' }} className="w3-button w3-round-xlarge w3-hover-white">Guia</button>
                    <div className="w3-dropdown-content  w3-round-xlarge w3-bar-block w3-black">
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminAyuda}>
                                Ayuda
                            </Link>
                        </button><br></br>
                        <button className="w3-button w3-round-xlarge w3-black w3-hover-white">
                            <Link to={rutas.adminAcerca}>
                                Acerca de
                            </Link>
                        </button>
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
