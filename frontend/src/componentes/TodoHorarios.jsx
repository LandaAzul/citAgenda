import React, { useState } from 'react'
import axios from 'axios'
import rutas from '../helpers/rutas';
import { Link } from 'react-router-dom';

export function TodoHorarios() {

    const [franjas, setfranjas] = useState()

    const traerHorario = async () => {
        try {
            const respu = await axios.get(rutas.server + 'api/horario/activo')
            //setfranjas(respu.data.filter(user => user.activo === true))
            setfranjas(respu.data)
        } catch (e) {
            //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }

    return (<>
        <div className='componentes'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >&times;</b>
                    </Link>
                </div>
                <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                    <h2><b>Vista de todos los horario</b></h2>
                </div>
                
            </div>
        </div>
    </>
    )
}
