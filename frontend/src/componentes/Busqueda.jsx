import React, { useState } from 'react'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from 'sweetalert';
import { EditarUser } from './EditarUser';
import { MenuAdmin } from './MenuAdmin';

const Tamano = {
    //width:'200px',
    height: '275px',
    overFlow: 'auto'
}
var res = [];

export function Busqueda() {

    const [users, setUsers] = useState([]);
    const [mostrarUsers, setMU] = useState(false);
    const [copiado, setCopiado] = useState(false);
    const [roll, setRoll] = useState('0');
    const [activo, setActivo] = useState('0');


    const traerDatos = async () => {
        res = await axios.get('http://localhost:4000/api/users');
        if (roll === '0') {
            setUsers(res.data)
            if (activo === '1') { setUsers(res.data.filter(user => user.activo === true)) }
            if (activo === '2') { setUsers(res.data.filter(user => user.activo === false)) }
        }
        if (roll === '1') {
            setUsers(res.data.filter(user => user.tipo === 'Administrador'));
            if (activo === '1') { setUsers(res.data.filter(user => user.tipo === 'Administrador' && user.activo === true)) }
            if (activo === '2') { setUsers(res.data.filter(user => user.tipo === 'Administrador' && user.activo === false)) }
        }
        if (roll === '2') {
            setUsers(res.data.filter(user => user.tipo === 'Profesor'));
            if (activo === '1') { setUsers(res.data.filter(user => user.tipo === 'Profesor' && user.activo === true)) }
            if (activo === '2') { setUsers(res.data.filter(user => user.tipo === 'Profesor' && user.activo === false)) }
        }
        if (roll === '3') {
            setUsers(res.data.filter(user => user.tipo === 'Canchero'));
            if (activo === '1') { setUsers(res.data.filter(user => user.tipo === 'Canchero' && user.activo === true)) }
            if (activo === '2') { setUsers(res.data.filter(user => user.tipo === 'Canchero' && user.activo === false)) }
        }
        if (roll === '4') {
            setUsers(res.data.filter(user => user.tipo === 'Socio'));
            if (activo === '1') { setUsers(res.data.filter(user => user.tipo === 'Socio' && user.activo === true)) }
            if (activo === '2') { setUsers(res.data.filter(user => user.tipo === 'Socio' && user.activo === false)) }
        }
        setMU(true)
    }

    const limpiarBusqueda = () => {
        setUsers([]);
        setMU(false)
    }

    const mostrarMensaje = () => {
        swal({
            title: 'Copiado en Portapapeles',
            text: 'Documento copiado en portapapeles',
            icon: 'success',
            timer: '2500'
        })
        setCopiado(false);
    };

    return (
        <>
            <MenuAdmin/>
            {/*aquí para pantallas grandes ##############################################################3*/}
            <div style={{ position: 'relative', left: '10%' }} className="w3-container w3-hide-small">
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
                                onChange={e => setRoll(e.target.value)}>
                                <option value={'0'}>Todos</option>
                                <option value={'1'}>Administrador</option>
                                <option value={'2'}>Profesor</option>
                                <option value={'3'}>Canchero</option>
                                <option value={'4'}>Socio</option>
                            </select>
                        </div>
                        <div className="w3-panel w3-padding w3-col m6">
                            <label className="w3-text-indigo"><b>Activo o inactivo.</b></label>
                            <select className="w3-select w3-hover-light-gray" name="option"
                                onChange={e => setActivo(e.target.value)}>
                                <option value={'0'}>Todo</option>
                                <option value={'1'}>Activo</option>
                                <option value={'2'}>Inactivo</option>
                            </select>
                        </div>
                        <div id="output" className="w3-panel w3-center">
                            <button type='submit' className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={traerDatos} title="Doble clíck para traer y mostrar resultados">
                                Mostrar
                            </button>
                        </div>
                        {mostrarUsers ?
                            <div className="w3-panel w3-right-align">
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarBusqueda}>
                                    Cerrar
                                </button>
                                <div className="w3-left-align">
                                    <label className="w3-text-indigo">
                                        Se encontraron en total <b>{users.length}</b> usuarios según su criterio de búsqueda.
                                    </label>
                                </div>
                            </div>
                            : null}
                        {mostrarUsers ?
                            <div className="w3-panel w3-responsive" style={Tamano}>

                                <table className="w3-table-all w3-hoverable">
                                    <thead>
                                        <tr className="w3-indigo">
                                            <th>Documento</th>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Roll</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(user => (
                                                <CopyToClipboard text={user.documento}
                                                    onCopy={() => setCopiado(true)} key={user._id} >
                                                    <tr key={user.documento} title="Da Clic para copiar número de documento en portapapeles">
                                                        <td>{user.documento}</td>
                                                        <td>{user.codigo}</td>
                                                        <td>{user.nombre}</td>
                                                        <td>{user.tipo}</td>
                                                        <td>{user.activo ? 'Activo' : 'Inactivo'}</td>
                                                    </tr>
                                                </CopyToClipboard>
                                            ))}
                                    </tbody>
                                </table>
                                {copiado ? mostrarMensaje() : null}
                            </div>
                            : null}
                    </div>
                </div>
            </div>
            <EditarUser/>
            {/*aquí para pantallas pequeñas ##############################################################3*/}
            <div className="w3-hide-large w3-hide-medium">

            </div>
        </>
    )
}
