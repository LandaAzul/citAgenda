import React, { useEffect, useState } from 'react'
import { CrearTablaHorario } from './CrearTablaHorario';
import axios from 'axios';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';

export function Horario() {

    const { user } = useAuth();
    const [franjas, setfranjas] = useState([])

    useEffect(() => {
        const traerHorario = async () => {
            try {
                const respu = await axios.get(rutas.server + 'api/horario')
                setfranjas(respu.data[0])
            } catch (e) {
                //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
            }
        }
        traerHorario();
    }, [])


    return (
        <>
            <div>
                <CrearTablaHorario horario={franjas} />
            </div>
        </>
    )
}
