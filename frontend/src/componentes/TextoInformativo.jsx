import React, { useState } from 'react';
import useAuth from '../auth/useAuth';

const TextoEstilo = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Helvética arial',
    fontSize: '24px',
    textShadow: '2px 2px 2px black',
    cursor: 'pointer'
}

export function TextoInformativo() {

    const { datosempresa } = useAuth();
    const [mostrar, setMostrar] = useState(false)

    return (
        <>
            <div style={TextoEstilo} className="w3-container w3-center w3-metro-dark-orange">
                <div onClick={e => setMostrar(!mostrar)} style={TextoEstilo} className="w3-padding w3-metro-dark-orange w3-center">
                    {mostrar ? 'Ocultar' : '¡Más información aquí!'}
                </div>
                {mostrar ?
                    <div className="w3-metro-dark-orange">
                        <div className="w3-panel w3-center w3-metro-dark-orange" onClick={e => setMostrar(!mostrar)}>
                            {datosempresa.descripcion}
                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}