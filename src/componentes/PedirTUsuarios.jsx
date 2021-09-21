import React, { useState } from 'react'
import axios from 'axios'

const Tamano = {
    //width:'200px',
    height:'250px',
    overFlow:'auto'
  }

export function PedirTUsuarios() {

    const [users, setUsers] = useState([])

    async function componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        //setUsers({users: res.data});
        setUsers(res.data);
        //console.log(users)

    }


    return (
        <div className="w3-container">
            <div className="w3-panel">
                <button type="button" onClick={componentDidMount}>
                    Mostrar todos los usuarios
                </button>

                <button type="button" onClick={e => setUsers([])}>
                    Cerrar
                </button>
            </div>
            
            <div className="w3-panel w3-responsive" style={Tamano}>
                <table className="w3-table-all w3-hoverable">
                    <thead>
                        <tr className="w3-light-grey">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(user => (
                        
                        <tr key={user._id}>
                            <td></td>
                            <td>{user.username}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
