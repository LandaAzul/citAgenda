import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import useAuth from '../auth/useAuth'


const espacio = {
    margin: '10px',
}

export function RegistroUsersAdmin() {

    const { user } = useAuth();
    const [nombre, setNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [celular, setCel] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('Socio');
    const [idFamiliares, setFam] = useState('');
    const [volver, setvolver] = useState(false)

    const limpiarDatos = () => {

        setNombre('');
        setCod('');
        setDoc('');
        setCel('');
        setCorreo('');
        setContra('');
        setContra2('');
        setAct(false);
        setTipo('Socio');
        setFam('');
    }

    if (volver) return <RegistroUsersAdmin />

    const enviarDatos = async e => {
        try {
            await axios.post('http://localhost:4000/api/administrador/', {
                nombre: nombre,
                codigo: codigo,
                documento: documento,
                celular: celular,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: tipo,
                contra: contra,
                email: correo
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            limpiarDatos();
            swal({
                title: "En hora buena!",
                text: "Usuario registrado exitosamente",
                icon: "success",
                buttons: 'cerrar'
            }).then(respuesta => {
                if (respuesta) { setvolver(true) }
            });
        }
        catch (e) {
            let respuesta = JSON.parse(e.request.response).message;
            swal({
                title: "Datos ya existentes!",
                text: ('Por favor revisa los datos ingresados, ' + respuesta),
                icon: "warning",
                buttons: 'cerrar'
            })
        }
    }

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

    return (
        <>
            {/*aquí para pantallas grandes ##############################################################3*/}
            <div style={{ position: 'relative', left: '10%' }} className="w3-container w3-hide-small">
                <div className="w3-container w3-panel w3-col m10">
                    <div className="w3-container w3-padding w3-card w3-white">
                        <form onSubmit={validarContra}>
                            <div className="w3-col m6 w3-panel">
                                <p>
                                    <label className="w3-text-indigo"><b>Nombre Completo.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={50} value={nombre}
                                        onChange={e => setNombre(e.target.value)} />
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
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={20} value={idFamiliares}
                                        onChange={e => setFam(e.target.value)} />
                                </p>
                                <div className='w3-margin-bottom'>
                                    <label className="w3-text-indigo"><b>Contraseña.</b></label><br></br>
                                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" />
                                </div>
                                <div>
                                    <label className="w3-text-indigo"><b>Confirme contraseña.</b></label><br></br>
                                    <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask feedback={false} />
                                </div>
                            </div>


                            <div className="w3-col m12 w3-panel">
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label className="w3-text-indigo"><b>Seleccione el roll que dará al usuario.</b></label>
                                        <select className="w3-select w3-border w3-round-large"
                                            onChange={e => setTipo(e.target.value)}>
                                            <option defaultValue={"Socio"}>Socio</option>
                                            <option value={"Canchero"}>Canchero</option>
                                            <option value={"Profesor"}>Profesor</option>
                                            <option value={"Administrativo"}>Administrativo</option>
                                        </select>
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label className="w3-text-indigo"><b>Activar o desactivar usuario.</b></label>
                                        <select className="w3-select w3-border w3-round-large"
                                            onChange={e => setAct(e.target.value)}>
                                            <option defaultValue={false}>Inactivo</option>
                                            <option value={true}>Activar</option>
                                            <option value={false}>Desactivar</option>
                                        </select>
                                    </p>
                                </div>
                            </div>


                            <div className="w3-col w3-panel w3-center">
                                <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                    Registrar
                                </button>
                                <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarDatos}>
                                    <Link to="/users/admin">
                                        Volver
                                    </Link>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/*aquí para pantallas pequeñas ##############################################################3*/}
            <div className="w3-hide-large w3-hide-medium">

            </div>
        </>
    )
}