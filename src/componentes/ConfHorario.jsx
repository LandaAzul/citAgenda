import React, {useState}from 'react'
import swal from 'sweetalert';

export function ConfHorario() {


const [horaIni,sethoraIni] = useState(0)  
const [minIni,setminIni] = useState(0) 
const [jornadaInicio,setJI] = useState(0)
const [horaFran,sethoraFran] = useState(0)  
const [minFran,setminFran] = useState(0) 
const [horaDes,sethoraDes] = useState(0)  
const [minDes,setminDes] = useState(0) 
const [horaFn,sethoraFn] = useState(0)  
const [minFn,setminFn] = useState(0)
const [jornadaFin,setJF] = useState(0) 


// campos para validar hora, minutos y jornada de inicio
const validarHoraIni = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraIni(0);
        return;        
    }
    sethoraIni(valu);
};
const validarMinutosIni = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminIni(0);
        return;        
    }
    setminIni(valu);
};
// validacion tiempo de franja
const validarHoraFran = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFran(0);
        return;        
    }
    sethoraFran(valu);
};
const validarMinutosFran = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFran(0);
        return;        
    }
    setminFran(valu);
};

// validar campos de tiempo de descanso entre franjas
const validarHoraDes = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraDes(0);
        return;        
    }
    sethoraDes(valu);
};
const validarMinutosDes = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminDes(0);
        return;        
    }
    setminDes(valu);
};
//validacion hora de finalización
const validarHoraFn = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFn(0);
        return;        
    }
    sethoraFn(valu);
};
const validarMinutosFn = e => {
    let valu = e.target.value;
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFn(0);
        return;        
    }
    setminFn(valu);
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
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Lunes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Martes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Miércoles</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Jueves</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Viernes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Sábado</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox"/>
                            Domingo</label></p>
                    </div>
                    <div className="w3-col m10 w3-center w3-panel w3-padding-24 w3-border">
                        <div className="w3-col m12 w3-center w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Hora de inicio:</b></label>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 12'
                                onChange={validarHoraIni} title="campo para ingresar la hora de inicio, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 59'
                                onChange={validarMinutosIni} title="campo para ingresar los minutos de inicio, de 0 a 59 minutos"/>
                            </div>
                            <div className="w3-col m4 w3-left-align w3-text-indigo">
                                <label>jornada:</label>
                                <select className="w3-select w3-border w3-round-large w3-text-indigo"
                                onChange={e => setJI(e.target.value)}>
                                    <option value={0}>am</option>
                                    <option value={12}>pm</option>
                                </select>
                            </div>
                        </div>
                        <div className="w3-col m6 w3-center w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Tiempo de franja:</b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 12'
                                onChange={validarHoraFran} title="campo para ingresar hora de franja, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 59'
                                onChange={validarMinutosFran} title="campo para ingresar minutos de franja, de 0 a 59 minutos"/>
                            </div>
                        </div>
                        <div className="w3-col m6 w3-center w3-panel">
                        <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Descanso entre franjas:</b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 12'
                                onChange={validarHoraDes} title="campo para ingresar hora de franja, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 59'
                                onChange={validarMinutosDes} title="campo para ingresar minutos de franja, de 0 a 59 minutos"/>
                            </div>
                        </div>
                        <div className="w3-col m12 w3-center w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Hora de finalización:</b></label>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 12'
                                onChange={validarHoraFn} title="campo para ingresar la hora de inicio, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" required maxLength = {2} placeholder='0 a 59'
                                onChange={validarMinutosFn} title="campo para ingresar los minutos de inicio, de 0 a 59 minutos"/>
                            </div>
                            <div className="w3-col m4 w3-left-align w3-text-indigo">
                                <label>jornada:</label>
                                <select className="w3-select w3-border w3-round-large w3-text-indigo"
                                onChange={e => setJF(e.target.value)}>
                                    <option value={0}>am</option>
                                    <option value={12}>pm</option>
                                </select>
                            </div>
                        </div>
                        
                                    
                    </div>
                </form>
            </div>
       
        </div>
        
    )
}
