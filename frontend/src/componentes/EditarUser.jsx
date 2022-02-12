import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import perfil from '../imagenes/perfil.png';
import rutas from '../helpers/rutas';

//componente para editar ususarios con privilegios de administrador

const espacio = {
    margin: '10px',
}

export function EditarUser({ docum }) {

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
    const [imagen, setimagen] = useState(null);
    const [imagenmostrar, setimagenmostrar] = useState(null);
    const [envio, setenvio] = useState(false);

    useEffect(() => {
        setBusqueda(docum);
        setMD(false);
    }, [docum])

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    useEffect(() => {
        if (!imagen) { setimagenmostrar(perfil) }
        else { setimagenmostrar(imagen) }
    }, [imagen])

    const limpiarDatos = () => {
        setNombre('');
        setPNombre('');
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
        setimagen(null)

    }

    const mostrarDatos = async (e) => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/users/documento/' + busqueda, {
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
                setTipo(resp.data.message[0].rol[0].name);
                setCorreo(resp.data.message[0].email);
                setFam(resp.data.message[0].grupoFamiliar);
                setimagen(resp.data.message[0].imagen);
                setMD(true);
                setenvio(false);
            }
            else {
                setenvio(false);
                swal({
                    title: "Ninguna coincidencia",
                    text: "No se encontro documento, por favor verifique e intente de nuevo.",
                    icon: "error",
                    buttons: 'cerrar'
                })
                //limpiarDatos();
            }
        } catch (e) {
            setenvio(false);
            swal('Upsss', 'Lo sentimos, no pudimos procesar tú solicitud, vuelve a intentarlo', 'info')
            //console.log(e.request.response.message)
        }

    }

    const enviarDatos = async e => {
        setenvio(true);
        try {
            await axios.put(rutas.server + 'api/users/documento/' + documento, {
                nombre: postnombre,
                codigo: codigo,
                documento: postdocumento,
                celular: celular,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: tipo,
                imagen: imagen,
                email: correo
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false);
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
        catch {
            setenvio(false);
            swal('Upsss', 'Lo sentimos, al parecer ocurrio un error durante la transacción, por favor vuelve a intertarlo', 'error')
        }
    }

    const deleteUser = async e => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/users/documento/' + documento, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false);
            swal("Usuario Eliminado", "Usuario eliminado", "success")
        }
        catch {
            setenvio(false);
            swal("Fallo en transacción", "Ocurrio un inconveniente durante el proceso, por favor intenta de nuevo", "success")
        }
    }


    const validarVacio = (e) => {
        e.preventDefault()
        if (documento) {
            swal({
                title: '¿Actualizar datos?',
                text: ('Estas a punto de modificar uno o más de tus datos, si estas seguro de tu operación da clic en "Continuar".'),
                icon: 'info', //success , warning, info, error
                buttons: ['Cancelar', 'Continuar'],
            }).then(respuesta => {
                if (respuesta) {
                    enviarDatos()
                }
            })
        }
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
        if (busqueda) { mostrarDatos(); setME(false) }
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
        swal("Uupss!", "Campor vacio, por favor ingrese número de documento a buscar o da en clic en alguno de los usuarios de la busqueda filtrada", "info");
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
            }

        })
    }

    const deleteImage = () => {
        swal({
            title: '¿Eliminar imagen?',
            text: ('Estas a punto de eliminar tu foto de perfil, si estas de acuerdo da en "Continuar".'),
            icon: 'warning',
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                //Aqui va la funcion para actualizar imagen (misma funcion que cambia, solo que aqui se envia un null)
                setimagen(null);
            }
        })
    }

    const subirImagen = (e) => {
        const [file] = e.target.files;
        if (file) {
            const validateSize = file.size < 2 * 1024 * 1024;
            const extencionName = /.(jpe?g|gif|png|jfif)$/i;
            const validateExtention = extencionName.test(file.name)
            if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); return }
            if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); return }
            if (validateSize && validateExtention) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setimagen(reader.result);
                    // Aqui va la funcion para actualizar imagen
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const nombreAMay = (n) => {
        if (n === '') { setPNombre(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setPNombre(nombreCompleto.join(' '));
    }

    return (
        <>
            <div id="id02" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <h3>Por favor espera un momento</h3>
                        Estamos trabajando en tu solicitud.
                    </header>
                    <div className="w3-container w3-panel w3-center">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="4s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="1.8s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" /><br></br>
                        <ProgressBar mode="indeterminate" style={{ height: '8px' }} />
                    </div>
                </div>
            </div>
            <div>
                <div className="w3-container w3-panel w3-col m10 w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                        <div className="w3-col m7 w3-left-align">
                            <p>
                                <label className="w3-text-indigo"><b>Ingrese el documento del usuario a buscar:</b></label><br></br>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength={30} title='puedes buscar en "Mostrar todos los usuarios" y filtrar'
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
                                {mostrardatos ? <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarDatos}>Cerrar</button>
                                    : null}
                            </p>
                        </div>
                        {mostrardatos ?
                            <div className="w3-container w3-col w3-panel w3-white w3-left-align">
                                <div style={{ marginTop: '50px' }} className="w3-container w3-center">
                                    <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                </div>
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
                                        onClick={e => setMD(false)}>cerrar</button>
                                </div>
                            </div>
                            : null}
                    </div>
                    {mostrarEdit ?
                        <form onSubmit={validarVacio}>
                            <div className="w3-margin-top w3-center">
                                <p>
                                    <label className="w3-text-indigo">Nombre Completo:</label>
                                    <b className="w3-text-indigo" style={{ marginLeft: '10px', fontSize: '20px' }}>{nombre}</b>
                                </p>
                                <p>
                                    <label className="w3-text-indigo">Número documento:</label>
                                    <b className="w3-text-indigo" style={{ marginLeft: '10px', fontSize: '20px' }}>{documento}</b>
                                </p>
                                <div className="w3-container w3-center">
                                    <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                    <div className="w3-container w3-center">
                                        <label style={{ cursor: 'pointer' }}>
                                            <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif"
                                                onChange={subirImagen} />
                                            <span className="material-icons-round">
                                                mode_edit
                                            </span>
                                        </label>
                                        <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={deleteImage}>
                                            delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-col m6 w3-panel">                                
                                    <p>
                                        <label className="w3-text-indigo"><b>Nombre.</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={postnombre}
                                            onChange={e => nombreAMay(e.target.value)} />
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
                            <div className="w3-col m6 w3-panel">
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
                                        <label className="w3-text-indigo"><b>Seleccione roll para este usuario.</b></label>
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
                                    onClick={e => { setME(false); setMD(true) }}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        : null}
                </div>
            </div>
        </>
    )
}