import React, { useState } from 'react';
import  {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import swal from 'sweetalert';

const espacio = {
    margin: '10px',
  }

const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 400,
        height: 360,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '10px 5px 5px black',
        padding: '16px 32px 24px',
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

export function InicioSesion () {

const styles= useStyles();
const [modal, setModal] = useState(false);
const [celEmail, setCelEmail] = useState('');
const [contrasena, setContra] = useState('');

const Limpiar = () => {
    setCelEmail();
    setContra();
}

const abrirCerrarModal = () => {
    setModal(!modal);
}

const OlvideContra = e => {
    swal({
        title: "¡Recordar contraseña!",
        text: "Se te enviará un mensaje al correo registrado para recordar tu contraseña",
        icon: "info",
        buttons:['cancelar','De acuerdo'],
    }).then(respuesta => {
        if(respuesta){
            swal({
                title: "¡Solicitud en proceso!",
                text: "Revisa tu bandeja de entrada o bandeja de spam de tu correo para recuperar tu contraseña",
                icon: "success",
                buttons:'Entendido'
            }).then(respuesta => {
                if(respuesta){
                    abrirCerrarModal();
            }})
    }})
}


const body = (
    <div className={styles.modal}>
        <div align="right">
            <button className="w3-button w3-border w3-border-black w3-round-large w3-hover-red w3-tiny"
            onClick={()=>abrirCerrarModal()}>
                X
            </button>
        </div>
        <div className="w3-panel">
            <form>
                <div>
                    
                </div>
                <div>
                    <p>
                        <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                        <input className="w3-input w3-border w3-round-large" type="text" maxLength = {50} required 
                        onChange={e => setCelEmail(e.target.value)}/>
                    </p>
                    <p>
                        <label className="w3-text-indigo"><b>Contraseña.</b></label>
                        <input className="w3-input w3-border w3-round-large" type="password" maxLength = {50} required 
                        onChange={e => setContra(e.target.value)}/>
                    </p>
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
                <button className="w3-button w3-white w3-hover-white"onClick={OlvideContra}>
                    ¿Olvide mi contraseña?
                </button>
            </div>
        </div>
        
    
    </div>

)
    return (
        <div>
            <button className="w3-button w3-metro-red  w3-round-xlarge w3-hover-white w3-small" 
            onClick={()=>abrirCerrarModal()}>
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
    )
}


  
