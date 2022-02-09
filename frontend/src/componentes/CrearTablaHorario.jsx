import React from 'react'


export function CrearTablaHorario({ franjas, lunes, martes, miercoles, jueves, viernes, sabado, domingo, titulo }) {


    return (
        <>
            {titulo ?
                <div className="w3-text-indigo w3-card w3-panel w3-white">
                    <div>
                        <h1>{titulo}</h1>
                    </div>
                    <div className="w3-container w3-responsive w3-margin-bottom">
                        <table className="w3-table-all w3-centered w3-hoverable">
                            <thead>
                                <tr className="w3-indigo">
                                    <th>Hora/Día</th>
                                    {lunes ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas[0].lunes.fecha}</th> : null}
                                    {martes ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas[0].martes.fecha}</th> : null}
                                    {miercoles ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas[0].miercoles.fecha}</th> : null}
                                    {jueves ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas[0].jueves.fecha}</th> : null}
                                    {viernes ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas[0].viernes.fecha}</th> : null}
                                    {sabado ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas[0].sabado.fecha}</th> : null}
                                    {domingo ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas[0].domingo.fecha}</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    franjas.map(dato => (

                                        <tr key={dato.indice} title="Clíck para agendar turno">
                                            <td>{dato.turno}</td>
                                            {lunes ? <td onClick={e => { franjas[dato.indice].lunes.asistio = true }}>{dato.lunes.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {martes ? <td onClick={e => { franjas[dato.indice].martes.asistio = true }}>{dato.martes.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {miercoles ? <td onClick={e => { franjas[dato.indice].miercoles.asistio = true }}>{dato.miercoles.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {jueves ? <td onClick={e => { franjas[dato.indice].jueves.asistio = true }}>{dato.jueves.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {viernes ? <td onClick={e => { franjas[dato.indice].viernes.asistio = true }}>{dato.viernes.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {sabado ? <td onClick={e => { franjas[dato.indice].sabado.asistio = true }}>{dato.sabado.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
                                            {domingo ? <td onClick={e => { franjas[dato.indice].domingo.asistio = true }}>{dato.domingo.asistio ? 'Ocupado' : 'Disponible'}</td> : null}
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
