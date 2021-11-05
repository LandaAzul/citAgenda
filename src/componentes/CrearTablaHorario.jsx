import React from 'react'

export function CrearTablaHorario({franjas,lunes,martes,miercoles, jueves,viernes,sabado,domingo,titulo}) {
    
    return (
        <div className="w3-container w3-text-indigo">
            <div>
                <h1>{titulo}</h1>
            </div>
            <div className="w3-container w3-responsive">
                <table className="w3-table-all w3-centered w3-hoverable">
                    <thead>
                        <tr className="w3-indigo">
                            <th>Hora/Día</th>
                            {lunes?<th>Lunes</th>:null}
                            {martes?<th>Martes</th>:null}
                            {miercoles?<th>Miércoles</th>:null}
                            {jueves?<th>Jueves</th>:null}
                            {viernes?<th>Viernes</th>:null}
                            {sabado?<th>Sábado</th>:null}
                            {domingo?<th>Domingo</th>:null}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        franjas.map(dato => (
                        
                            <tr key={dato.id} title="Clíck para agendar turno">
                                <td>{dato.turno}</td>
                                {lunes?<td></td>:null}
                                {martes?<td></td>:null}
                                {miercoles?<td></td>:null}
                                {jueves?<td></td>:null}
                                {viernes?<td></td>:null}
                                {sabado?<td></td>:null}
                                {domingo?<td></td>:null}
                            </tr>
                        
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
