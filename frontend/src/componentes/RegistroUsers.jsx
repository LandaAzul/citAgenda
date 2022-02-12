import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import rutas from '../helpers/rutas';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css'
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

const espacio = {
    margin: '10px',
}

export function RegistroUsers() {

    function resizeListener() {
        if (window.innerWidth > 600) {
            document.getElementById('id03').style.position = 'relative';
            document.getElementById('id03').style.left = '8%';
        }
        else {
            document.getElementById('id03').style.position = '';
            document.getElementById('id03').style.left = '';
        }
    }
    window.addEventListener("resize", resizeListener);

    const [nombre, setNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [celular, setCel] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [activo, setAct] = useState(false);
    const [rol, setRol] = useState('Socio');
    const [idFamiliares, setFam] = useState('');
    const [imagen, setimagen] = useState(null);
    const [namefile, setnamefile] = useState('');
    const [envio, setenvio] = useState(false);

    const limpiarDatos = () => {

        setNombre('');
        setCod('');
        setDoc('');
        setCel('');
        setCorreo('');
        setContra('');
        setContra2('');
        setAct(false);
        setRol('Socio');
        setFam('');
        setimagen(null);
        setnamefile('');
    }

    const enviarDatos = async (e) => {
        setenvio(true);
        try {
            await axios.post(rutas.server + 'api/auth/signUp', {
                nombre: nombre,
                codigo: codigo,
                documento: documento,
                celular: celular,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: rol,
                contra: contra,
                email: correo,
                imagen: imagen
            })
            setenvio(false);
            limpiarDatos();
            swal({
                title: "En hora buena!",
                text: "Has sido registrado, por favor inicia sesión. Recuerda que el administrador deberá habilitar y dar tú respectivo roll",
                icon: "success",
                buttons: "Ok"
            })
        } catch (e) {
            setenvio(false);
            let respuesta = JSON.parse(e.request.response).message;
            swal({
                title: "Datos ya existentes!",
                text: ('Por favor revisa los datos ingresados, ' + respuesta),
                icon: "warning",
                buttons: 'cerrar'
            })
        }

    };

    const mostrarAlerta = () => {
        swal({
            title: 'Error en contraseñas',
            text: 'las contraseñas deben coincidir',
            icon: 'warning', //success , warning, info, error
            buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
            timer: '' //tiempo en milisegundos
        })
    };



    const validarContra = e => {
        e.preventDefault()
        if (contra.length >= 8) {
            if (contra === contra2) {
                enviarDatos()
            }
            else {
                mostrarAlerta();
                return;
            }
        }
        else { swal("Stop!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning"); }
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
                    setnamefile(file.name);
                    setimagen(reader.result);
                }
                reader.readAsDataURL(file)
            }
        }
    }


    // funcion para cerrar el modal fuera del cuadro
    var modal = document.getElementById('id01');
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    const nombreAMay = (n) => {
        if (n === '') { setNombre(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setNombre(nombreCompleto.join(' '));
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
            <div id='id03' style={{ position: 'relative', left: '8%' }}>
                <div className="w3-container w3-panel w3-col m10">
                    <div className="w3-container w3-padding w3-card w3-white">
                        <form onSubmit={validarContra}>
                            <div className="w3-col m6 w3-panel">
                                <p>
                                    <label className="w3-text-indigo"><b>Nombre Completo.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={50} value={nombre}
                                        onChange={e => nombreAMay(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Número documento.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={20} value={documento}
                                        onChange={e => setDoc(e.target.value)} />
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
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={20} value={idFamiliares}
                                        onChange={e => setFam(e.target.value)} />
                                </p>
                                <div className='w3-margin-bottom'>
                                    <label className="w3-text-indigo"><b>Contraseña.</b></label><br></br>
                                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask feedback={false} />
                                </div>
                                <div>
                                    <label className="w3-text-indigo"><b>Confirme contraseña.</b></label><br></br>
                                    <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" />
                                </div>
                            </div>
                            <div className="w3-col m12">
                                <div className="w3-col m5 w3-margin-left w3-center">
                                    <div className="w3-margin-left w3-center w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                        <label style={{ cursor: "pointer" }}>
                                            {namefile ? <b>Elegir otra imagen...</b>
                                                : <b>Agregar imagen...</b>}
                                            <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif"
                                                onChange={subirImagen} />
                                            <span className="material-icons-round">
                                                image
                                            </span>
                                        </label>

                                    </div>
                                    <div>
                                        {namefile}<br></br>
                                        {imagen ? <span style={{ cursor: "pointer" }} className="material-icons-round" onClick={e => document.getElementById('id01').style.display = 'block'} >
                                            visibility
                                        </span>
                                            : null}
                                    </div>
                                </div>
                                <div id="id01" className="w3-modal">
                                    <div className="w3-modal-content w3-animate-opacity w3-card-4">
                                        <header className="w3-container w3-indigo w3-center">
                                            <span onClick={e => document.getElementById('id01').style.display = 'none'}
                                                className="w3-button w3-display-topright">&times;</span>
                                            <h3>{namefile}</h3>
                                        </header>
                                        <div className="w3-container w3-center">
                                            <img src={imagen} alt="previsualización" className="w3-circle" style={{ width: "100%", maxWidth: "400px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-col w3-panel w3-center">
                                <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                    Registrar
                                </button>
                                <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarDatos}>
                                    Limpiar
                                </button>
                            </div>
                        </form>
                        <div className='w3-center w3-padding'>
                            <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={limpiarDatos}>
                                <Link to={rutas.home}>
                                    volver
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}