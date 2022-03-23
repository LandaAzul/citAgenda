import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'

const Titulo = {
    maxWidth: '700px',
    margin: '10px auto',
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'justify',
}


export function Ayuda() {

    const [pagina, setpagina] = useState(1)


    return (
        <div className='componentes'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large ">
                <div style={{ maxWidth: '800px', margin: '10px auto' }}>
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    {pagina === 1 ?
                        <div className="w3-text-indigo">
                            <h2 style={Titulo}><b>
                                A continuación encontrarás ayuda básica acerca de la configuración de los diferentes componentes de este aplicativo.
                            </b></h2>
                            <div style={{ cursor: 'pointer' }} onClick={e => setpagina(2)}>
                                <ul><b>Página:</b>
                                    <li>Personalizar</li>
                                    <li>Imágenes</li>
                                </ul>
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={e => setpagina(3)}>
                                <ul><b>Políticas:</b>
                                    <li>Horario</li>
                                    <li>Permisos</li>
                                </ul>
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={e => setpagina(4)}>
                                <ul><b>Usuarios:</b>
                                    <li>Registrar</li>
                                    <li>Administrar</li>
                                    <li>Mi cuenta</li>
                                </ul>
                            </div>
                        </div> : null}
                    {pagina === 2 ?
                        <div className="w3-text-indigo">
                            <h2 style={Titulo} className='w3-center'><b>Página</b></h2>
                            <header><b>Personalizar</b></header>
                            <p></p><br></br>
                            <header><b>Imágenes</b></header>
                            <p></p><br></br>
                        </div>
                        : null}
                    {pagina === 3 ?
                        <div className="w3-text-indigo">
                            <h2 style={Titulo} className='w3-center'><b>Políticas</b></h2>
                            <header><b>Horario</b></header>
                            <p></p><br></br>
                            <header><b>Permisos</b></header>
                            <p></p><br></br>
                        </div>
                        : null}
                    {pagina === 4 ?
                        <div className="w3-text-indigo">
                            <h2 style={Titulo} className='w3-center'><b>Usuarios</b></h2>
                            <header><b>Registrar</b></header>
                            <p></p><br></br>
                            <header><b>Administrar</b></header>
                            <p></p><br></br>
                            <header><b>Mi cuenta</b></header>
                            <p></p><br></br>
                        </div>
                        : null}
                    <div style={{ fontSize: '17px', cursor: 'pointer' }} className='w3-center w3-text-indigo'>
                        {pagina === 1 ? <b style={{ textDecoration: 'underline' }}>1</b> : <div style={{ display: 'inline' }} onClick={e => setpagina(1)}>1</div>}
                        {pagina === 2 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>2</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(2)}>2</div>}
                        {pagina === 3 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>3</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(3)}>3</div>}
                        {pagina === 4 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>4</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(4)}>4</div>}
                    </div>
                    <div className="w3-container w3-center w3-text-indigo">
                        <Link to="/users/admin/">
                            <h3>
                                <b>Cerrar</b>
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
