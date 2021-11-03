import React from 'react'

export function CrearTablaHorario({franjas, horaInicio,minIni,lunes,martes,miercoles, jueves,viernes,sabado,domingo,titulo}) {
    return (
        <div className="w3-container w3-text-indigo">
            <h1>{titulo}</h1>
            <table className="w3-table-all w3-hoverable">
                <thead>
                    <tr className="w3-indigo">
                        <th className="w3-center">Hora/Día</th>
                        {lunes?<th className="w3-center">Lunes</th>:null}
                        {martes?<th className="w3-center">Martes</th>:null}
                        {miercoles?<th className="w3-center">Miércoles</th>:null}
                        {jueves?<th className="w3-center">Jueves</th>:null}
                        {viernes?<th className="w3-center">Viernes</th>:null}
                        {sabado?<th className="w3-center">Sábado</th>:null}
                        {domingo?<th className="w3-center">Domingo</th>:null}
                    </tr>
                </thead>
                <tbody>
                {
                    franjas.map(dato => (
                    
                        <tr key={dato.id} title="Clíck para agendar turno">
                            <td>{dato.id}</td>
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
    )
}
