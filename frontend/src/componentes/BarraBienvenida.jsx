import React, { useEffect, useState } from 'react'
import useAuth from '../auth/useAuth'
import happyB from '../imagenes/happyB.gif';

export default function BarraBienvenida() {

    const { user } = useAuth();
    const [mostrar, setmostrar] = useState(false)
    const [cumple, setcumple] = useState(new Date(user.fechaNacimiento).getMonth() + '/' + new Date(user.fechaNacimiento).getDate())

    useEffect(() => {
        if (cumple !== '' || cumple !== null) {
            setcumple(new Date(user.cumple).getMonth() + '/' + new Date(user.cumple).getDate())
            let hoy = (new Date().getMonth() + '/' + new Date().getDate())
            if (cumple === hoy) { setmostrar(true) }
        }
    }, [user.cumple, cumple])


    return (
        <div>
            {user ?
                <div className=" w3-metro-dark-purple">
                    <div className="w3-container w3-metro-dark-purple">
                        <div className='w3-right' title='Recuerda que para cambiar a estado "Activo" debes contactar con el administrador.' >
                            Bienvenido < b > {user.nombre}</b > tu estado: <b>{user.activo ? 'Activo' : 'Inactivo'}</b>
                        </div >
                    </div>
                    {mostrar ?
                        <div className='w3-pink'>
                            <div className='w3-center'>
                                <br></br>
                                <h1>Y porque nos acordamos de ti, pasamos a desearte un ...</h1>
                            </div>                            
                            <div style={{ width: '100%', height: '0', paddingBottom: '56%', position: 'relative' }} >
                                <img src={happyB} alt="https://giphy.com/embed/dc7XNKPbDOotpsUI8q" title="https://giphy.com/embed/dc7XNKPbDOotpsUI8q" width={"100%"} height={"100%"} style={{ position: 'absolute'}} frameBorder={"0"} />
                            </div>
                        </div>
                        : null}
                </div>
                : null
            }
        </div>
    )
}

