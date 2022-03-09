import React, { useState, useEffect } from 'react'

export function CrearTablaHorario({ horario }) {

    const [franjas, setfranjas] = useState(horario)

    useEffect(() => {
        setfranjas(horario)
    }, [horario])

    if (franjas) {
        if (franjas.length !== 0) {
            return (
                <>
                    {franjas.horario[0].lugar ?
                        <div className="w3-text-indigo w3-card w3-center w3-panel w3-white">
                            <div>
                                <h1>{franjas.horario[0].lugar}</h1>
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
                                                    {franjas.horario[0].lunes ? <td onClick={e => { franjas[dato.indice].lunes.solicita = true }}>{dato.lunes.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].martes ? <td onClick={e => { franjas[dato.indice].martes.solicita = true }}>{dato.martes.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].miercoles ? <td onClick={e => { franjas[dato.indice].miercoles.solicita = true }}>{dato.miercoles.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].jueves ? <td onClick={e => { franjas[dato.indice].jueves.solicita = true }}>{dato.jueves.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].viernes ? <td onClick={e => { franjas[dato.indice].viernes.solicita = true }}>{dato.viernes.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].sabado ? <td onClick={e => { franjas[dato.indice].sabado.solicita = true }}>{dato.sabado.solicita ? 'Apartada' : null}</td> : null}
                                                    {franjas.horario[0].domingo ? <td onClick={e => { franjas[dato.indice].domingo.solicita = true }}>{dato.domingo.solicita ? 'Apartada' : null}</td> : null}
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
        return (
            <div>Horario sin definir</div>
        )
    }
}
