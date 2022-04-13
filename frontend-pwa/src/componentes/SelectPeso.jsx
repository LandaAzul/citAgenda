import React, { useState, useEffect } from 'react'

const Tamano = {
    width: '200px',
    height: '155px',
    overFlow: 'auto',
    position: 'absolute',
    backgroundColor: 'white',
    //border: '1px solid blue',
    boxShadow: '5px 2px 15px black',
    zIndex: 5
}

var listado = []

export function SelectPeso({ minimo, maximo, intervalo, value, onChange }) {

    const [salida, setsalida] = useState(value)
    const [mostrar, setmostrar] = useState(false)

    
    useEffect(() => {
        setsalida(value)
    }, [value])


    const crearListado = () => {
        let i = 0
        let valor = minimo
        for (i = minimo; i <= maximo; i++) {
            listado[i] = valor;
            valor = valor + intervalo
        }
    }


    const setEos = (e) => {
        setsalida(e);
        setmostrar(false);
        listado = []
    }


    const cerrar = document.getElementById('SelectPeso');
    window.onclick = function (event) {
        if (event.target !== cerrar) {
            setmostrar(false)
        }
    }

    return (
        <div >
            <div id='SelectPeso' style={{ position: 'relative' }} className="w3-input w3-border w3-round-large w3-text-black" onClick={e => { setmostrar(!mostrar); crearListado() }}>
                {salida}
                <span style={{ position: 'absolute', left: 'unset', right: '0px', top: '60%', transform: 'translateY(-50%)' }}>
                    <span className="material-icons-round">
                        expand_more
                    </span>
                </span>
            </div >
            {
                mostrar ?
                    <div className="w3-responsive w3-center w3-round-large w3-text-black" style={Tamano}>
                        < ul className="w3-ul w3-hoverable" >
                            {
                                listado.map((dat, index) => (
                                    <li key={index} value={dat} className='w3-right-align'
                                        onClick={(e) => { setEos(dat); onChange(dat) }}>
                                        {dat}
                                    </li>
                                ))
                            }

                        </ul>
                    </div > : null
            }
        </div>
    )
}
