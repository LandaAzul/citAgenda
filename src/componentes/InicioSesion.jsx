import React, { useState } from 'react';
import  {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { OlvideContra } from './OlvideContra';
import { RegistroUsers } from './RegistroUsers';

const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 400,
        height: 250,
        backgroundColor: 'white',
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

export function InicioSesion () {

const styles= useStyles();

const [modal, setModal] = useState(false);

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
            <Button onClick={()=>abrirCerrarModal()}>
                cerrar
            </Button>
        </div>
        <div>
            <form>
                <div>
                    <input type='text' maxLength={50} placeholder='Email o número celular'></input>
                </div>
                <div>
                    <input type='password' placeholder='contraseña'></input>
                </div>
                <div>
                    <button type='submit'>Iniciar Sesion</button>
                    <button type='reset'>Limpiar</button>
                </div>
                    <br></br>
                <div>
                    <RegistroUsers/>
                    
                </div>
                    <br></br><br></br>
                <div>
                    <OlvideContra/>
                </div>
            </form>
        </div>
    </div>

)
    return (
        <div >
            <Button variant="contained" onClick={()=>abrirCerrarModal()}>
                Iniciar Sesion</Button>
            <Modal 
            open={modal}
            onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    )
}


  
