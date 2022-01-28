import React from 'react'
import { Encabezado } from './Encabezado'
import { TextoInformativo } from './TextoInformativo'

export function NotFoundPage() {
    return (
        <>
            <div className='w3-center'>
                <h1>Error 404 - not found requested url</h1>
            </div>
            <Encabezado />
            <TextoInformativo />
        </>
    )
}
