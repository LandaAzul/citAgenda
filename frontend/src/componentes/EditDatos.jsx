import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import perfil from '../imagenes/perfil.png';
import { Password } from 'primereact/password';

//Componente para editar datos de los usuarios sin atributos de administrador

const espacio = {
    margin: '10px',
}

export function EditDatos() {

    const resetBoton = useRef(null);
    const { user, logout } = useAuth();
    const [mostrarEdit, setME] = useState(false);
    const [nombre, setNombre] = useState('');
    const [postnombre, setPNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [postdocumento, setPDoc] = useState('');
    const [celular, setCel] = useState('');
    const [correo, setCorreo] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('');
    const [idFamiliares, setFam] = useState('');
    const [imagen, setimagen] = useState(null);
    const [preimagen, setpreimagen] = useState(null);
    const [namefile, setnamefile] = useState('');
    const [imagenmostrar, setimagenmostrar] = useState(null);
    const [mostrar, setmostrar] = useState(true);
    const [envio, setenvio] = useState(false);
    const [contra, setContra] = useState('');
    const [newpass, setnewpass] = useState('');
    const [newpass2, setnewpass2] = useState('');

    const limpiarDatos = () => {
        setNombre('');
        setPNombre('');
        setCod('');
        setDoc('');
        setPDoc('');
        setCel('');
        setCorreo('');
        setAct(false);
        setTipo('');
        setFam('');
        setME(false);
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    useEffect(() => {
        if (!imagen || imagen === 'null') { setimagenmostrar(perfil) }
        else { setimagenmostrar(imagen) }
    }, [imagen])


    const enviarDatos = async e => {
        setenvio(true);
        try {
            await axios.put(rutas.server + 'api/users/cambiarDatos/' + user.id, {
                nombre: postnombre,
                codigo: codigo,
                documento: postdocumento,
                celular: celular,
                grupoFamiliar: idFamiliares,
                email: correo
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false);
            limpiarDatos();
            setmostrar(true);
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
        catch (e) {
            setenvio(false);
            console.log(e.request.response)
            swal('Upss', 'Por alguna razón no pudimos completar tu solicitud, por favor intenta de nuevo', 'info');
        }
    }

    const deleteUser = async e => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/users/' + user.id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false);
            swal("Usuario Eliminado", "Usuario eliminado", "success")
            logout();
        }
        catch {
            setenvio(false);
            swal("Fallo en transacción", "Ocurrio un inconveniente durante el proceso, por favor intente de nuevo", "success")
        }
    }


    const validarVacio = (e) => {
        e.preventDefault();
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

    useEffect(() => {
        let ignore = false
        const mostrarDatos = async (e) => {
            setenvio(true);
            try {
                const resp = await axios.get(rutas.server + 'api/users/' + user.id, {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!ignore) {
                    setNombre(resp.data.message.nombre);
                    setPNombre(resp.data.message.nombre);
                    setCod(resp.data.message.codigo);
                    setDoc(resp.data.message.documento);
                    setPDoc(resp.data.message.documento);
                    setCel(resp.data.message.celular);
                    setAct(resp.data.message.activo);
                    setTipo(resp.data.message.rol[0].name);
                    setCorreo(resp.data.message.email);
                    setFam(resp.data.message.grupoFamiliar);
                    setimagen(resp.data.message.imagen);
                    setenvio(false);
                }
            } catch (e) {
                if (!ignore) {
                    setenvio(false);
                    swal('Upsss...', 'Al parecer ocurrio un error durante la petición de los datos, intentalo de nuevo.', 'warning');
                }
            }
        }
        mostrarDatos();
        return () => { ignore = true };
    }, [user.id, user.token, mostrarEdit])

    const mostrarCampo = (e) => {
        e.preventDefault()
        setME(true);
        setmostrar(false);
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

    // Bloque con todo lo relacionado con imagenes de usuario.....
    const subirImagen = (e) => {
        const [file] = e.target.files;
        if (file) {
            const validateSize = file.size < 2 * 1024 * 1024;
            const extencionName = /.(jpe?g|gif|png|jfif)$/i;
            const validateExtention = extencionName.test(file.name)
            if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); return }
            if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); return }
            if (validateSize && validateExtention) {
                document.getElementById('id01').style.display = 'block';
                const reader = new FileReader();
                reader.onloadend = () => {
                    setnamefile(file.name);
                    setimagen(file);
                    setpreimagen(reader.result);
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const cambioImagen = async () => {
        setenvio(true)
        let file = new FormData()
        file.append('imagen', imagen)
        try {
            await axios.put(rutas.server + 'api/users/cambiarImagen/' + user.id, file,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            document.getElementById('id01').style.display = 'none';
            swal('Listo', 'Hemos actualizado tu foto de perfil', 'success')
            recargarImagen();
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
            limpiarBoton()
        }
    }

    const borrarImagen = async () => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/users/cambiarImagen/' + user.id,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            swal('Listo', 'Hemos eliminado tu foto de perfil', 'success')
            recargarImagen();
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
        }
    }

    const deleteImage = () => {
        swal({
            title: '¿Eliminar imagen?',
            text: ('Estas a punto de eliminar tu foto de perfil, si estas de acuerdo da clic en "Continuar".'),
            icon: 'warning',
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                setimagen(null);
                setpreimagen(null);
                setnamefile('');
                borrarImagen();
            }
        })
    }

    const recargarImagen = async () => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/users/' + user.id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setimagen(resp.data.message.imagen);
            setenvio(false);
        } catch {
            setenvio(false);
        }
    }

    const limpiarBoton = () => {
        resetBoton.current.value = '';
        setimagen(null);
        setpreimagen(null);
        setnamefile('');
        recargarImagen();
        document.getElementById('id01').style.display = 'none';
    }

    //Bloque para validar y actualizar contraseñas ......
    const validarContra = e => {
        if (newpass.length >= 8) {
            if (newpass === newpass2) {
                actualizarContra()
            }
            else {
                swal('Upss', 'Las contraseñas deben coincidir, por favor verifica e intenta nuevamente', 'warning')
                return;
            }
        }
        else { swal("Stop!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning"); }
    }

    const actualizarContra = async () => {
        setenvio(true);
        try {
            await axios.put(rutas.server + 'api/users/cambiarContra/' + user.id, {
                contraAntigua: contra,
                contraNueva: newpass
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false);
            setContra('');
            setnewpass('');
            setnewpass2('');
            swal('Proceso exitoso', 'Se actualizo tu contraseña.', 'info');
        }
        catch (e) {
            setenvio(false);
            let resp = JSON.parse(e.request.response).message
            swal('Upsss!!!', 'Algo no salio bien, ' + resp + ' por favor intenta de nuevo.', 'error');
        }
    }

    //Bolque para capitalizar nombre de usuario .......
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
            <div id="id01" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4">
                    <header className="w3-container w3-indigo w3-center">
                        <span onClick={limpiarBoton}
                            className="w3-button w3-display-topright">&times;
                        </span>
                        <h3>{namefile}</h3>
                    </header>
                    <div className="w3-panel w3-padding w3-center">
                        <img src={preimagen} alt="previsualización" className="w3-circle" style={{ width: "100%", maxWidth: "400px" }} />
                    </div>
                    <div className='w3-panel w3-padding w3-center'>
                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={cambioImagen}>
                            Actualizar imagen
                        </button>
                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={limpiarBoton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <div className='componentes'>
                {mostrar ?
                    <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        <div className="w3-container w3-right-align w3-text-indigo">
                            <Link to={rutas.home}>
                                <b >&times;</b>
                            </Link>
                        </div>
                        <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                            <div className="w3-container w3-col m12 w3-panel w3-white w3-left-align">
                                <div style={{ marginTop: '50px' }} className="w3-container w3-center">
                                    <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label className="w3-text-indigo">Nombre:</label>
                                        <b className="w3-text-indigo">{nombre}</b>
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo">Documento:</label>
                                        <b className="w3-text-indigo">{documento}</b>
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo">Código:</label>
                                        <b className="w3-text-indigo">{codigo}</b>
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo">Roll del usuario:</label>
                                        <b className="w3-text-indigo">{tipo}</b>
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label className="w3-text-indigo">Celular/Teléfono:</label>
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
                                    <Link to={rutas.home}>
                                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                            cerrar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
                {mostrarEdit ?
                    <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        <div>
                            <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                                <h2 className='w3-center w3-text-indigo'><b>{nombre}<br></br>{documento}</b></h2>
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => { setME(false); setmostrar(true) }}>
                                    Cancelar
                                </button>
                            </div>
                            <div className="w3-container w3-padding w3-center">
                                <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                <div className="w3-container w3-center">
                                    <label style={{ cursor: 'pointer' }}>
                                        <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif"
                                            onChange={subirImagen} ref={resetBoton} />
                                        <span className="material-icons-round">
                                            mode_edit
                                        </span>
                                    </label>
                                    <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={deleteImage}>
                                        delete
                                    </span>
                                </div>
                            </div>
                            <form onSubmit={validarVacio}>
                                <div style={{ maxWidth: '400px', margin: 'auto' }} >
                                    <p>
                                        <label className="w3-text-indigo"><b>Nombre:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={postnombre}
                                            onChange={e => nombreAMay(e.target.value)} />
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo"><b>Documento:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={postdocumento}
                                            onChange={e => setPDoc(e.target.value)} />
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo"><b>Código Club:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={20} value={codigo}
                                            onChange={e => setCod(e.target.value)} />
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo"><b>Celular/Teléfono:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel" required
                                            maxLength={15} value={celular}
                                            onChange={e => setCel(e.target.value)} />
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo"><b>Email:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="email" required
                                            maxLength={50} value={correo}
                                            onChange={e => setCorreo(e.target.value)} />
                                    </p>
                                    <p>
                                        <label className="w3-text-indigo"><b>Id Familiar:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={20} value={idFamiliares}
                                            onChange={e => setFam(e.target.value)} />
                                    </p>
                                </div>
                                <div className="w3-center">
                                    <button type='onsubmit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                        Actualizar Usuario
                                    </button>
                                    <button style={espacio} className="w3-button w3-metro-red w3-border w3-border-black w3-round-large w3-hover-red"
                                        onClick={eliminarUser}>
                                        Eliminar Usuario
                                    </button>
                                </div>
                                <div className="w3-center w3-panel">
                                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { setME(false); setmostrar(true) }}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div style={{ marginBottom: '50px' }} className='w3-center'>
                            <h3 className='w3-text-indigo'><b>Cambiar contraseña.</b></h3>
                            <div className='w3-col m6'>
                                <label className="w3-text-indigo"><b>Nueva Contraseña:</b></label><br></br>
                                <Password value={newpass} onChange={(e) => setnewpass(e.target.value)} toggleMask feedback={false} /><br></br>
                                <label className="w3-text-indigo"><b>Confirme nueva contraseña:</b></label><br></br>
                                <Password value={newpass2} onChange={(e) => setnewpass2(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" /><br></br>
                            </div>
                            <div>
                                <label className="w3-text-indigo"><b>Contraseña actual:</b></label><br></br>
                                <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask feedback={false} /><br></br>
                                <button className="w3-button w3-margin w3-indigo w3-border w3-border-black w3-round-large w3-hover-red "
                                    onClick={validarContra}>
                                    Actualizar Contraseña
                                </button>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}