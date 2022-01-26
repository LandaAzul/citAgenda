import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextoEstilo = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Helvética arial',
    fontSize: '24px',
    textShadow: '2px 2px 2px black',
    cursor: 'pointer'
}


export function TextoInformativo() {

    const [texto, setTexto] = useState('')
    const [mostrar, setMostrar] = useState(false)

    useEffect(() => {
        let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
        const traerDatos = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/empresas');
                let idEm = res.data.map(user => user._id).join()
                const resp = await axios.get('http://localhost:4000/api/empresas/' + idEm);
                if (!ignore) setTexto(resp.data.message.descripcion);
            }
            catch { if (!ignore) setTexto(null) }
        }

        traerDatos();
        return () => { ignore = true };
    }, []);

    const MostrarTexto = (e) => {
        let value = !mostrar
        setMostrar(value)
    }

    return (
        <div style={TextoEstilo} className="w3-container w3-center w3-metro-dark-orange">
            <div onClick={MostrarTexto} style={TextoEstilo} className="w3-padding w3-metro-dark-orange w3-center">
                {mostrar ? 'Ocultar' : '¡Más información aquí!'}
            </div>
            {mostrar ?
                <div className="w3-metro-dark-orange">
                    <div className="w3-panel w3-center w3-metro-dark-orange" onClick={MostrarTexto}>
                        {texto}
                    </div>
                </div>
                : null}
        </div>

    )
}


