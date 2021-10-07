import React from 'react'
import {Link} from 'react-router-dom'

const Letra = {
    color: 'blue',
    fontFamily: 'Helvética arial',
    //lineHeight:'18px',
    //textAlign: 'center',
    fontSize: '24px',
    //textShadow: '3px 3px 1px black',
}

const Contenido = {
    color: '#06219C',
    fontFamily: 'Helvética arial',
    //lineHeight:'18px',
    //textAlign: 'center',
    fontSize: '18px',
    //textShadow: '3px 3px 1px black',
}

const Titulo = {
    color: '#06219C',
    fontFamily: 'fantasy',
    lineHeight:'30px',
    textAlign: 'center',
    fontSize: '26px',
    //textShadow: '7px 7px 5px black',
}

export  function Ayuda() {
    return (
        <div className="w3-container w3-panel w3-col m10 ">
            <div className="w3-container w3-panel w3-padding w3-white">
                <div style={Letra} className="w3-container w3-right-align">
                    <Link to="/users/admin/">
                        <h3>
                            <b >volver</b>
                        </h3>
                    </Link>
                </div>
                <div style={Contenido}>
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
    )
}
