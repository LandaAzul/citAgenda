import React from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'

const Titulo = {
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: '26px',
}


export function Ayuda() {


    return (
        <div className='componentes'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large ">
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >&times;</b>
                    </Link>
                </div>
                <div className="w3-text-indigo w3-padding">
                    <h2 style={Titulo}><b>
                        A continuación encontrarás ayuda básica acerca de la configuración de los diferentes componentes de este aplicativo.
                    </b></h2>
                    <div>
                        <ul><b>Página:</b>
                            <li>Personalizar</li>
                            <li>Imágenes</li>
                        </ul>
                    </div>
                    <div>
                        <ul><b>Políticas:</b>
                            <li>Horario</li>
                            <li>Permisos</li>
                        </ul>
                    </div>
                    <div>
                        <ul><b>Usuarios:</b>
                            <li>Registrar</li>
                            <li>Administrar</li>
                            <li>Mi cuenta</li>
                        </ul>
                    </div>
                </div>
                <div className="w3-container w3-center w3-text-indigo">
                    <Link to="/users/admin/">
                        <h3>
                            <b>Cerrar</b>
                        </h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
