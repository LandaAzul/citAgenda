import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import { Link, useLocation } from 'react-router-dom'
import { Encabezado } from './Encabezado';
import { TextoInformativo } from './TextoInformativo';
import axios from 'axios';

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
        height: 360,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '10px 5px 5px black',
        padding: '16px 32px 24px',
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

export function InicioSesion() {

    const location = useLocation();

    const { login } = useAuth();
    const styles = useStyles();
    const [modal, setModal] = useState(false);
    const [Email, setEmail] = useState('');
    const [contra, setContra] = useState('');

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
                text: 'Campo "Correo electrónico" vacío, por favor ingrese el correo electrónico y vuelva a "¿Olvide mi contraseña?" para enviar correo de recuperación',
                icon: "warning",
                button: "volver"
            })
        }

    }

    const validarCampos = (e) => {
        e.preventDefault();
        if (Email === '') return swal("Uupss!", "Campor Correo vacio, por favor ingrese su email", "info");
        if (contra === '') return swal("Uupss!", "Campor Contraseña vacio, por favor ingrese una contraseña", "info");
        enviarLogin();
    }

    const enviarLogin = async () => {
        try {
            userCredentials = await axios.post('http://localhost:4000/api/auth/signIn', {
                email: Email,
                contra: contra
            })
            login(userCredentials, location.state?.from);
        } catch (e) {
            console.log('prro',e)
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
                    X
                </button>
            </div>
            <div className="w3-panel">

                <form onSubmit={validarCampos}>
                    <div>
                        <p>
                            <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="email" maxLength={50} required
                                onChange={e => setEmail(e.target.value)} value={Email} />
                        </p>
                        <p>
                            <label className="w3-text-indigo"><b>Contraseña.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="password" maxLength={50} required
                                onChange={e => setContra(e.target.value)} value={contra} />
                        </p>
                    </div>
                    <div className="w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            INICIAR SESION
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={Limpiar}>Limpiar</button>
                    </div>


                    <div className="w3-center">
                        <button className="w3-button w3-white w3-hover-white" onClick={OlvideContra}>
                            ¿Olvide mi contraseña?
                        </button>
                    </div>
                </form>
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
                            <Link to="/users/registro">
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
        </>
    )
}



