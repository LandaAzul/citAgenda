import React from 'react'
import { Encabezado } from './Encabezado'
import { TextoInformativo } from './TextoInformativo'
import rutas from '../helpers/rutas'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
    return (
        <>
            <div className='componentes'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large ">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <h1>Error 404 - not found requested url</h1>
                </div>
            </div>
            <Encabezado />
            <TextoInformativo />
        </>
    )
}
