import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import swal from 'sweetalert';


var idEm = '';

const espacio = {
    margin: '10px',
  }


export function RegistroUsers () {


const [nombre, setNombre]=useState('');
const [codigo,setCod]=useState('');
const [documento,setDoc]=useState('');
const [celular, setCel]=useState('');
const [correo, setCorreo]=useState('');
const [contra, setContra]=useState('');
const [contra2, setContra2]=useState('');
const [activo,setAct]=useState(false);
const [tipo,setTipo]=useState('socio');
const [idFamiliares,setFam]=useState([]);
const [mostrarPass,setMPass]= useState(false)


const limpiarDatos = () => {
    
    setNombre('');
    setCod('');
    setDoc('');
    setCel('');
    setCorreo('');
    setContra('');
    setContra2('');
    setAct(false);
    setTipo('socio');
    setFam([]);
    setMPass(false);
}



const enviarDatos = async e => {
    await axios.post('http://localhost:4000/api/users',{
        nombre: nombre,
        codigo:codigo,
        documento:documento,
        celular: celular,
        activo: activo,
        idFamiliares: idFamiliares,
        tipo: tipo,
        contra: contra,
        email:correo
    })
    limpiarDatos();
    swal({
        title: "En hora buena!",
        text: "has sido registrado, por favor inicia sesión",
        icon: "success",
        buttons:'cerrar'
        //showCancelButton: true,
        //confirmButtonColor: "#DD6B55",
        //confirmButtonText: "Yes, delete it!",
        //closeOnConfirm: false
      }).then(respuesta=>{
        if(respuesta){
            window.location.href = "http://localhost:3000/";
        }})
        
    
}

const handleClickShowPassword = () => {
    setMPass(!mostrarPass);
  };

const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const mostrarAlerta = () => {
    swal({
        title:'Error en contraseñas',
        text:'las contraseñas deben coincidir',
        icon:'warning', //success , warning, info, error
        buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
        timer: '' //tiempo en milisegundos
    })
};

const confirmarDatos = () => {
    swal({
        title:'titulo',
        text:'esta es una alerta',
        icon:'warning', //success , warning, info, error
        buttons: ['No','Si'], // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
        timer: '' //tiempo en milisegundos
    }).then(respuesta=>{
        if(respuesta){
            swal({
                text:'se ha enviado',
                icon:'success'
        })
        }
    })
};

const validar = e =>{
    e.preventDefault()
    if (contra == contra2) {enviarDatos()} 
    else
        {mostrarAlerta()}
}

    return (
        <div className="w3-container w3-panel w3-col m10">
            <div className="w3-container w3-padding w3-card">
            <form onSubmit={validar}>
                <div className="w3-col m6 w3-panel">
                    <p>
                        <label class="w3-text-indigo"><b>Nombre Completo.</b></label>
                        <input class="w3-input w3-border w3-round-large" type="text" required
                        maxLength = {50} value= {nombre}
                        onChange={e => setNombre(e.target.value)}/>
                    </p>
                    <p>
                        <label class="w3-text-indigo"><b>Número documento.</b></label>
                        <input class="w3-input w3-border w3-round-large" type="text" required
                        maxLength = {50} value= {documento}
                        onChange={e => setDoc(e.target.value)}/>
                    </p>
                    <p>
                        <label class="w3-text-indigo"><b>Código Club.</b></label>
                        <input class="w3-input w3-border w3-round-large" type="text" required
                        maxLength = {50} value= {codigo}
                        onChange={e => setCod(e.target.value)}/>
                    </p>
                    <p>
                        <label class="w3-text-indigo"><b>Celular.</b></label>
                        <input class="w3-input w3-border w3-round-large" type="tel" required
                        maxLength = {15} value= {celular}
                        onChange={e => setCel(e.target.value)}/>
                    </p>
                    
                </div>
                <div className="w3-col m6 w3-panel">
                    <p>
                        <label class="w3-text-indigo"><b>Email.</b></label>
                        <input class="w3-input w3-border w3-round-large" type="email" required
                        maxLength = {50} value= {correo}
                        onChange={e => setCorreo(e.target.value)}/>
                    </p>
                    <p>
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
                    
                    <InputLabel>Confirme contraseña.</InputLabel>
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
                    </p>
                </div>
                <div className="w3-col w3-panel w3-center">
                    <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                        Registrar
                    </button>
                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                    onClick={limpiarDatos}>
                        <Link to="/">
                            Volver
                        </Link>
                    </button>
                </div>
                
            </form>
            </div>
        </div>
    )
}