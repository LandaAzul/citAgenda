import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import swal from 'sweetalert';

export function Contrasena() {

const [contra, setContra]=useState('');
const [contra2, setContra2]=useState('');
const [mostrarPass,setMPass]= useState(false)

const handleClickShowPassword = () => {
    setMPass(!mostrarPass);
};

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const validarContra = e => {
    if (contra === contra2) {enviarDatos()} 
    else
        {mostrarAlerta()}
}

const mostrarAlerta = () => {
    swal({
        title:'Error en contraseñas',
        text:'las contraseñas deben coincidir.',
        icon:'warning', //success , warning, info, error
        buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
        timer: '' //tiempo en milisegundos
    })
};

    return (
        <div>
            <div className="w3-col m6">
                <p>
                    <label className="w3-text-indigo"><b>Contraseña anterior:</b></label>
                    <input className="w3-input w3-border w3-round-large" type="password" maxLength = {50} required 
                    onChange={e => setContra(e.target.value)}/>
                </p>
            </div>
            <div className="w3-col m6">
                <InputLabel>Nueva contraseña</InputLabel>
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
        </div>
    )
}
