import React, { useState } from 'react'
import rutas from '../helpers/rutas';
import axios from 'axios';
import swal from 'sweetalert';
import { Password } from 'primereact/password';
import { Encabezado } from './Encabezado';
import { Link } from 'react-router-dom'

export default function NewPassword() {

    var valor = (rutas.index).length + (rutas.password).length - 1
    var token = (window.location.href).substring(valor);

    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');

    const validarContra = e => {
        if (contra.length >= 8) {
            if (contra === contra2) {
                enviarDatos()
            }
            else {
                swal('Error en contraseñas', 'Las contraseñas deben coincidir, por favor verifica e intenta de nuevo', 'warning');
                return;
            }
        }
        else { swal("Stop!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning"); }
    }

    const enviarDatos = async (e) => {
        try {
            await axios.put(rutas.server + 'api/auth/new-password', {
                newPassword: contra,
            })
            setContra('');
            setContra2('')
            swal({
                title: "En hora buena!",
                text: "Tú contraseña se actualizo con exito, por favor inicia sesión.",
                icon: "success",
                buttons: "Ok"
            }, {
                headers: {
                    'reset': token,
                    'Content-Type': 'application/json'
                }
            })
            //navigate(to={rutas.home}, { replace: true });
        } catch (e) {
            swal('Upss', 'Lo sentimos, al pecerecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
            //let respuesta = JSON.parse(e.request.response).message;            
        }

    };


    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-right-align w3-padding">
                    <button className="w3-button w3-metro-red  w3-round-xlarge w3-hover-white w3-small">
                        <Link to={rutas.home}>
                            <b >
                                Ir a inicio
                            </b>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="w3-container w3-center w3-margin w3-text-indigo">
                <h3>A continuación ingrese su nueva contraseña.</h3>
                <div>
                    <label><b>Contraseña.</b></label><br></br>
                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" />
                </div>
                <div>
                    <label><b>Confirme contraseña.</b></label><br></br>
                    <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask feedback={false} />
                </div>
                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-margin"
                    onClick={validarContra}>
                    Enviar
                </button>
            </div>
            <Encabezado />
        </>
    )
}
