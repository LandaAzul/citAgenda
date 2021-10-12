import React, { useState } from 'react';
import axios from 'axios';
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

const [mostrarEdit,setME] = useState(false)
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
    setME(false);

}

const mostrarDatos = async (e) => {
    const resp = await axios.get('http://localhost:4000/api/users/documento/'+ idUser ); 
    
    if((resp.data.message).length===1){
        setNombre(resp.data.message[0].nombre);
        setCod(resp.data.message[0].codigo);
        setDoc(resp.data.message[0].documento);
        setCel(resp.data.message[0].celular);
        setAct(resp.data.message[0].activo);
        setTipo(resp.data.message[0].tipo);
        setContra(resp.data.message[0].contra);
        setContra2(resp.data.message[0].contra);
        setCorreo(resp.data.message[0].email);       
    }
    else{
        swal({
            title: "Ninguna coincidencia",
            text: "Documento inexistente, por favor verifique e intente de nuevo.",
            icon: "error",
            buttons:'cerrar'
            })
        limpiarDatos();
    }
             
}

const enviarDatos = async e => {
    await axios.put('http://localhost:4000/api/users/documento/' + idUser,{
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
        title: "¡En hora buena!",
        text: "Usuario actualizado.",
        icon: "success",
        buttons:'cerrar'
        }).then(respuesta=>{
            if(respuesta){

            }
        })
}

const deleteUser = async e => {
    const resp = await axios.delete('http://localhost:4000/api/users/documento/'+ idUser ); 
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
        text:'las contraseñas deben coincidir.',
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
            text:'Por favor ingrese id del usuario y de clíck en "Editar Usuario".',
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
            text:'Por favor ingrese id del usuario y de clíck en "Editar Usuario".',
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
        text:'Campo vacío o no se pudo reconocer el texto, si copio y pego por favor clickee al final del campo input y de un espacio para reconocer entrada y se habilite el boton "Editar Usuario".',
        icon:'info', //success , warning, info, error
        buttons: 'Aceptar',
        timer: ''
    })
}

const mostrarCampo = (e) => {
    e.preventDefault()
    setME(true)
}

const eliminarUser = (e) => {
    e.preventDefault();
    swal({
        title:'¿Eliminar Usuario?',
        text:('Estas a punto de eliminar al usuario con documento "'+documento+'", si esta de acuerdo por favor de clíck en "Continuar".'),
        icon:'warning', //success , warning, info, error
        buttons:['Cancelar','Continuar'],
    }).then(respuesta=>{
        if(respuesta){
            deleteUser();
            limpiarDatos();
            swal({
                title:'Usuario eliminado',
                text:'Usuario eliminado.',
                icon:'success', //success , warning, info, error
                buttons:'Cerrar'
            })

        }

    })
}

    return (
        <div className="w3-container w3-panel w3-col m10">
            <div className="w3-container w3-padding w3-card w3-white">
            <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                <form>
                    <div className="w3-col m7 w3-left-align">
                        <p>
                            <label className="w3-text-indigo"><b>Ingrese el documento del usuario a buscar:</b></label><br></br>
                            <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {30}
                            onChange={e => setId(e.target.value)}/>
                        </p>
                    </div>
                    <div className="w3-col m5 w3-right-align">
                        <p>
                            {idUser?
                                <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={validarId}>Buscar usuario</button>
                                :<button style={espacio} className="w3-button w3-gray w3-border w3-border-black w3-round-large w3-hover-gray"
                                onClick={mensajeEdit}>Buscar usuario</button>}
                            <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={limpiarDatos}>Limpiar y cerrar</button>
                        </p>
                    </div>
                    {nombre?
                        <div className="w3-container w3-col m12 w3-panel w3-white w3-left-align">
                            <div className="w3-col m6 w3-panel">
                                <p>
                                <label className="w3-text-indigo">Número documento:</label>
                                <b className="w3-text-indigo">{documento}</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Nombre Completo:</label>
                                <b className="w3-text-indigo">{nombre}</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Código Club:</label>
                                <b className="w3-text-indigo">{codigo}</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Roll del usuario:</label>
                                <b className="w3-text-indigo">{tipo}</b>
                                </p>
                            </div>
                            <div className="w3-col m6 w3-panel">
                                <p>
                                <label className="w3-text-indigo">Celular:</label>
                                <b className="w3-text-indigo">{celular}</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Email:</label>
                                <b className="w3-text-indigo">{correo}</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Contraseña:</label>
                                <b className="w3-text-indigo">Solo visible en "Editar"</b>
                                </p>
                                <p>
                                <label className="w3-text-indigo">Estado:</label>
                                <b className="w3-text-indigo">{activo?'Activo':'Inactivo'}</b>
                                </p>
                            </div>
                            <div className="w3-container w3-panel w3-white w3-center">
                                <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red"
                                onClick={mostrarCampo}>
                                    Editar
                                </button>
                                <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={limpiarDatos}>cerrar</button>
                            </div>
                        </div>
                    :null}
                </form>
            </div>
            {mostrarEdit?
                <form onSubmit={validarVacio}>
                    <div className="w3-col m6 w3-panel">
                        <p>
                            <label className="w3-text-indigo"><b>Número documento: </b></label>
                            <b className="w3-text-indigo">{documento}</b>
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
                    <div className="w3-col w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            Actualizar Usuario
                        </button>
                        <button style={espacio} className="w3-button w3-metro-red w3-border w3-border-black w3-round-large w3-hover-red"
                        onClick={eliminarUser}>
                            Eliminar Usuario
                        </button>
                    </div>
                    <div className="w3-col w3-center">
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={e => setME(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            :null}   
        </div>
    </div>
    )
}