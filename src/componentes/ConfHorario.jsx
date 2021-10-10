import { Pattern } from '@mui/icons-material';
import React, {useState}from 'react'
import swal from 'sweetalert';

export function ConfHorario() {

const [horaInicio, setHI] = useState()
const [maxHora,setMH] = useState('')
const [maxMin,setMM] = useState('')
const [jornadaInicio,setJI] = useState(0)

const validarHora = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setMH(0);
        return;        
    }
    setMH(valu);
};

const validarMinutos = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setMM(0);
        return;        
    }
    setMM(valu);
};

    return (
        <div className="w3-container w3-col m10 w3-center">
            
            
            <div className="w3-panel w3-white ">
            <div className="w3-panel w3-gray w3-text-indigo">
                <h2><b>Ajuste de horario</b></h2>
            </div>
                <form>
                    <div className="w3-col m2 w3-panel w3-left-align">
                        <h3><label className="w3-text-indigo"><b>Días.</b></label></h3>                  
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Lunes</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Martes</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Miércoles</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Jueves</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Viernes</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Sábado</b></label></p>
                        <p>
                        <input className="w3-check" type="checkbox"/>
                        <label className="w3-text-indigo"><b>Domingo</b></label></p>
                    </div>
                    <div className="w3-col m10 w3-center w3-panel w3-padding w3-border">
                        <div className="w3-col m12 w3-left-align">
                            <label className="w3-text-indigo"><b>Hora de inicio:</b></label>
                        </div>
                        <div className="w3-col m4 w3-left-align">
                            <label className="w3-text-indigo"><b>Hora:</b></label>
                            <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 12'
                            onChange={validarHora} title="campo para ingresar la hora de inicio, de 0 a 12 horas"/>
                            {maxHora}
                        </div>
                        <div className="w3-col m4 w3-left-align">
                            <label className="w3-text-indigo"><b>Minutos:</b></label>
                            <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 59'
                            onChange={validarMinutos} title="campo para ingresar los minutos de inicio, de 0 a 59 minutos"/>
                            {maxMin}
                        </div>
                        <div className="w3-col m4 w3-left-align">
                            <label className="w3-text-indigo"><b>jornada:</b></label>
                            <select className="w3-select w3-border w3-round-large"
                            onChange={e => setJI(e.target.value)}>
                                <option value={0}>am</option>
                                <option value={12}>pm</option>
                            </select>
                            {jornadaInicio}
                        </div>
                        <div className="w3-col m10">

                        </div>
                        
                                    
                    </div>
                </form>
            </div>
       
        </div>
        
    )
}
