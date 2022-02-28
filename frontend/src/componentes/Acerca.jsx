import React from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'

const Titulo = {
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: '26px',
}


export function Acerca() {


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
                        Aplicativo web para gestión de citas o turnos.
                    </b></h2>
                    <div>
                        <ul><b>Desarrollado por:</b>
                            <li>Javier Landazabal</li>
                            <li>José Nelson Amaris</li>
                        </ul>
                    </div>
                    <div>
                        
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
