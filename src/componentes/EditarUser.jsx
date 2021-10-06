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

const espacio = {
    margin: '10px',
  }

export function EditarUser () {

const [idUser, setId] = useState('')
const [nombre, setNombre]=useState('');
const [codigo,setCod]=useState('');
const [documento,setDoc]=useState('');
const [celular, setCel]=useState('');
const [correo, setCorreo]=useState('');
const [contra, setContra]=useState('');
const [contra2, setContra2]=useState('');
const [activo,setAct]=useState(false);
const [tipo,setTipo]=useState('Socio');
const [idFamiliares,setFam]=useState([]);
const [mostrarPass,setMPass]= useState(false)


const limpiarDatos = () => {
    setId('');
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

async function mostrarDatos() {
    const resp = await axios.get('http://localhost:4000/api/users/'+ idUser ); 
    setNombre(resp.data.message.nombre);
    setCod(resp.data.message.codigo);
    setDoc(resp.data.message.documento);
    setCel(resp.data.message.celular);
    setAct(resp.data.message.activo);
    setTipo(resp.data.message.tipo);
    setContra(resp.data.message.contra);
    setContra2(resp.data.message.contra);
    setCorreo(resp.data.message.email);
               
}

const enviarDatos = async e => {
    await axios.put('http://localhost:4000/api/users/' + idUser,{
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
        text: "Usuario actualizado",
        icon: "success",
        buttons:'cerrar'
        }).then(respuesta=>{
            if(respuesta){

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
        title:'Error en contraseñas',
        text:'las contraseñas deben coincidir',
        icon:'warning', //success , warning, info, error
        buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
        timer: '' //tiempo en milisegundos
    })
};



const validarContra = e => {
    if (contra === contra2) {enviarDatos()} 
    else
        {mostrarAlerta()}
}


const validarVacio = (e) => {
    e.preventDefault()
    if(idUser){validarContra()}
    else{
        swal({
            title:'Ingresar id usuario',
            text:'Por favor ingrese id del usuario y de clíck en "Editar Usuario"',
            icon:'warning', //success , warning, info, error
            buttons: 'Aceptar',
            timer: ''
        })
    }
}

const validarId = (e) => {
    e.preventDefault()
    if(idUser){mostrarDatos()}
    else{
        swal({
            title:'Ingresar id usuario',
            text:'Por favor ingrese id del usuario y de clíck en "Editar Usuario"',
            icon:'warning', //success , warning, info, error
            buttons: 'Aceptar',
            timer: ''
        })
    }
}

const mensajeEdit = (e) => {
    e.preventDefault()
    swal({
        title:'Campo vacio',
        text:'Campo vacío o no se pudo reconocer el texto, si copio y pego por favor de clickee al final del campo input y de un espacio para reconocer entrada y se habilite el boton "Editar Usuario"',
        icon:'info', //success , warning, info, error
        buttons: 'Aceptar',
        timer: ''
    })
}

    return (
        <div className="w3-container w3-panel w3-col m10">
            <div className="w3-container w3-padding w3-card w3-white">
            <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                <form>
                    <div className="w3-col m7 w3-left-align">
                        <p>
                            <label className="w3-text-indigo"><b>Ingrese el documento o código del usuario a buscar:</b></label><br></br>
                            <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {30}
                            onChange={e => setId(e.target.value)}/>{idUser}
                        </p>
                    </div>
                    <div className="w3-col m5 w3-right-align">
                        <p>
                            {idUser?
                                <button style={espacio} className="w3-button w3-metro-red w3-border w3-border-black w3-round-large w3-hover-white"
                                onClick={validarId}>Editar Usuario</button>
                                :<button style={espacio} className="w3-button w3-gray w3-border w3-border-black w3-round-large w3-hover-gray"
                                onClick={mensajeEdit}>Editar Usuario</button>}
                            <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={limpiarDatos}>Limpiar campo</button>
                        </p>
                    </div>
                </form>
            </div>
            {documento?
                <form onSubmit={validarVacio}>
                    <div className="w3-col m6 w3-panel">
                        <p>
                            <label className="w3-text-indigo"><b>Número documento: </b></label>
                            <h3><b className="w3-text-indigo">{documento}</b></h3>
                        </p>
                        <p>
                            <label className="w3-text-indigo"><b>Nombre Completo.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="text" required
                            maxLength = {50} value= {nombre}
                            onChange={e => setNombre(e.target.value)}/>
                        </p>
                        <p>
                            <label className="w3-text-indigo"><b>Código Club.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="text" required
                            maxLength = {50} value= {codigo}
                            onChange={e => setCod(e.target.value)}/>
                        </p>
                        <p>
                            <label className="w3-text-indigo"><b>Celular.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="tel" required
                            maxLength = {15} value= {celular}
                            onChange={e => setCel(e.target.value)}/>
                        </p>
                        
                    </div>
                    <div className="w3-col m6 w3-panel">
                        <p>
                            <label className="w3-text-indigo"><b>Email.</b></label>
                            <input className="w3-input w3-border w3-round-large" type="email" required
                            maxLength = {50} value= {correo}
                            onChange={e => setCorreo(e.target.value)}/>
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
                                <label className="w3-text-indigo"><b>Seleccione que propiedad dará al usuario.</b></label>
                                <select className="w3-select w3-border w3-round-large" name="option"
                                onChange={e => setTipo(e.target.value)}>
                                    <option defaultValue={tipo}>{tipo}</option>
                                    <option value={"Administrativo"}>Administrativo</option>
                                    <option value={"Profesor"}>Profesor</option>
                                    <option value={"Canchero"}>Canchero</option>
                                    <option value={"Socio"}>Socio</option>
                                </select>
                            </p>
                        </div>
                        <div className="w3-col m6 w3-panel">
                            <p>
                                <label className="w3-text-indigo"><b>Activar o desactivar usuario.</b></label>
                                <select className="w3-select w3-border w3-round-large" name="option"
                                onChange={e => setAct(e.target.value)}>
                                    <option defaultValue={activo}>{activo?'Activo':'Inactivo'}</option>
                                    <option value={true}>Activar</option>
                                    <option value={false}>Desactivar</option>
                                </select>
                            </p>
                        </div>
                    </div>
                    <div className="w3-col w3-panel w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            Actualizar Datos
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={limpiarDatos}>
                            <Link to="/users/admin">
                                Volver
                            </Link>
                        </button>
                    </div>
                </form>
            :null}   
        </div>
    </div>
    )
}