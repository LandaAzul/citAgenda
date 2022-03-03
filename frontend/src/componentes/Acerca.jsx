import React from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'

const Titulo = {
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: '26px',
}


export function Acerca() {


    return (
        <div className='acerca'>
            <div className='componentes'>
                <div className="w3-container">
                    <div className="w3-container w3-right-align ">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <div className="w3-padding">
                        <h2 className='w3-center'><b>
                            Aplicativo web para gestión de citas o turnos.
                        </b></h2>
                        <div>
                            <ul><b>Desarrollado por:</b>
                                <li>Javier David Landazábal</li>
                                <li>José Nelson Amaris</li>
                            </ul>
                        </div>
                        <div>
                            Aplicativo web para el agendamiento de citas o turnos para diferentes escenarios en su primera versión(2022)
                            desarrollado por estudiantes de último nivel de ingenierías de sistemas de la Universidad Industrial de Santander
                            como proyento de grado y prototipo de ejemplo para la asignatura de programación en la web, usando tecnologías de desarrollo
                            MERN(Mongo, Express, React.js y Node.js) stack.
                        </div>

                    </div>
                    <div className="w3-container w3-center">
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
