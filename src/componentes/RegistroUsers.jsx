import React, { useState } from 'react';
import  {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 350,
        height: 330,
        backgroundColor: '#c4ebea',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
    },

    textfield:{
        width: '100%'
    },

    container:{
        position:'absolute',
        textAlign:'center'
    },

}))

export function RegistroUsers ({titulo}) {
//la propiedad formulario es para definir donde se guardaran los datos del registro
const styles= useStyles();

const [modal, setModal] = useState(false);

//const [ident, setIdent]=useState('');
const [nombre, setNombre]=useState('');
const [celular, setCelular]=useState('');
const [correo, setCorreo]=useState('');
const [contra, setContra]=useState('');

const abrirCerrarModal = () => {
    setModal(!modal);
}

const limpiarDatos = () => {
    //setIdent('');
    setNombre('');
    setCelular('');
    setCorreo('');
    setContra('');
}

const onSubmit = async e => {
    e.preventDefault()
    await axios.post('http://localhost:4000/api/users',{
        username: nombre,
        cellphone: celular,
        pass: contra,
        email: correo
    })
    limpiarDatos()
}

const body = (
    <div className={styles.modal}>
        
        <div align="right">
            <Button onClick={()=>abrirCerrarModal()}>
                cerrar
            </Button>
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <div className="w3-panel">
                    {/*<div>
                        <input type='text' maxLength={20} placeholder="Número de identificación" required
                        onChange={e => setIdent(e.target.value)}
                        value={ident}></input>
                    </div>*/}
                    <div>
                        <input type='text' maxLength={50} placeholder="Nombre Completo" required
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}></input>
                    </div>
                    
                    <div>
                        <input type='tel' maxLength={12} placeholder='Número celular' required
                        onChange={e => setCelular(e.target.value)}
                        value={celular}></input>
                    </div>
                    <div>
                        <input type='email' maxLength={50} placeholder='Email' required
                        onChange={e => setCorreo(e.target.value)}
                        value={correo}></input>
                    </div>
                    <div>
                        <input type='password' placeholder='contraseña' required
                        onChange={e => setContra(e.target.value)}
                        value={contra}></input>
                    </div>
                    {/*<div>
                        <input type='password' placeholder='confirme contraseña' required></input>
                    </div>*/}
                    
                </div>
                <div className="w3-panel">
                    <button type='submit'>{titulo}</button>
                    <button type='reset' onClick={limpiarDatos}>Limpiar</button>
                </div>
                
            </form>
        </div>
    </div>

)
    return (
        <div className="w3-section">
            <Button variant="contained" onClick={()=>abrirCerrarModal()}>
                {titulo}
            </Button>
            <Modal 
                open={modal}
                onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    )
}