import React, { useState, useEffect } from 'react';
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
        height: 420,
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

var userCredentials = {};
var Correo = '';

export function MenuInicio() {

    const { login } = useAuth();
    const styles = useStyles();
    const [modal, setModal] = useState(false);
    const [Email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [guardarDatos, setGD] = useState(false);

    const Limpiar = () => {
        setEmail('');
        setContra('');
    }

    const abrirCerrarModal = () => {
        setModal(!modal);
        Limpiar();
    }

    const OlvideContra = () => {
        Correo = Email
        if (Correo) {
            swal({
                title: "¿Recuperar contraseña?",
                text: ('Se enviará un correo electrónico a "' + Correo + '" para recordar la contraseña'),
                icon: "info",
                buttons: ["Cancelar", "De acuerdo"]
            }).then(respuesta => {
                if (respuesta) {
                    //funcion para enviar correo;
                    setEmail('');
                    abrirCerrarModal();
                    swal({
                        title: "¡Listo!",
                        text: ('Mensaje para recuperación de contraseña enviado a "' + Correo + '".'),
                        icon: "success",
                        buttons: "cerrar"
                    })
                }
            })
        }
        else {
            swal({
                title: "Ingrese su correo eletrónico",
                text: 'Campo "Correo electrónico" vacío, por favor ingresa el correo electrónico registrado y vuelve a "¿Olvide mi contraseña?" para enviarte el correo de recuperación',
                icon: "warning",
                button: "de acuerdo"
            })
        }

    }

    const validarCampos = (e) => {
        e.preventDefault();
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

    const enviarLogin = async () => {
        try {
            userCredentials = await axios.post('http://localhost:4000/api/auth/signIn', {
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

    const body = (
        <div className={styles.modal}>
            <div align="right">
                <button className="w3-button w3-border w3-border-black w3-round-large w3-hover-red w3-tiny"
                    onClick={abrirCerrarModal}>
                    &times;
                </button>
            </div>
            <div className="w3-panel">
                <form onSubmit={validarCampos}>
                    <div>
                        <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                        <input className="w3-input w3-border w3-round-large" type="email" maxLength={50} required
                            onChange={e => setEmail(e.target.value)} value={Email} />
                        <br></br>
                        <label className="w3-text-indigo"><b>Contraseña.</b></label>
                        <label className="w3-text-indigo"><b>Confirme contraseña.</b></label><br></br>
                        <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask />
                    </div>
                    <div className="w3-center">
                        <label className="w3-text-indigo">
                            <input className="w3-check w3-margin-right" type="checkbox" onChange={e => setGD(!guardarDatos)} checked={guardarDatos} />
                            Guardar credenciales de inicio de sesión</label>
                    </div>
                    <div className="w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            INICIAR SESION
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={Limpiar}>Limpiar</button>
                    </div>
                </form>
                <div className="w3-center">
                    <button className="w3-button w3-white w3-hover-white" onClick={OlvideContra}>
                        ¿Olvide mi contraseña?
                    </button>
                </div>

            </div>


        </div >

    )

    return (
        <>
            <div className="w3-container w3-black"> {/*color importado de w3-metro-color*/}
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
            <Encabezado />
            <TextoInformativo />
            <Outlet />
        </>
    )
}



