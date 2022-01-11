import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { MenuAdmin } from './MenuAdmin';



const espacio = {
    margin: '10px',
}

export function RegistroUsersAdmin() {

    const [nombre, setNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [celular, setCel] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('Socio');
    const [idFamiliares, setFam] = useState([]);
    const [mostrarPass, setMPass] = useState(false)


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
        setFam([]);
        setMPass(false);

    }

    const enviarDatos = async e => {
        await axios.post('http://localhost:4000/api/auth/signUp', {
            nombre: nombre,
            codigo: codigo,
            documento: documento,
            celular: celular,
            activo: activo,
            idFamiliares: idFamiliares,
            tipo: tipo,
            contra: contra,
            email: correo
        })
        limpiarDatos();
        swal({
            title: "En hora buena!",
            text: "Usuario registrado exitosamente",
            icon: "success",
            buttons: 'cerrar'
            //showCancelButton: true,
            //confirmButtonColor: "#DD6B55",
            //confirmButtonText: "Yes, delete it!",
            //closeOnConfirm: false
        }).then(respuesta => {
            if (respuesta) {
                <Redirect to="/" />;
            }
        })
    }

    const handleClickShowPassword = () => {
        setMPass(!mostrarPass);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
        if (contra === contra2) { enviarDatos() }
        else { mostrarAlerta() }
    }


    return (
        <>
            <MenuAdmin/>
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

                                <InputLabel>Contraseña</InputLabel>
                                <OutlinedInput
                                    required
                                    type={mostrarPass ? 'text' : 'password'}
                                    value={contra}
                                    onChange={e => setContra(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {mostrarPass ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />

                                <InputLabel>Confirmar contraseña.</InputLabel>
                                <OutlinedInput
                                    required
                                    type={mostrarPass ? 'text' : 'password'}
                                    value={contra2}
                                    onChange={e => setContra2(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {mostrarPass ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
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