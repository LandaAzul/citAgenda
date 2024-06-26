import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import { Link, Outlet } from 'react-router-dom'
import { Encabezado } from './Encabezado';
import { TextoInformativo } from './TextoInformativo';
import axios from 'axios';
import rutas from '../helpers/rutas';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import ReCAPTCHA from 'react-google-recaptcha';

const espacio = {
    margin: '10px',
}

const Texto = {
    paddingTop: '5px',
    paddingBottom: '8px'
}

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        height: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '10px 5px 5px black',
        padding: '20px 26px 24px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    textfield: {
        width: '100%'
    },

    container: {
        position: 'absolute',
        textAlign: 'center'
    },

}))

var Correo = '';

export function MenuInicio() {

    const captcha = useRef(null);
    const { login } = useAuth();
    const styles = useStyles();
    const [modal, setModal] = useState(false);
    const [Email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [guardarDatos, setGD] = useState(false);
    const [envio, setenvio] = useState(false);
    const [captchavalido, setcaptchavalido] = useState(false);
    const [mostrarencaptcha, setmostrarencaptcha] = useState(false);

    const Limpiar = () => {
        setEmail('');
        setContra('');
        setcaptchavalido(false);
        setmostrarencaptcha(false);
        captcha.current.reset();
    }

    const abrirCerrarModal = () => {
        setModal(!modal);
        Limpiar();
    }

    const OlvideContra = () => {
        if (!captchavalido) { setmostrarencaptcha(true); return }
        if (Email !== '') {
            enviarCorreo();
        }
        else {
            swal({
                title: "Ingrese su correo eletrónico",
                text: 'Campo "Correo electrónico" vacío, por favor ingresa el correo electrónico registrado.',
                icon: "warning",
                button: "de acuerdo"
            })
        }

    }

    const validarCampos = (e) => {
        if (Email === '') return swal("Uupss!", "Campor Correo vacio, por favor ingrese su email", "info");
        if (contra === '') return swal("Uupss!", "Campor Contraseña vacio, por favor ingrese una contraseña", "info");
        let validacion = window.localStorage.getItem('login');
        let contador = 1;
        if (validacion) {
            const datosGuardados = JSON.parse(validacion);
            if (datosGuardados.Email === Email) {
                contador = datosGuardados.contador + 1;
                window.localStorage.setItem('login', JSON.stringify({ Email, contador }))
            }
            if (contador === 5) {
                // aquí va la funcion para enviar correo de recuperación de contraseña
                return swal("Lo notamos", ('Estamos observando que no has podido ingresar, para ayudarte hemos enviado un mensaje de recuperación de contraseña a:  "' + Email + '".'), "info");
            }
        }
        window.localStorage.setItem('login', JSON.stringify({ Email, contador }))
        enviarLogin();
    }

    const guardarCredenciales = () => {
        let encrypted = btoa(contra);
        if (guardarDatos) { window.localStorage.setItem('memo', JSON.stringify({ Email, encrypted, guardarDatos })) }
        if (!guardarDatos) { window.localStorage.removeItem('memo'); }
    }

    useEffect(() => {
        let valores = window.localStorage.getItem('memo');
        if (valores) {
            const datos = JSON.parse(valores);
            setGD(datos.guardarDatos);
            setEmail(datos.Email);
            let desencrypted = atob(datos.encrypted)
            setContra(desencrypted);
        }
    }, [modal])


    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    const enviarLogin = async () => {
        let userCredentials = '';
        try {
            userCredentials = await axios.post(rutas.server + 'api/auth/signIn', {
                email: Email,
                contra: contra
            })
            window.localStorage.removeItem('login');
            guardarCredenciales();
            login(userCredentials);
        } catch (e) {
            //let respuesta = JSON.parse(e.request.response).message;
            swal({
                title: "Error al ingresar!",
                //text: ('Por favor revisa los datos ingresados, ' + respuesta),
                text: "Por favor revisa los datos ingresados, credenciales no validas.",
                icon: "error",
                buttons: 'cerrar'
            });
        }
    };


    const enviarCorreo = async () => {
        modal2.style.display = "none";
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/auth/forgot-password', {
                email: Email
            })
            setenvio(false)
            Limpiar();
            //modal2.style.display = "none";
            swal({
                title: "¡Listo!",
                text: ('Mensaje de recuperación de contraseña enviado a "' + Correo + '".'),
                icon: "success",
                buttons: "cerrar",
                timer: "3000"
            })
        } catch (e) {
            setenvio(false)
            if (e.request.status === 0) {
                swal('Upss', 'Al parecer algo no salio bien, por favor vuelve a intentarlo.', 'error')
                modal2.style.display = "block";
                return;
            }
            //let respuesta = JSON.parse(e.request.response).message;  
            swal({
                title: "¡Listo!",
                text: ('Mensaje de recuperación de contraseña enviado a "' + Correo + '".'),
                icon: "success",
                buttons: "cerrar",
                timer: "3000"
            })
        }

    };

    // funcion para cerrar el modal fuera del cuadro
    var modal2 = document.getElementById('id03');
    window.onclick = function (event) {
        if (event.target === modal2) {
            modal2.style.display = "none";
            abrirCerrarModal();
        }
    }

    const onChange = () => {
        if (captcha.current.getValue()) { setcaptchavalido(true); setmostrarencaptcha(false) }
        else { setcaptchavalido(false) }
    }

    const body = (
        <div className={styles.modal}>
            <div align="right">
                <label style={{ fontSize: '10px' }} className="w3-button w3-border w3-border-black w3-round-large w3-hover-red"
                    onClick={abrirCerrarModal}>
                    <b>&times;</b>
                </label>
            </div>
            <div className="w3-panel">
                <div>
                    <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                    <input autoFocus className="w3-input w3-border w3-round-large" type="email" maxLength={50} required
                        onChange={e => setEmail(e.target.value)} value={Email} />
                    <br></br>
                    <label className="w3-text-indigo"><b>Contraseña.</b></label><br></br>
                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask feedback={false} />
                </div>
                <div className="w3-center">
                    <label className="w3-text-indigo">
                        <input className="w3-check w3-margin-right" type="checkbox" onChange={e => setGD(!guardarDatos)} checked={guardarDatos} />
                        Guardar credenciales de inicio de sesión</label>
                </div>
                <div className="w3-center">
                    <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={validarCampos}>
                        INICIAR SESION
                    </button>
                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={e => { Limpiar(); window.localStorage.removeItem('memo'); }}>Limpiar</button>
                </div>
                <div className="w3-center">
                    <button className="w3-button w3-white w3-hover-white" onClick={e => { abrirCerrarModal(); document.getElementById('id01').style.display = 'block' }}>
                        <b>¿Olvide mi contraseña?</b>
                    </button>
                </div>
            </div>
        </div >
    )

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
            <div id="id03" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <span onClick={e => { document.getElementById('id03').style.display = 'none'; abrirCerrarModal() }}
                            className="w3-button w3-display-topright">&times;</span>
                        <h3>Por favor ingrese el correo electrónico registrado</h3>
                    </header>
                    <div className="w3-container w3-panel w3-text-indigo">
                        A continuación ingrese el correo electrónico registrado para enviar link de recuperación de contraseña.<br></br>
                        <label><b>Correo electrónico:</b></label><br></br>
                        <input className="w3-input w3-border w3-round-large" type="email" maxLength={50} required
                            onChange={e => setEmail(e.target.value)} value={Email} /><br></br>
                        <div className="w3-col w3-panel w3-center ">
                            <div style={{ margin: '10px auto', maxWidth: '300px' }}>
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LcOL34eAAAAACeYxi2YDP9-XFNo0l6qQYQupyKh"
                                    onChange={onChange}
                                />
                            </div>
                            {mostrarencaptcha &&
                                <div className='error-captcha'>
                                    Por favor acepta el captcha
                                </div>}
                        </div>
                        <button className="w3-button w3-indigo w3-round-xlarge w3-hover-blue w3-small w3-margin-bottom"
                            onClick={OlvideContra}>
                            <b>
                                Enviar
                            </b>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w3-container w3-black">
                <div className="w3-padding">
                    <div className="w3-col m10 w3-left-align">
                        <button disabled className="w3-button">
                        </button>
                    </div>
                    <div className="w3-col m2 w3-center">
                        <div style={Texto}>
                            <div>
                                <button className="w3-button w3-metro-red  w3-round-xlarge w3-hover-white w3-small"
                                    onClick={() => abrirCerrarModal()}>
                                    <b>
                                        INICIAR SESION
                                    </b>
                                </button>
                                <Modal
                                    open={modal}
                                    onClose={abrirCerrarModal}>
                                    {body}
                                </Modal>
                            </div>
                            <Link to={rutas.registro}>
                                <b >
                                    ¿No estoy registrado?
                                </b>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
            <Encabezado />
            <TextoInformativo />
        </>
    )
}



