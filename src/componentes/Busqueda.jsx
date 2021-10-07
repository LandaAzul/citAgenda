import React, {useState} from 'react'
import axios from 'axios'

const Tamano = {
    //width:'200px',
    height:'275px',
    overFlow:'auto'
    }

export function Busqueda() {
    
const [users, setUsers] = useState([])
const [mostrarUsers, setMU] = useState('')


const componentDidMount = async (e) => {
    const res = await axios.get('http://localhost:4000/api/users');
    //setUsers({users: res.data});
    setUsers(res.data);
    //setUsers(res.data.map({user => user.nombre)})
    //console.log(users)
    setMU('mostrar')
}

const limpiarBusqueda = () => {
    setUsers([]);
    setMU('')
}

return (
        <div className="w3-container w3-panel w3-col m10">
            <div className="w3-container w3-padding w3-card w3-white">
                <div className="w3-panel w3-center">
                    <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                    onClick={componentDidMount}>
                        Mostrar todos los usuarios
                    </button>
                </div>
                {mostrarUsers?
                    <div className="w3-panel w3-right-align">
                        <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={limpiarBusqueda}>
                            Cerrar
                        </button>
                    </div>
                :null}
                {mostrarUsers?
                    <div className="w3-panel w3-responsive" style={Tamano}>
                        <table className="w3-table-all w3-hoverable">
                            <thead>
                                <tr className="w3-indigo">
                                    <th>Documento</th>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(user => (
                                
                                <tr key={user._id}>
                                    <td>{user.documento}</td>
                                    <td>{user.codigo}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.tipo}</td>
                                    <td>{user.activo?'Activo':'Inactivo'}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>                   
                :null}
            </div>
        </div>
    )
}
