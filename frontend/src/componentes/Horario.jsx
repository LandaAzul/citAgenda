import React, { useEffect, useState } from 'react'
import { CrearTablaHorario } from './CrearTablaHorario';
import axios from 'axios';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';

export function Horario() {

    const { user, updatedates } = useAuth();
    const [franjas, setfranjas] = useState([])

    useEffect(() => {
        const traerHorario = async () => {
            try {
                const respu = await axios.get(rutas.server + 'api/horario')
                setfranjas(respu.data)
            } catch (e) {
                //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
            }
        }
        traerHorario();
    }, [updatedates])

    function MostrarHorarios() {
        if (franjas) {
            const horarios = franjas;
            const hors = horarios.map((url, index) =>
                <div key={index}>
                    <CrearTablaHorario horario={franjas[index]} />
                </div>
            );
            return (
                <div className='w3-panel w3-white w3-border w3-round-large'>
                    {hors}
                </div>
            );
        }
        else { return null }
    }



    return (
        <>
            {franjas.length > 0 ?
                <MostrarHorarios />
                : <div className='w3-container w3-padding w3-center w3-text-gray'><h1>Sin horario definido aún</h1></div>}
        </>
    )
}
