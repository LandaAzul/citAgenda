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
                    <h2 style={Titulo}>A continuación encontrarás ayuda básica acerca de como configurar los elementos en la presente página</h2>
                    <p>
                        <b>Gestionar Página:</b><br></br>
                        fdgdfg dfdfg af afdaf asdf aeasdf sf asf asf fggdfg  ai lhoh h hio hlhh h ihu h  iojllkjlijl l figj df ñoij
                        idfgj  ñlfgargf ñdlfg  lf  lfk  fkldf  flfk fg fgiagf ertueoryr oe nrn orioer eor fvnwqoerhqp pdfglaeroq
                    </p>
                    <p>
                        <b>Gestionar Políticas:</b><br></br>
                    </p>
                    <p>
                        <b>Registrar Usuarios:</b><br></br>
                    </p>
                    <p>
                        <b>Administrar Usuarios:</b><br></br>
                    </p>
                    <p>

                    </p>
                    <p>

                    </p>
                    <p>

                    </p>
                    <p>

                    </p>
                    <p>

                    </p>
                    <p>
                        <b>Acerca de:</b><br></br>
                    </p>
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
