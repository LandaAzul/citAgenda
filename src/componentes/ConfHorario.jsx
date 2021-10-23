import { CountertopsOutlined, SettingsAccessibility } from '@mui/icons-material';
import React, {useState}from 'react'
import swal from 'sweetalert';

const espacio = {
    margin: '10px',
  }

export function ConfHorario() {

const [horaIni,sethoraIni] = useState('')  
const [minIni,setminIni] = useState('') 
const [jornadaInicio,setJI] = useState(0)
const [horaFran,sethoraFran] = useState('')  
const [minFran,setminFran] = useState('') 
const [horaDes,sethoraDes] = useState('')  
const [minDes,setminDes] = useState('') 
const [horaFn,sethoraFn] = useState('')  
const [minFn,setminFn] = useState('')
const [jornadaFin,setJF] = useState(0) 
const [lunes, setlunes] = useState(false)
const [martes, setmartes] = useState(false)
const [miercoles, setmiercoles] = useState(false)
const [jueves, setjueves] = useState(false)
const [viernes, setviernes] = useState(false)
const [sabado, setsabado] = useState(false)
const [domingo, setdomingo] = useState(false)

//limpiar cajas
const limpiarDatos = () => {
    sethoraIni('')
    setminIni('')
    setJI(0)
    sethoraFran('')
    setminFran('')
    sethoraDes('')
    setminDes('')
    sethoraFn('')
    setminFn('')
    setJF(0)
    setlunes(false)
    setmartes(false)
    setmiercoles(false)
    setjueves(false)
    setviernes(false)
    setsabado(false)
    setdomingo(false)
}

// campos para validar hora, minutos y jornada de inicio
const validarHoraIni = (e) => {
    if(e===''|| e==='0'){return}
    if(Number(e)>12 ||!Number(e)){
    swal({
            title: "Error en valor",
            text: 'No exceder el máximo permitido de 12 (horas), tampoco usar letras',
            icon: "warning",
            buttons: 'De acuerdo'
        })
    sethoraIni('')
    }
};
const validarMinutosIni = e => {
    if(e===''||e==='0'){return}
    if(Number(e)>59||!Number(e) ){
        swal({
            title: "Error en valor",
            text: 'No exceder el máximo permitido de 59 (minutos), tampoco usar letras',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminIni('')}
};

// validacion tiempo de franja
const validarHoraFran = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>12){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFran('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFran('');
        return;        
    }
    sethoraFran(valu);
};
const validarMinutosFran = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>59){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFran('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFran('');
        return;        
    }
    setminFran(valu);
};

// validar campos de tiempo de descanso entre franjas
const validarHoraDes = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>12){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraDes('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraDes('');
        return;        
    }
    sethoraDes(valu);
};
const validarMinutosDes = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>59){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminDes('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminDes('');
        return;        
    }
    setminDes(valu);
};
//validacion hora de finalización
const validarHoraFn = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>12){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFn('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 12 (horas)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        sethoraFn('');
        return;        
    }
    sethoraFn(valu);
};
const validarMinutosFn = e => {
    let valu = e.target.value;
    if(valu===''||valu==='0'){return}
    if(valu>59){swal({
            title: "Valor excedido",
            text: 'No exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFn('');
        return; }
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números sin exceder el máximo permitido de 59 (minutos)',
            icon: "warning",
            buttons: 'De acuerdo'
        })
        setminFn('');
        return;        
    }
    setminFn(valu);
};

// bloque para validar todos los datos ingresados y generar tabla de horario
 const validarDatos = (e) => {
    e.preventDefault()
    
   
    let sumaIn = 0
    let sumaFn = 0
    let tiempoTotal = 0
    let tiempoTotalSD = 0
    let cantidadFranjas = 0
    sumaIn = Number(jornadaInicio) + Number(horaIni);
    if(sumaIn===12){sumaIn = 0}
    if(sumaIn===24){sumaIn = 12}
    sumaFn = Number(jornadaFin) + Number(horaFn);
    if(sumaFn===12){sumaFn = 0}
    if(sumaFn===24){sumaFn = 12}
    tiempoTotal = (Number(sumaFn*60)+Number(minFn))-(Number(sumaIn*60)+Number(minIni))  // franjas dando descanso adicional al final el descanso final
    if(tiempoTotal>0){cantidadFranjas = tiempoTotal/((Number(horaFran*60)+Number(minFran))+(Number(horaDes*60)+Number(minDes)))
        tiempoTotalSD = (Number(sumaFn*60)+Number(minFn))-(Number(sumaIn*60)+Number(minIni))+(Number(horaDes*60)+Number(minDes)) // franjas sin dar descanso al final
        cantidadFranjas = tiempoTotalSD/((Number(horaFran*60)+Number(minFran))+(Number(horaDes*60)+Number(minDes))) }
    console.log(cantidadFranjas)
    if(tiempoTotal<0){tiempoTotal = (Number((24+sumaFn)*60)+Number(minFn)) - (Number(sumaIn*60)+Number(minIni)) //validar si se empieza en jornada pm y y finaliza en am
        cantidadFranjas = tiempoTotal/((Number(horaFran*60)+Number(minFran))+(Number(horaDes*60)+Number(minDes))) 
        console.log(cantidadFranjas)
        tiempoTotalSD = (Number((24+sumaFn)*60)+Number(minFn))-(Number(sumaIn*60)+Number(minIni))+(Number(horaDes*60)+Number(minDes)) // franjas sin dar descanso al final
        cantidadFranjas = tiempoTotalSD/((Number(horaFran*60)+Number(minFran))+(Number(horaDes*60)+Number(minDes))) }
    console.log('hola' + cantidadFranjas)
    if(cantidadFranjas===Infinity || isNaN(cantidadFranjas || Number(cantidadFranjas) === 0) || cantidadFranjas === '0'){
        swal({
            title: "Error al crear",
            text: 'No se puede establecer la cantidad de franjas, por favor verifique y corrija los tiempos',
            icon: "warning",
            buttons: 'De acuerdo'
    })
    return;}
    //limpiarDatos()
 }

    return (
        <div className="w3-container w3-col m10 w3-center">
            <div className="w3-panel w3-white ">
                <div className="w3-panel w3-gray w3-text-indigo">
                    <h2><b>Ajuste de horario</b></h2>
                </div>
                <form onSubmit={validarDatos}>
                    <div className="w3-col m2 w3-panel w3-left-align">
                        <h3><label className="w3-text-indigo"><b>Días.</b></label></h3>                  
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setlunes(!lunes)}/>
                            Lunes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setmartes(!martes)}/>
                            Martes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setmiercoles(!miercoles)}/>
                            Miércoles</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setjueves(!jueves)}/>
                            Jueves</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setviernes(!viernes)}/>
                            Viernes</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setsabado(!sabado)}/>
                            Sábado</label></p>
                        <p>
                            <label className="w3-text-indigo">
                                <input className="w3-check" type="checkbox" onClick={e=>setdomingo(!domingo)}/>
                            Domingo</label></p>
                    </div>
                    <div className="w3-col m10 w3-center w3-panel w3-padding-24 w3-border">
                        <div className="w3-col m12 w3-center w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Hora de inicio:</b></label>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {2} value={horaIni}
                                onChange={(e)=>{sethoraIni(e.target.value);
                                    validarHoraIni(e.target.value)}} title="campo para ingresar la hora de inicio, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {2} value={minIni}
                                onChange={(e)=>{setminIni(e.target.value);
                                    validarMinutosIni(e.target.value)}} title="campo para ingresar los minutos de inicio, de 0 a 59 minutos"/>
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
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={horaFran}
                                onChange={validarHoraFran} title="campo para ingresar hora de franja, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={minFran}
                                onChange={validarMinutosFran} title="campo para ingresar minutos de franja, de 0 a 59 minutos"/>
                            </div>
                        </div>
                        <div className="w3-col m6 w3-center w3-panel">
                        <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Descanso entre franjas:</b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={horaDes}
                                onChange={validarHoraDes} title="campo para ingresar horas de descanso entre franjas, de 0 a 12 horas"/>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={minDes}
                                onChange={validarMinutosDes} title="campo para ingresar minutos de descanso entre franjas, de 0 a 59 minutos"/>
                            </div>
                        </div>
                        <div className="w3-col m12 w3-center w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo"><b>Hora de finalización:</b></label>
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Hora:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={horaFn}
                                onChange={validarHoraFn} title="campo para ingresar la hora de finalización, de 0 a 12 horas"/>{horaFn}
                            </div>
                            <div className="w3-col m4 w3-left-align">
                                <label className="w3-text-indigo">Minutos:</label>
                                <input className="w3-input w3-border w3-round-large" type="text" maxLength = {3} value={minFn}
                                onChange={validarMinutosFn} title="campo para ingresar los minutos de finalización, de 0 a 59 minutos"/>
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
                    <div className="w3-col m12 w3-panel w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            Validar y crear
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={limpiarDatos} >
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
