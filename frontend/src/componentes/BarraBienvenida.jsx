import React from 'react'
import useAuth from '../auth/useAuth'

export default function BarraBienvenida() {

    const { user } = useAuth();
    return (
        <div>
            {user ? <div className="w3-container w3-metro-dark-purple">
                < div className='w3-right' title='Recuerda que para cambiar a estado "Activo" debes contactar con el administrador.' >
                    Bienvenido < b > {user.nombre}</b > tu estado: <b>{user.activo ? 'Activo' : 'Inactivo'}</b>
                </div >
            </div >
                : null
            }
        </div>
    )
}
