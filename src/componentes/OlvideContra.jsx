import React, { useState } from 'react';
import  {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 380,
        height: 310,
        backgroundColor: '#FFE8E3',
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

export function OlvideContra () {

const styles= useStyles();

const [modal, setModal] = useState(false);

const abrirCerrarModal = () => {
    setModal(!modal);
}

const body = (
    <div className={styles.modal}>
        <div align="right">
            <Button onClick={()=>abrirCerrarModal()}>
                cerrar
            </Button>
        </div>
        <div>
            <div>
                <h3>
                    Se le enviara a su correo registrado la contraseña de ingreso!!!
                </h3>
            </div>
            <form>
                <div class="w3-panel">
                    <input type='text' maxLength={50} placeholder='Email o número celular'></input>
                </div>
                
                <div class="w3-panel">
                    <button type='submit'>Recuperar Contraseña</button>
                    <button type='reset'>Limpiar</button>
                </div>
                
            </form>
        </div>
    </div>

)
    return (
        <div className={styles.container}>
            <Button variant="contained" onClick={()=>abrirCerrarModal()}>
                ¿Olvide mi contraseña?</Button>
            <Modal 
            open={modal}
            onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    )
}
