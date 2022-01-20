import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'

const espacio = {
    margin: '10px',
}

export function EditarUser() {

    const { user } = useAuth();
    const [mostrarEdit, setME] = useState(false);
    const [mostrardatos, setMD] = useState(false);
    const [nombre, setNombre] = useState('');
    const [postnombre, setPNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [documento, setDoc] = useState('');
    const [postdocumento, setPDoc] = useState('');
    const [celular, setCel] = useState('');
    const [correo, setCorreo] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('Socio');
    const [idFamiliares, setFam] = useState('');

    const limpiarDatos = () => {
        setNombre('');
        setCod('');
        setDoc('');
        setPDoc('');
        setCel('');
        setCorreo('');
        setAct(false);
        setTipo('Socio');
        setFam('');
        setME(false);
        setMD(false);

    }

    const mostrarDatos = async (e) => {
        try {
            const resp = await axios.get('http://localhost:4000/api/users/documento/' + busqueda, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            if ((resp.data.message).length === 1) {
                setNombre(resp.data.message[0].nombre);
                setPNombre(resp.data.message[0].nombre);
                setCod(resp.data.message[0].codigo);
                setDoc(resp.data.message[0].documento);
                setPDoc(resp.data.message[0].documento);
                setCel(resp.data.message[0].celular);
                setAct(resp.data.message[0].activo);
                setTipo(resp.data.message[0].rol);
                setCorreo(resp.data.message[0].email);
                setFam(resp.data.message[0].grupoFamiliar);
                setMD(true);
            }
            else {
                swal({
                    title: "Ninguna coincidencia",
                    text: "Documento inexistente, por favor verifique e intente de nuevo.",
                    icon: "error",
                    buttons: 'cerrar'
                })
                //limpiarDatos();
            }
        } catch (e) {
            //console.log(e.request.response.message)
        }

    }

    const enviarDatos = async e => {
        await axios.put('http://localhost:4000/api/users/documento/' + documento, {
            nombre: postnombre,
            codigo: codigo,
            documento: postdocumento,
            celular: celular,
            activo: activo,
            grupoFamiliar: idFamiliares,
            rol: tipo,
            email: correo
        }, {
            headers: {
                'x-access-token': user.token,
                'Content-Type': 'application/json'
            }
        })
        limpiarDatos();
        swal({
            title: "¡En hora buena!",
            text: "Usuario actualizado.",
            icon: "success",
            buttons: 'cerrar'
        }).then(respuesta => {
            if (respuesta) {

            }
        })
    }

    const deleteUser = async e => {
        const resp = await axios.delete('http://localhost:4000/api/users/documento/' + documento, {
            headers: {
                'x-access-token': user.token,
                'Content-Type': 'application/json'
            }
        });
    }


    const validarVacio = (e) => {
        e.preventDefault()
        if (documento) { enviarDatos() }
        else {
            swal({
                title: 'Ingresar id usuario',
                text: 'Por favor ingrese el número de documento del usuario y de clic en "Editar Usuario".',
                icon: 'warning', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const validarId = (e) => {
        e.preventDefault()
        if (busqueda) { mostrarDatos();setME(false) }
        else {
            swal({
                title: 'Ingresar id usuario',
                text: 'Por favor ingrese el número de documento del usuario y de clic en "Editar Usuario".',
                icon: 'warning', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const mensajeEdit = (e) => {
        e.preventDefault()
        swal("Uupss!", "Campor vacio, por favor ingrese número de documento a buscar", "info");
    }

    const mostrarCampo = (e) => {
        e.preventDefault()
        setME(true);
        setMD(false)
    }

    const eliminarUser = (e) => {
        e.preventDefault();
        swal({
            title: '¿Eliminar Usuario?',
            text: ('Estas a punto de eliminar al usuario con documento: ' + documento + ' , si esta de acuerdo por favor de clic en: "Continuar".'),
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                deleteUser();
                limpiarDatos();
                swal({
                    title: 'Usuario eliminado',
                    text: 'Usuario eliminado.',
                    icon: 'success', //success , warning, info, error
                    buttons: 'Cerrar'
                })

            }

        })
    }

    return (
        <div>
            {/*aquí para pantallas grandes ##############################################################3*/}
            <div style={{ position: 'relative', left: '10%' }} className="w3-container w3-hide-small">
                <div className="w3-container w3-panel w3-col m10">
                    <div className="w3-container w3-padding w3-card w3-white">
                        <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">

                            <div className="w3-col m7 w3-left-align">
                                <p>
                                    <label className="w3-text-indigo"><b>Ingrese el documento del usuario a buscar:</b></label><br></br>
                                    <input className="w3-input w3-border w3-round-large" type="text" required maxLength={30}
                                        onChange={e => setBusqueda(e.target.value)} value={busqueda} />
                                </p>
                            </div>
                            <div className="w3-col m5 w3-right-align">
                                <p>
                                    {busqueda ?
                                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                            onClick={validarId}>Buscar usuario</button>
                                        : <button style={espacio} className="w3-button w3-gray w3-border w3-border-black w3-round-large w3-hover-gray"
                                            onClick={mensajeEdit}>Buscar usuario</button>}
                                    <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={limpiarDatos}>Limpiar y cerrar</button>
                                </p>
                            </div>
                            {mostrardatos ?
                                <div className="w3-container w3-col m12 w3-panel w3-white w3-left-align">
                                    <div className="w3-col m6 w3-panel">
                                        <p>
                                            <label className="w3-text-indigo">Número documento:</label>
                                            <b className="w3-text-indigo">{documento}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Nombre Completo:</label>
                                            <b className="w3-text-indigo">{nombre}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Código Club:</label>
                                            <b className="w3-text-indigo">{codigo}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Roll del usuario:</label>
                                            <b className="w3-text-indigo">{tipo}</b>
                                        </p>
                                    </div>
                                    <div className="w3-col m6 w3-panel">
                                        <p>
                                            <label className="w3-text-indigo">Celular:</label>
                                            <b className="w3-text-indigo">{celular}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Email:</label>
                                            <b className="w3-text-indigo">{correo}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Id Familiar:</label>
                                            <b className="w3-text-indigo">{idFamiliares}</b>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo">Estado:</label>
                                            <b className="w3-text-indigo">{activo ? 'Activo' : 'Inactivo'}</b>
                                        </p>
                                    </div>
                                    <div className="w3-container w3-panel w3-white w3-center">
                                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red"
                                            onClick={mostrarCampo}>
                                            Editar
                                        </button>
                                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                            onClick={e=>setMD(false)}>cerrar</button>
                                    </div>
                                </div>
                                : null}

                        </div>
                        {mostrarEdit ?
                            <form onSubmit={validarVacio}>
                                <div className="w3-col m12 w3-margin-top w3-margin-left w3-center">
                                    <p>
                                        <label className="w3-text-indigo">Número documento: <br></br></label>
                                        <b className="w3-text-indigo"><h3>{documento}</h3></b>
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo">Nombre Completo: <br></br></label>
                                        <b className="w3-text-indigo"><h3>{nombre}</h3></b>
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <div style={{ width: "95%" }}>
                                        <p>
                                            <label className="w3-text-indigo"><b>Nombre.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="text" required
                                                maxLength={50} value={postnombre}
                                                onChange={e => setPNombre(e.target.value)} />
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Documento.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="text" required
                                                maxLength={50} value={postdocumento}
                                                onChange={e => setPDoc(e.target.value)} />
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Código Club.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="text" required
                                                maxLength={20} value={codigo}
                                                onChange={e => setCod(e.target.value)} />
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Celular.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="tel" required
                                                maxLength={15} value={celular}
                                                onChange={e => setCel(e.target.value)} />
                                        </p>

                                    </div>
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <div style={{ width: "95%" }}>
                                        <p>
                                            <label className="w3-text-indigo"><b>Email.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="email" required
                                                maxLength={50} value={correo}
                                                onChange={e => setCorreo(e.target.value)} />
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Id Familiar.</b></label>
                                            <input className="w3-input w3-border w3-round-large" type="text" required
                                                maxLength={20} value={idFamiliares}
                                                onChange={e => setFam(e.target.value)} />
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Seleccione que propiedad dará al usuario.</b></label>
                                            <select className="w3-select w3-border w3-round-large" name="option"
                                                onChange={e => setTipo(e.target.value)}>
                                                <option defaultValue={tipo}>{tipo}</option>
                                                <option value={"Administrador"}>Administrativo</option>
                                                <option value={"Profesor"}>Profesor</option>
                                                <option value={"Canchero"}>Canchero</option>
                                                <option value={"Socio"}>Socio</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label className="w3-text-indigo"><b>Activar o desactivar usuario.</b></label>
                                            <select className="w3-select w3-border w3-round-large" name="option"
                                                onChange={e => setAct(e.target.value)}>
                                                <option defaultValue={activo}>{activo ? 'Activo' : 'Inactivo'}</option>
                                                <option value={true}>Activar</option>
                                                <option value={false}>Desactivar</option>
                                            </select>
                                        </p>
                                    </div>

                                </div>
                                <div className="w3-col w3-center">
                                    <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                        Actualizar Usuario
                                    </button>
                                    <button style={espacio} className="w3-button w3-metro-red w3-border w3-border-black w3-round-large w3-hover-red"
                                        onClick={eliminarUser}>
                                        Eliminar Usuario
                                    </button>
                                </div>
                                <div className="w3-col w3-center w3-panel">
                                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => {setME(false);mostrarDatos()}}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                            : null}
                    </div>
                </div>
            </div>
            {/*aquí para pantallas pequeñas ##############################################################3*/}
            <div className="w3-hide-large w3-hide-medium">

            </div>
        </div>
    )
}