import React, {useState} from 'react'
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import swal from 'sweetalert';

const Tamano = {
    //width:'200px',
    height:'275px',
    overFlow:'auto'
    }

export function Busqueda() {
    
const [users, setUsers] = useState([]);
const [mostrarUsers, setMU] = useState('');
const [copiado, setCopiado] = useState(false);
const [roll, setRoll] = useState('5');
const [activo, setActivo] = useState('3');


const componentDidMount = async (e) => {
    const res = await axios.get('http://localhost:4000/api/users');
    setUsers(res.data);
    setUsers(res.data.filter(user => user.activo===false))
    console.log(users)
    setMU('mostrar')
}

const limpiarBusqueda = () => {
    setUsers([]);
    setMU('')
}



const mostrarMensaje = () => {
    swal({
        title:'Copiado en Portapapeles',
        text:'Documento copiado en portapapeles',
        icon:'success', 
        timer: '1100' 
    })
    setCopiado(false);
};



return (
        <div className="w3-container w3-panel w3-col m10">
            <div className="w3-container w3-padding w3-card w3-white">
                
                    <div className="w3-panel w3-center">
                        <h3 className="w3-text-indigo">
                            <b>Mostrar todos los usuarios</b>
                        </h3>
                    </div>
                    <div className="w3-panel w3-padding w3-col m6">
                        <label className="w3-text-indigo"><b>Roll.</b></label>
                        <select className="w3-select w3-hover-light-gray" name="option"
                        onChange={e=>setRoll(e.target.value)}>
                            <option value={'5'}>Todos</option>
                            <option value={'1'}>Administrador</option>
                            <option value={'2'}>Profesor</option>
                            <option value={'3'}>Canchero</option>
                            <option value={'4'}>Socio</option>
                        </select>
                        {roll}
                    </div>
                    <div className="w3-panel w3-padding w3-col m6">
                        <label className="w3-text-indigo"><b>Activo o inactivo.</b></label>
                        <select className="w3-select w3-hover-light-gray" name="option"
                        onChange={e=>setActivo(e.target.value)}>
                            <option value={'3'}>Todo</option>
                            <option value={'1'}>Activo</option>
                            <option value={'2'}>Inactivo</option>
                        </select>
                    </div>
                    <div className="w3-panel w3-center">
                        <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={componentDidMount}>
                            Mostrar
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
                                <CopyToClipboard text={user.documento}
                                onCopy={() => setCopiado(true)}>
                                    <tr key={user._id} title="Da Clíck para copiar número de documento en portapapeles">
                                        <td>{user.documento}</td>
                                        <td>{user.codigo}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.tipo}</td>
                                        <td>{user.activo?'Activo':'Inactivo'}</td>
                                    </tr>
                                </CopyToClipboard>
                                ))}
                            </tbody>
                        </table>
                        {copiado?mostrarMensaje():null}
                    </div>
                :null}
            </div>
        </div>
    )
}
