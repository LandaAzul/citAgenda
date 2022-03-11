import React, { useState, useEffect } from 'react'
import useAuth from '../auth/useAuth';

export function CrearTablaHorario({ horario }) {

    const { user, upDateDates } = useAuth();
    const [franjas, setfranjas] = useState(horario)

    useEffect(() => {
        setfranjas(horario)
    }, [horario])

    if (franjas) {
        if (franjas) {
            return (
                <>
                    {franjas.lugar ?
                        <div className="w3-text-indigo w3-card w3-center w3-panel w3-white">
                            <div>
                                <h1>{franjas.lugar}</h1>
                            </div>
                            <div className="w3-container w3-responsive w3-margin-bottom">
                                <table className="w3-table-all w3-centered w3-hoverable">
                                    <thead>
                                        <tr className="w3-indigo">
                                            <th>Hora/Día</th>
                                            {franjas.horario[0].lunes ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].lunes.fecha}</th> : null}
                                            {franjas.horario[0].martes ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].martes.fecha}</th> : null}
                                            {franjas.horario[0].miercoles ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].miercoles.fecha}</th> : null}
                                            {franjas.horario[0].jueves ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].jueves.fecha}</th> : null}
                                            {franjas.horario[0].viernes ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].viernes.fecha}</th> : null}
                                            {franjas.horario[0].sabado ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].sabado.fecha}</th> : null}
                                            {franjas.horario[0].domingo ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].domingo.fecha}</th> : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            franjas.horario.map(dato => (

                                                <tr key={dato.indice} title="Clíck para agendar turno">
                                                    <td>{dato.franja}</td>
                                                    {franjas.horario[0].lunes ? <td onClick={e => { console.log(franjas.horario[dato.indice].lunes) }}></td> : null}
                                                    {franjas.horario[0].martes ? <td ></td> : null}
                                                    {franjas.horario[0].miercoles ? <td></td> : null}
                                                    {franjas.horario[0].jueves ? <td></td> : null}
                                                    {franjas.horario[0].viernes ? <td></td> : null}
                                                    {franjas.horario[0].sabado ? <td></td> : null}
                                                    {franjas.horario[0].domingo ? <td></td> : null}
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null}
                </>
            )
        }
        else {
            return (
                <div>Franjas vacia</div>
            )
        }
    }
    else {
        return null
    }
}
