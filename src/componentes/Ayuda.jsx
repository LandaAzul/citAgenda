import React from 'react'
import { Link } from 'react-router-dom'
import { MenuAdmin } from './MenuAdmin';

const Letra = {
    fontSize: '24px',
    color: 'blue'
}
const Titulo = {
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: '26px',
}

export function Ayuda() {

    return (
        <>
            <MenuAdmin/>
            {/*aquí para pantallas grandes ##############################################################3*/}
            <div style={{ position: 'relative', left: '10%' }} className="w3-container w3-hide-small">
                <div className="w3-container w3-panel w3-col m10 ">
                    <div className="w3-container w3-panel w3-padding w3-white">
                        <div style={Letra} className="w3-container w3-right-align">
                            <Link to="/users/admin/">
                                <h3>
                                    <b >volver</b>
                                </h3>
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
                        <div style={Letra} className="w3-container w3-center">
                            <Link to="/users/admin/">
                                <h3>
                                    <b>volver</b>
                                </h3>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            {/*aquí para pantallas pequeñas ##############################################################3*/}
            <div className="w3-hide-large w3-hide-medium">

            </div>
        </>
    )
}
