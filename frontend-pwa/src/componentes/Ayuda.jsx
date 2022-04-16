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

    const siguiente = () => {
        if (pagina < 4) { setpagina(pagina + 1) }
        if (pagina === 4) { setpagina(1) }
    }

    const anterior = () => {
        if (pagina > 1) { setpagina(pagina - 1) }
        if (pagina === 1) { setpagina(4) }
    }

    return (
        <div className='componentes'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large ">
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >&times;</b>
                    </Link>
                </div>
                <div style={{ cursor: 'pointer' }} className="w3-left w3-padding w3-text-indigo"
                    onClick={e => anterior()}><b>&#10094; anterior</b></div>
                <div style={{ cursor: 'pointer' }} className='w3-right w3-padding w3-text-indigo'
                    onClick={e => siguiente()}><b>siguiente &#10095;</b></div>
                <div style={{ marginTop: '35px' }} className="w3-container w3-panel w3-padding w3-gray w3-border w3-round-large ">
                    <div style={{ maxWidth: '800px', margin: '10px auto' }} className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        {pagina === 1 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo}><b>
                                    A continuación encontrarás ayuda básica acerca de la configuración de los diferentes componentes de este aplicativo.
                                </b>
                                </h2>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(2)}>
                                    <ul><b>Página:</b>
                                        <li>Personalizar</li>
                                        <li>Imágenes</li>
                                    </ul>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(3)}>
                                    <ul><b>Políticas:</b>
                                        <li>Configurar</li>
                                        <li>Ver horarios</li>
                                    </ul>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(4)}>
                                    <ul><b>Usuarios:</b>
                                        <li>Registrar</li>
                                        <li>Administrar</li>
                                        <li>Mi cuenta</li>
                                        <li>Formularios</li>
                                    </ul>
                                </div>
                            </div> : null}
                        {pagina === 2 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo} className='w3-center'><b>Página</b></h2>
                                <br></br>
                                <header><b>Personalizar</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte encontrarás todas las opciones para personalizar tu sitio web y  forma parte de los aspectos y datos importantes o relevantes que tus usuarios observan al momento de ingresar.
                                    Para editar estos datos debes dar clic en el botón ubicado en la parte superior <b>“Editar datos club”</b> o en <b>“Editar”</b> ubicado en la parte inferior, al hacer esto se te cargaran los campos con los
                                    datos ya almacenados, simplemente debes borrar o cambiar el texto del campo que desees editar, cuando estes seguro de tus cambios da clic en el botón de <b>“Actualizar”</b> para que los cambios
                                    queden guardados en la base de datos del aplicativo, en caso contrario que no desees cambiar nada simplemente da clic en el botón de <b>“Cancelar”</b> y ningún cambio se registrará.<br></br>
                                    Existen tres(3) botones switch dentro de esta configuración: <b>“Mostrar título en encabezado”</b> como su nombre lo dice, permitirá que el título se observe dentro del campo centrado en la imagen principal,
                                    si deseas mostrar imágenes con información relevante y el titulo tapa parte de esa información simplemente deshabilita lo, <b>”Mostrar presentación de imágenes”</b> mostrará un carrete de imágenes
                                    independiente de las imágenes principales de la página, habilítalo si deseas mostrar más imágenes de algún evento o información adicional y por último <b>“Mostrar clima”</b> el cual mostrará una barra
                                    que permitirá al usuario ver el clima que tiene la ciudad de Bucaramanga por defecto, se mostrará el clima por horas y por días.
                                </p><br></br>
                                <header><b>Imágenes</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte encontrará dos botones, el primero  <b>“Agregar imágenes”</b> el cual permite agregar un máximo de cinco(5) archivos por selección, pero ud puede subir la cantidad de archivos en formatos:
                                    jpg, jpeg, png, jfif que desee.<br></br>
                                    <b>“Mis imágenes”</b> listara o mostrará la cantidad de imágenes que tiene ya guardadas en el aplicativo, cada archivo estará acompañado de tres iconos los cuales permitirán que ud edite su visualización
                                    o elimine dicho archivo, le recordamos que para encabezado solo se permitirá un máximo de cinco imágenes, mientras que para presentacion de imagenes ya es decisión suya de cuantos archivos desea mostrar.

                                </p><br></br>
                            </div>
                            : null}
                        {pagina === 3 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo} className='w3-center'><b>Políticas</b></h2>
                                <header><b>Configurar</b></header>
                                <p></p><br></br>
                                <header><b>Ver horarios</b></header>
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
                                <header><b>Formularios</b></header>
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
        </div>
    )
}
