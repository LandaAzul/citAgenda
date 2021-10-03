import React, { useState } from 'react';
import  {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import { OlvideContra } from './OlvideContra';


const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 380,
        height: 310,
        backgroundColor: '#c4ebea',
        border: '2px solid #000',
       
        
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

const body = (
    <div className={styles.modal}>
        {/*<div align='center'>
            <h2>
                Formulario
            </h2>
        </div>
        <TextField label="Email o Celular" className={styles.textfield}/>
        <br></br>
        <TextField label="Email o Celular" className={styles.textfield}/>
        <br></br>
        */}
        <div align="right">
            {/*<Button color="primary">
                Enviar
            </Button>
            */}
            <Button variant="outlined" onClick={()=>abrirCerrarModal()}>
                cerrar
            </Button>
        </div>
        <div>
            <div className="w3-panel w3-card">
                <form>
                    <div>
                        <br></br>
                    </div>
                    <div>
                        <input type='text' maxLength={50} placeholder='Email o número celular' required
                        onChange={e => setCelEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <input type='password' placeholder='contraseña' required
                        onChange={e => setContra(e.target.value)}></input>
                    </div>
                    <div className="w3-panel">
                        <button type='submit'>Iniciar Sesion</button>
                        <button type='reset' onClick={Limpiar}>Limpiar</button>
                        
                    </div>
                        <br></br>
                </form>
            </div>
            <div>
                <OlvideContra/>
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


  
