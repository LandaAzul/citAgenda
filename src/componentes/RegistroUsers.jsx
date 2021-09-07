import React, { useState } from 'react';
import  {Modal, TextField,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles ((theme) =>({
    modal:{
        position:'absolute',
        width: 400,
        height: 350,
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

export function RegistroUsers () {
//la propiedad formulario es para definir donde se guardaran los datos del registro
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
            <form>
                <div class="w3-panel">
                    <div>
                        <input type='text' maxLength={50} placeholder="Nombre Completo" required></input>
                    </div>
                    <div>
                        <input type='tel' maxLength={12} placeholder='Número celular' required></input>
                    </div>
                    <div>
                        <input type='text' maxLength={50} placeholder='Email' required></input>
                    </div>
                    <div>
                        <input type='password' placeholder='contraseña' required></input>
                    </div>
                    <div>
                        <input type='password' placeholder='confirme contraseña' required></input>
                    </div>
                    
                </div>
                <div class="w3-panel">
                    <button type='submit'>Registrarme</button>
                    <button type='reset'>Limpiar</button>
                </div>
                
            </form>
        </div>
    </div>

)
    return (
        <div className={styles.container}>
            <Button variant="contained" onClick={()=>abrirCerrarModal()}>
                Registrarme</Button>
            <Modal 
            open={modal}
            onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    )
}