import React, {useState} from 'react'

export default function Busqueda() {

const [codigo, setCodigo]=useState('')

    return (
        <div>
            <form>
                <label>Ingrese el documento o código del usuario a buscar:</label><br></br>
                <input type="text" onChange={e => setCodigo(e.target.value)}></input>
                <button type="submit">Buscar</button>
                <button type="reset" onClick={e => setCodigo()}>Limpiar</button>
                
            </form>
        </div>
    )
}
