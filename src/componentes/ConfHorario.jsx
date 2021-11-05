import React, {useState}from 'react'
import swal from 'sweetalert';
import { CrearTablaHorario } from './CrearTablaHorario';

const espacio = {
    margin: '10px',
    }

const Tamano = {
    width:'150px',
    height:'155px',
    overFlow:'auto',
    position:'absolute',
    backgroundColor:'white',
    border: '1px solid blue',
    boxShadow: '5px 2px 15px black',
    }

var franjas= []
var tiempoInicio=0
var inihFran=0
var inimFran=0
var finhFran=0
var finmFran=0
var jorI='am'
var jorF='pm'
var ceroI=''
var ceroF=''

export function ConfHorario() {

const [horaIni,sethoraIni] = useState(0)  
const [minIni,setminIni] = useState(0) 
const [horaFran,sethoraFran] = useState(0)  
const [minFran,setminFran] = useState(0) 
const [horaDes,sethoraDes] = useState(0)  
const [minDes,setminDes] = useState(0) 
const [horaFn,sethoraFn] = useState(0)  
const [minFn,setminFn] = useState(0)
const [lunes, setlunes] = useState(false)
const [martes, setmartes] = useState(false)
const [miercoles, setmiercoles] = useState(false)
const [jueves, setjueves] = useState(false)
const [viernes, setviernes] = useState(false)
const [sabado, setsabado] = useState(false)
const [domingo, setdomingo] = useState(false)
const [mostraIni,setmostrarIni] = useState(false)
const [mostraInim,setmostrarInim] = useState(false)
const [mostraFran,setmostrarFran] = useState(false)
const [mostraFranm,setmostrarFranm] = useState(false)
const [mostraDes,setmostrarDes] = useState(false)
const [mostraDesm,setmostrarDesm] = useState(false)
const [mostraFn,setmostrarFn] = useState(false)
const [mostraFnm,setmostrarFnm] = useState(false)
const [titulo, settitulo] = useState('')
const [franja, setfranja] = useState([])

//limpiar cajas
const limpiarDatos = () => {
    sethoraIni(0)
    setminIni(0)
    sethoraFran(0)
    setminFran(0)
    sethoraDes(0)
    setminDes(0)
    sethoraFn(0)
    setminFn(0)
    setlunes(false)
    setmartes(false)
    setmiercoles(false)
    setjueves(false)
    setviernes(false)
    setsabado(false)
    setdomingo(false)
    settitulo('')
    setfranja([])
}

// bloque para validar todos los datos ingresados y generar tabla de horario
 const validarDatos = (e) => {
    e.preventDefault();
    franjas=[];
    setfranja([]);
    tiempoInicio=0;
    inihFran=0
    inimFran=0
    finhFran=0
    finmFran=0
    jorI='am'
    jorF='pm'
    ceroI=''
    ceroF=''
    if(titulo===''){swal("Título sin definir","Por favor defina título para este horario","info");return}
    if(!lunes){if(!martes){if(!miercoles){if(!jueves){if(!viernes){if(!sabado){if(!domingo){{swal("Días sin definir","Por favor defina los días a laborar","info");return}}}}}}}}
    let tiempototal, cantidadFranjas,cantFranSinDes=0
    tiempototal= (horaFn*60+minFn)-(horaIni*60+minIni)
    if(tiempototal===0){swal("Horario sin definir","Por favor defina inicio, fin y franjas para generar el horario","info");return}
    if(tiempototal<0){tiempototal=24*60+tiempototal}
    cantidadFranjas= tiempototal/(60*horaFran+minFran+60*horaDes+minDes)
    cantFranSinDes= (tiempototal+60*horaDes+minDes)/(60*horaFran+minFran+60*horaDes+minDes)
    if(Number.isInteger(cantidadFranjas)||Number.isInteger(cantFranSinDes)){
        if(Number.isInteger(cantidadFranjas)){tiempoInicio=horaIni*60+minIni;
                for(var i = 0; i < cantidadFranjas; i++){
                    PonerHorario(i)}}
        if(Number.isInteger(cantFranSinDes)){tiempoInicio=horaIni*60+minIni;
                for(var i = 0; i < cantFranSinDes; i++){
                    PonerHorario(i)}}
    }else{
        swal({
            title:'Horario sin ajustar',
            text:'Por favor verifique los datos ingresados, al momento de revisar el horario y las franjas de turno no se encuentra un ajuste adecuado',
            icon:'error', //success , warning, info, error
            buttons: 'Aceptar',
        })
    }
   setfranja(franjas)
   console.log(franja)
 }

 const PonerHorario = (e) => {
    if(tiempoInicio>=1440){tiempoInicio=tiempoInicio-1440}
    inihFran=Math.trunc(tiempoInicio/60)
    inimFran= (tiempoInicio%60)
    tiempoInicio= tiempoInicio+(horaFran*60+minFran)
    if(tiempoInicio>=1440){tiempoInicio=tiempoInicio-1440}
    finhFran=Math.trunc(tiempoInicio/60)
    finmFran= (tiempoInicio%60)
    if(inihFran<12){jorI='am'}
    if(inihFran>11){jorI='pm'}
    if(inihFran===0){inihFran=12}
    if(inihFran>12){inihFran=inihFran-12}
    if(finhFran<12){jorF='am'}
    if(finhFran>11){jorF='pm'}
    if(finhFran===0){finhFran=12}
    if(finhFran>12){finhFran=finhFran-12}
    if(inimFran<10){ceroI='0'}
    if(finmFran<10){ceroF='0'}
    if(inimFran>9){ceroI=''}
    if(finmFran>9){ceroF=''}
    franjas[e]={id:e, turno:inihFran+':'+ceroI+inimFran+jorI+' - '+finhFran+':'+ceroF+finmFran+jorF} 
    tiempoInicio= tiempoInicio+(horaDes*60+minDes)
}

    return (
        <div className="w3-container w3-col m10 w3-center">
            <div className="w3-panel w3-white ">
                <div className="w3-panel w3-gray w3-text-indigo">
                    <h2><b>Ajuste de horario</b></h2>
                </div>
                <div className="w3-col m2 w3-panel w3-left-align">
                    <h3><label className="w3-text-indigo"><b>Días.</b></label></h3>                  
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setlunes(!lunes)} checked={lunes}/>
                        Lunes</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setmartes(!martes)} checked={martes}/>
                        Martes</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setmiercoles(!miercoles)} checked={miercoles}/>
                        Miércoles</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setjueves(!jueves)} checked={jueves}/>
                        Jueves</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setviernes(!viernes)} checked={viernes}/>
                        Viernes</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setsabado(!sabado)} checked={sabado}/>
                        Sábado</label></p>
                    <p>
                        <label className="w3-text-indigo">
                            <input className="w3-check" type="checkbox" onChange={e=>setdomingo(!domingo)} checked={domingo}/>
                        Domingo</label></p>
                </div>
                <div className="w3-col m10 w3-center w3-panel">
                    <div className="w3-col m7 w3-panel w3-left-align">
                        <label className="w3-text-indigo"><b>Título de cancha, franja o profesor</b></label>
                        <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo" 
                        style={{width:"50%"}} placeholder="título" title="escriba aquí el título de este horario, a qué o quien sera dedicado"
                        onChange={e=>settitulo(e.target.value)} value={titulo}/>
                    </div> 
                    <div className="w3-panel">
                        <div className="w3-col m12 w3-left-align">
                            <label className="w3-text-indigo"><b>Hora de inicio: </b> {horaIni===0?'12:':horaIni>12?horaIni-12+':':horaIni+':'}
                            {minIni<10?'0'+minIni:minIni}
                            {horaIni>11?' pm':' am'}</label>
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarIni(!mostraIni)} style={{cursor:'pointer',width:"95%"}}className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Hora: 
                            </div>
                            {mostraIni?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{sethoraIni(0);setmostrarIni(!mostraIni)}}>12am</li>
                                    <li onClick={()=>{sethoraIni(1);setmostrarIni(!mostraIni)}}>1am</li>
                                    <li onClick={()=>{sethoraIni(2);setmostrarIni(!mostraIni)}}>2am</li>
                                    <li onClick={()=>{sethoraIni(3);setmostrarIni(!mostraIni)}}>3am</li>
                                    <li onClick={()=>{sethoraIni(4);setmostrarIni(!mostraIni)}}>4am</li>
                                    <li onClick={()=>{sethoraIni(5);setmostrarIni(!mostraIni)}}>5am</li>
                                    <li onClick={()=>{sethoraIni(6);setmostrarIni(!mostraIni)}}>6am</li>
                                    <li onClick={()=>{sethoraIni(7);setmostrarIni(!mostraIni)}}>7am</li>
                                    <li onClick={()=>{sethoraIni(8);setmostrarIni(!mostraIni)}}>8am</li>
                                    <li onClick={()=>{sethoraIni(9);setmostrarIni(!mostraIni)}}>9am</li>
                                    <li onClick={()=>{sethoraIni(10);setmostrarIni(!mostraIni)}}>10am</li>
                                    <li onClick={()=>{sethoraIni(11);setmostrarIni(!mostraIni)}}>11am</li>
                                    <li onClick={()=>{sethoraIni(12);setmostrarIni(!mostraIni)}}>12pm</li>
                                    <li onClick={()=>{sethoraIni(13);setmostrarIni(!mostraIni)}}>1pm</li>
                                    <li onClick={()=>{sethoraIni(14);setmostrarIni(!mostraIni)}}>2pm</li>
                                    <li onClick={()=>{sethoraIni(15);setmostrarIni(!mostraIni)}}>3pm</li>
                                    <li onClick={()=>{sethoraIni(16);setmostrarIni(!mostraIni)}}>4pm</li>
                                    <li onClick={()=>{sethoraIni(17);setmostrarIni(!mostraIni)}}>5pm</li>
                                    <li onClick={()=>{sethoraIni(18);setmostrarIni(!mostraIni)}}>6pm</li>
                                    <li onClick={()=>{sethoraIni(19);setmostrarIni(!mostraIni)}}>7pm</li>
                                    <li onClick={()=>{sethoraIni(20);setmostrarIni(!mostraIni)}}>8pm</li>
                                    <li onClick={()=>{sethoraIni(21);setmostrarIni(!mostraIni)}}>9pm</li>
                                    <li onClick={()=>{sethoraIni(22);setmostrarIni(!mostraIni)}}>10pm</li>
                                    <li onClick={()=>{sethoraIni(23);setmostrarIni(!mostraIni)}}>11pm</li>
                                </ul></div>:null}
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarInim(!mostraInim)} style={{cursor:'pointer',width:"95%"}}
                            className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                            {mostraInim?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{setminIni(0);setmostrarInim(!mostraInim)}}>00</li>
                                    <li onClick={()=>{setminIni(1);setmostrarInim(!mostraInim)}}>01</li>
                                    <li onClick={()=>{setminIni(2);setmostrarInim(!mostraInim)}}>02</li>
                                    <li onClick={()=>{setminIni(3);setmostrarInim(!mostraInim)}}>03</li>
                                    <li onClick={()=>{setminIni(4);setmostrarInim(!mostraInim)}}>04</li>
                                    <li onClick={()=>{setminIni(5);setmostrarInim(!mostraInim)}}>05</li>
                                    <li onClick={()=>{setminIni(6);setmostrarInim(!mostraInim)}}>06</li>
                                    <li onClick={()=>{setminIni(7);setmostrarInim(!mostraInim)}}>07</li>
                                    <li onClick={()=>{setminIni(8);setmostrarInim(!mostraInim)}}>08</li>
                                    <li onClick={()=>{setminIni(9);setmostrarInim(!mostraInim)}}>09</li>
                                    <li onClick={()=>{setminIni(10);setmostrarInim(!mostraInim)}}>10</li>
                                    <li onClick={()=>{setminIni(11);setmostrarInim(!mostraInim)}}>11</li>
                                    <li onClick={()=>{setminIni(12);setmostrarInim(!mostraInim)}}>12</li>
                                    <li onClick={()=>{setminIni(13);setmostrarInim(!mostraInim)}}>13</li>
                                    <li onClick={()=>{setminIni(14);setmostrarInim(!mostraInim)}}>14</li>
                                    <li onClick={()=>{setminIni(15);setmostrarInim(!mostraInim)}}>15</li>
                                    <li onClick={()=>{setminIni(16);setmostrarInim(!mostraInim)}}>16</li>
                                    <li onClick={()=>{setminIni(17);setmostrarInim(!mostraInim)}}>17</li>
                                    <li onClick={()=>{setminIni(18);setmostrarInim(!mostraInim)}}>18</li>
                                    <li onClick={()=>{setminIni(19);setmostrarInim(!mostraInim)}}>19</li>
                                    <li onClick={()=>{setminIni(20);setmostrarInim(!mostraInim)}}>20</li>
                                    <li onClick={()=>{setminIni(21);setmostrarInim(!mostraInim)}}>21</li>
                                    <li onClick={()=>{setminIni(22);setmostrarInim(!mostraInim)}}>22</li>
                                    <li onClick={()=>{setminIni(23);setmostrarInim(!mostraInim)}}>23</li>
                                    <li onClick={()=>{setminIni(24);setmostrarInim(!mostraInim)}}>24</li>
                                    <li onClick={()=>{setminIni(25);setmostrarInim(!mostraInim)}}>25</li>
                                    <li onClick={()=>{setminIni(26);setmostrarInim(!mostraInim)}}>26</li>
                                    <li onClick={()=>{setminIni(27);setmostrarInim(!mostraInim)}}>27</li>
                                    <li onClick={()=>{setminIni(28);setmostrarInim(!mostraInim)}}>28</li>
                                    <li onClick={()=>{setminIni(29);setmostrarInim(!mostraInim)}}>29</li>
                                    <li onClick={()=>{setminIni(30);setmostrarInim(!mostraInim)}}>30</li>
                                    <li onClick={()=>{setminIni(31);setmostrarInim(!mostraInim)}}>31</li>
                                    <li onClick={()=>{setminIni(32);setmostrarInim(!mostraInim)}}>32</li>
                                    <li onClick={()=>{setminIni(33);setmostrarInim(!mostraInim)}}>33</li>
                                    <li onClick={()=>{setminIni(34);setmostrarInim(!mostraInim)}}>34</li>
                                    <li onClick={()=>{setminIni(35);setmostrarInim(!mostraInim)}}>35</li>
                                    <li onClick={()=>{setminIni(36);setmostrarInim(!mostraInim)}}>36</li>
                                    <li onClick={()=>{setminIni(37);setmostrarInim(!mostraInim)}}>37</li>
                                    <li onClick={()=>{setminIni(38);setmostrarInim(!mostraInim)}}>38</li>
                                    <li onClick={()=>{setminIni(39);setmostrarInim(!mostraInim)}}>39</li>
                                    <li onClick={()=>{setminIni(40);setmostrarInim(!mostraInim)}}>40</li>
                                    <li onClick={()=>{setminIni(41);setmostrarInim(!mostraInim)}}>41</li>
                                    <li onClick={()=>{setminIni(42);setmostrarInim(!mostraInim)}}>42</li>
                                    <li onClick={()=>{setminIni(43);setmostrarInim(!mostraInim)}}>43</li>
                                    <li onClick={()=>{setminIni(44);setmostrarInim(!mostraInim)}}>44</li>
                                    <li onClick={()=>{setminIni(45);setmostrarInim(!mostraInim)}}>45</li>
                                    <li onClick={()=>{setminIni(46);setmostrarInim(!mostraInim)}}>46</li>
                                    <li onClick={()=>{setminIni(47);setmostrarInim(!mostraInim)}}>47</li>
                                    <li onClick={()=>{setminIni(48);setmostrarInim(!mostraInim)}}>48</li>
                                    <li onClick={()=>{setminIni(49);setmostrarInim(!mostraInim)}}>49</li>
                                    <li onClick={()=>{setminIni(50);setmostrarInim(!mostraInim)}}>50</li>
                                    <li onClick={()=>{setminIni(51);setmostrarInim(!mostraInim)}}>51</li>
                                    <li onClick={()=>{setminIni(52);setmostrarInim(!mostraInim)}}>52</li>
                                    <li onClick={()=>{setminIni(53);setmostrarInim(!mostraInim)}}>53</li>
                                    <li onClick={()=>{setminIni(54);setmostrarInim(!mostraInim)}}>54</li>
                                    <li onClick={()=>{setminIni(55);setmostrarInim(!mostraInim)}}>55</li>
                                    <li onClick={()=>{setminIni(56);setmostrarInim(!mostraInim)}}>56</li>
                                    <li onClick={()=>{setminIni(57);setmostrarInim(!mostraInim)}}>57</li>
                                    <li onClick={()=>{setminIni(58);setmostrarInim(!mostraInim)}}>58</li>
                                    <li onClick={()=>{setminIni(59);setmostrarInim(!mostraInim)}}>59</li>
                                </ul></div>:null}
                        </div>
                    </div>
                    <div className="w3-panel">
                        <div className="w3-col m12 w3-left-align">
                            <label className="w3-text-indigo"><b>Franja de turno: </b> 
                            {horaFran<10?'0'+horaFran:horaFran} horas con   
                            {minFran<10?' 0'+minFran:' '+minFran} minutos
                            </label>
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarFran(!mostraFran)} style={{cursor:'pointer',width:"95%"}}className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Horas: 
                            </div>
                            {mostraFran?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{sethoraFran(0);setmostrarFran(!mostraFran)}}>00</li>
                                    <li onClick={()=>{sethoraFran(1);setmostrarFran(!mostraFran)}}>01</li>
                                    <li onClick={()=>{sethoraFran(2);setmostrarFran(!mostraFran)}}>02</li>
                                    <li onClick={()=>{sethoraFran(3);setmostrarFran(!mostraFran)}}>03</li>
                                    <li onClick={()=>{sethoraFran(4);setmostrarFran(!mostraFran)}}>04</li>
                                    <li onClick={()=>{sethoraFran(5);setmostrarFran(!mostraFran)}}>05</li>
                                    <li onClick={()=>{sethoraFran(6);setmostrarFran(!mostraFran)}}>06</li>
                                    <li onClick={()=>{sethoraFran(7);setmostrarFran(!mostraFran)}}>07</li>
                                    <li onClick={()=>{sethoraFran(8);setmostrarFran(!mostraFran)}}>08</li>
                                    <li onClick={()=>{sethoraFran(9);setmostrarFran(!mostraFran)}}>09</li>
                                    <li onClick={()=>{sethoraFran(10);setmostrarFran(!mostraFran)}}>10</li>
                                    <li onClick={()=>{sethoraFran(11);setmostrarFran(!mostraFran)}}>11</li>
                                    <li onClick={()=>{sethoraFran(12);setmostrarFran(!mostraFran)}}>12</li>
                                </ul></div>:null}
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarFranm(!mostraFranm)} style={{cursor:'pointer',width:"95%"}}
                            className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                            {mostraFranm?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{setminFran(0);setmostrarFranm(!mostraFranm)}}>00</li>
                                    <li onClick={()=>{setminFran(1);setmostrarFranm(!mostraFranm)}}>01</li>
                                    <li onClick={()=>{setminFran(2);setmostrarFranm(!mostraFranm)}}>02</li>
                                    <li onClick={()=>{setminFran(3);setmostrarFranm(!mostraFranm)}}>03</li>
                                    <li onClick={()=>{setminFran(4);setmostrarFranm(!mostraFranm)}}>04</li>
                                    <li onClick={()=>{setminFran(5);setmostrarFranm(!mostraFranm)}}>05</li>
                                    <li onClick={()=>{setminFran(6);setmostrarFranm(!mostraFranm)}}>06</li>
                                    <li onClick={()=>{setminFran(7);setmostrarFranm(!mostraFranm)}}>07</li>
                                    <li onClick={()=>{setminFran(8);setmostrarFranm(!mostraFranm)}}>08</li>
                                    <li onClick={()=>{setminFran(9);setmostrarFranm(!mostraFranm)}}>09</li>
                                    <li onClick={()=>{setminFran(10);setmostrarFranm(!mostraFranm)}}>10</li>
                                    <li onClick={()=>{setminFran(11);setmostrarFranm(!mostraFranm)}}>11</li>
                                    <li onClick={()=>{setminFran(12);setmostrarFranm(!mostraFranm)}}>12</li>
                                    <li onClick={()=>{setminFran(13);setmostrarFranm(!mostraFranm)}}>13</li>
                                    <li onClick={()=>{setminFran(14);setmostrarFranm(!mostraFranm)}}>14</li>
                                    <li onClick={()=>{setminFran(15);setmostrarFranm(!mostraFranm)}}>15</li>
                                    <li onClick={()=>{setminFran(16);setmostrarFranm(!mostraFranm)}}>16</li>
                                    <li onClick={()=>{setminFran(17);setmostrarFranm(!mostraFranm)}}>17</li>
                                    <li onClick={()=>{setminFran(18);setmostrarFranm(!mostraFranm)}}>18</li>
                                    <li onClick={()=>{setminFran(19);setmostrarFranm(!mostraFranm)}}>19</li>
                                    <li onClick={()=>{setminFran(20);setmostrarFranm(!mostraFranm)}}>20</li>
                                    <li onClick={()=>{setminFran(21);setmostrarFranm(!mostraFranm)}}>21</li>
                                    <li onClick={()=>{setminFran(22);setmostrarFranm(!mostraFranm)}}>22</li>
                                    <li onClick={()=>{setminFran(23);setmostrarFranm(!mostraFranm)}}>23</li>
                                    <li onClick={()=>{setminFran(24);setmostrarFranm(!mostraFranm)}}>24</li>
                                    <li onClick={()=>{setminFran(25);setmostrarFranm(!mostraFranm)}}>25</li>
                                    <li onClick={()=>{setminFran(26);setmostrarFranm(!mostraFranm)}}>26</li>
                                    <li onClick={()=>{setminFran(27);setmostrarFranm(!mostraFranm)}}>27</li>
                                    <li onClick={()=>{setminFran(28);setmostrarFranm(!mostraFranm)}}>28</li>
                                    <li onClick={()=>{setminFran(29);setmostrarFranm(!mostraFranm)}}>29</li>
                                    <li onClick={()=>{setminFran(30);setmostrarFranm(!mostraFranm)}}>30</li>
                                    <li onClick={()=>{setminFran(31);setmostrarFranm(!mostraFranm)}}>31</li>
                                    <li onClick={()=>{setminFran(32);setmostrarFranm(!mostraFranm)}}>32</li>
                                    <li onClick={()=>{setminFran(33);setmostrarFranm(!mostraFranm)}}>33</li>
                                    <li onClick={()=>{setminFran(34);setmostrarFranm(!mostraFranm)}}>34</li>
                                    <li onClick={()=>{setminFran(35);setmostrarFranm(!mostraFranm)}}>35</li>
                                    <li onClick={()=>{setminFran(36);setmostrarFranm(!mostraFranm)}}>36</li>
                                    <li onClick={()=>{setminFran(37);setmostrarFranm(!mostraFranm)}}>37</li>
                                    <li onClick={()=>{setminFran(38);setmostrarFranm(!mostraFranm)}}>38</li>
                                    <li onClick={()=>{setminFran(39);setmostrarFranm(!mostraFranm)}}>39</li>
                                    <li onClick={()=>{setminFran(40);setmostrarFranm(!mostraFranm)}}>40</li>
                                    <li onClick={()=>{setminFran(41);setmostrarFranm(!mostraFranm)}}>41</li>
                                    <li onClick={()=>{setminFran(42);setmostrarFranm(!mostraFranm)}}>42</li>
                                    <li onClick={()=>{setminFran(43);setmostrarFranm(!mostraFranm)}}>43</li>
                                    <li onClick={()=>{setminFran(44);setmostrarFranm(!mostraFranm)}}>44</li>
                                    <li onClick={()=>{setminFran(45);setmostrarFranm(!mostraFranm)}}>45</li>
                                    <li onClick={()=>{setminFran(46);setmostrarFranm(!mostraFranm)}}>46</li>
                                    <li onClick={()=>{setminFran(47);setmostrarFranm(!mostraFranm)}}>47</li>
                                    <li onClick={()=>{setminFran(48);setmostrarFranm(!mostraFranm)}}>48</li>
                                    <li onClick={()=>{setminFran(49);setmostrarFranm(!mostraFranm)}}>49</li>
                                    <li onClick={()=>{setminFran(50);setmostrarFranm(!mostraFranm)}}>50</li>
                                    <li onClick={()=>{setminFran(51);setmostrarFranm(!mostraFranm)}}>51</li>
                                    <li onClick={()=>{setminFran(52);setmostrarFranm(!mostraFranm)}}>52</li>
                                    <li onClick={()=>{setminFran(53);setmostrarFranm(!mostraFranm)}}>53</li>
                                    <li onClick={()=>{setminFran(54);setmostrarFranm(!mostraFranm)}}>54</li>
                                    <li onClick={()=>{setminFran(55);setmostrarFranm(!mostraFranm)}}>55</li>
                                    <li onClick={()=>{setminFran(56);setmostrarFranm(!mostraFranm)}}>56</li>
                                    <li onClick={()=>{setminFran(57);setmostrarFranm(!mostraFranm)}}>57</li>
                                    <li onClick={()=>{setminFran(58);setmostrarFranm(!mostraFranm)}}>58</li>
                                    <li onClick={()=>{setminFran(59);setmostrarFranm(!mostraFranm)}}>59</li>
                                </ul></div>:null}
                        </div>
                    </div>
                    <div className="w3-panel">
                        <div className="w3-col m12 w3-left-align">
                            <label className="w3-text-indigo"><b>Franja de descanso: </b> 
                            {horaDes<10?'0'+horaDes:horaDes} horas con   
                            {minDes<10?' 0'+minDes:' '+minDes} minutos
                            </label>
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarDes(!mostraDes)} style={{cursor:'pointer',width:"95%"}}className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Horas: 
                            </div>
                            {mostraDes?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{sethoraDes(0);setmostrarDes(!mostraDes)}}>00</li>
                                    <li onClick={()=>{sethoraDes(1);setmostrarDes(!mostraDes)}}>01</li>
                                    <li onClick={()=>{sethoraDes(2);setmostrarDes(!mostraDes)}}>02</li>
                                    <li onClick={()=>{sethoraDes(3);setmostrarDes(!mostraDes)}}>03</li>
                                    <li onClick={()=>{sethoraDes(4);setmostrarDes(!mostraDes)}}>04</li>
                                    <li onClick={()=>{sethoraDes(5);setmostrarDes(!mostraDes)}}>05</li>
                                    <li onClick={()=>{sethoraDes(6);setmostrarDes(!mostraDes)}}>06</li>
                                    <li onClick={()=>{sethoraDes(7);setmostrarDes(!mostraDes)}}>07</li>
                                    <li onClick={()=>{sethoraDes(8);setmostrarDes(!mostraDes)}}>08</li>
                                    <li onClick={()=>{sethoraDes(9);setmostrarDes(!mostraDes)}}>09</li>
                                    <li onClick={()=>{sethoraDes(10);setmostrarDes(!mostraDes)}}>10</li>
                                    <li onClick={()=>{sethoraDes(11);setmostrarDes(!mostraDes)}}>11</li>
                                    <li onClick={()=>{sethoraDes(12);setmostrarDes(!mostraDes)}}>12</li>
                                </ul></div>:null}
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarDesm(!mostraDesm)} style={{cursor:'pointer',width:"95%"}}
                            className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                            {mostraDesm?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{setminDes(0);setmostrarDesm(!mostraDesm)}}>00</li>
                                    <li onClick={()=>{setminDes(1);setmostrarDesm(!mostraDesm)}}>01</li>
                                    <li onClick={()=>{setminDes(2);setmostrarDesm(!mostraDesm)}}>02</li>
                                    <li onClick={()=>{setminDes(3);setmostrarDesm(!mostraDesm)}}>03</li>
                                    <li onClick={()=>{setminDes(4);setmostrarDesm(!mostraDesm)}}>04</li>
                                    <li onClick={()=>{setminDes(5);setmostrarDesm(!mostraDesm)}}>05</li>
                                    <li onClick={()=>{setminDes(6);setmostrarDesm(!mostraDesm)}}>06</li>
                                    <li onClick={()=>{setminDes(7);setmostrarDesm(!mostraDesm)}}>07</li>
                                    <li onClick={()=>{setminDes(8);setmostrarDesm(!mostraDesm)}}>08</li>
                                    <li onClick={()=>{setminDes(9);setmostrarDesm(!mostraDesm)}}>09</li>
                                    <li onClick={()=>{setminDes(10);setmostrarDesm(!mostraDesm)}}>10</li>
                                    <li onClick={()=>{setminDes(11);setmostrarDesm(!mostraDesm)}}>11</li>
                                    <li onClick={()=>{setminDes(12);setmostrarDesm(!mostraDesm)}}>12</li>
                                    <li onClick={()=>{setminDes(13);setmostrarDesm(!mostraDesm)}}>13</li>
                                    <li onClick={()=>{setminDes(14);setmostrarDesm(!mostraDesm)}}>14</li>
                                    <li onClick={()=>{setminDes(15);setmostrarDesm(!mostraDesm)}}>15</li>
                                    <li onClick={()=>{setminDes(16);setmostrarDesm(!mostraDesm)}}>16</li>
                                    <li onClick={()=>{setminDes(17);setmostrarDesm(!mostraDesm)}}>17</li>
                                    <li onClick={()=>{setminDes(18);setmostrarDesm(!mostraDesm)}}>18</li>
                                    <li onClick={()=>{setminDes(19);setmostrarDesm(!mostraDesm)}}>19</li>
                                    <li onClick={()=>{setminDes(20);setmostrarDesm(!mostraDesm)}}>20</li>
                                    <li onClick={()=>{setminDes(21);setmostrarDesm(!mostraDesm)}}>21</li>
                                    <li onClick={()=>{setminDes(22);setmostrarDesm(!mostraDesm)}}>22</li>
                                    <li onClick={()=>{setminDes(23);setmostrarDesm(!mostraDesm)}}>23</li>
                                    <li onClick={()=>{setminDes(24);setmostrarDesm(!mostraDesm)}}>24</li>
                                    <li onClick={()=>{setminDes(25);setmostrarDesm(!mostraDesm)}}>25</li>
                                    <li onClick={()=>{setminDes(26);setmostrarDesm(!mostraDesm)}}>26</li>
                                    <li onClick={()=>{setminDes(27);setmostrarDesm(!mostraDesm)}}>27</li>
                                    <li onClick={()=>{setminDes(28);setmostrarDesm(!mostraDesm)}}>28</li>
                                    <li onClick={()=>{setminDes(29);setmostrarDesm(!mostraDesm)}}>29</li>
                                    <li onClick={()=>{setminDes(30);setmostrarDesm(!mostraDesm)}}>30</li>
                                    <li onClick={()=>{setminDes(31);setmostrarDesm(!mostraDesm)}}>31</li>
                                    <li onClick={()=>{setminDes(32);setmostrarDesm(!mostraDesm)}}>32</li>
                                    <li onClick={()=>{setminDes(33);setmostrarDesm(!mostraDesm)}}>33</li>
                                    <li onClick={()=>{setminDes(34);setmostrarDesm(!mostraDesm)}}>34</li>
                                    <li onClick={()=>{setminDes(35);setmostrarDesm(!mostraDesm)}}>35</li>
                                    <li onClick={()=>{setminDes(36);setmostrarDesm(!mostraDesm)}}>36</li>
                                    <li onClick={()=>{setminDes(37);setmostrarDesm(!mostraDesm)}}>37</li>
                                    <li onClick={()=>{setminDes(38);setmostrarDesm(!mostraDesm)}}>38</li>
                                    <li onClick={()=>{setminDes(39);setmostrarDesm(!mostraDesm)}}>39</li>
                                    <li onClick={()=>{setminDes(40);setmostrarDesm(!mostraDesm)}}>40</li>
                                    <li onClick={()=>{setminDes(41);setmostrarDesm(!mostraDesm)}}>41</li>
                                    <li onClick={()=>{setminDes(42);setmostrarDesm(!mostraDesm)}}>42</li>
                                    <li onClick={()=>{setminDes(43);setmostrarDesm(!mostraDesm)}}>43</li>
                                    <li onClick={()=>{setminDes(44);setmostrarDesm(!mostraDesm)}}>44</li>
                                    <li onClick={()=>{setminDes(45);setmostrarDesm(!mostraDesm)}}>45</li>
                                    <li onClick={()=>{setminDes(46);setmostrarDesm(!mostraDesm)}}>46</li>
                                    <li onClick={()=>{setminDes(47);setmostrarDesm(!mostraDesm)}}>47</li>
                                    <li onClick={()=>{setminDes(48);setmostrarDesm(!mostraDesm)}}>48</li>
                                    <li onClick={()=>{setminDes(49);setmostrarDesm(!mostraDesm)}}>49</li>
                                    <li onClick={()=>{setminDes(50);setmostrarDesm(!mostraDesm)}}>50</li>
                                    <li onClick={()=>{setminDes(51);setmostrarDesm(!mostraDesm)}}>51</li>
                                    <li onClick={()=>{setminDes(52);setmostrarDesm(!mostraDesm)}}>52</li>
                                    <li onClick={()=>{setminDes(53);setmostrarDesm(!mostraDesm)}}>53</li>
                                    <li onClick={()=>{setminDes(54);setmostrarDesm(!mostraDesm)}}>54</li>
                                    <li onClick={()=>{setminDes(55);setmostrarDesm(!mostraDesm)}}>55</li>
                                    <li onClick={()=>{setminDes(56);setmostrarDesm(!mostraDesm)}}>56</li>
                                    <li onClick={()=>{setminDes(57);setmostrarDesm(!mostraDesm)}}>57</li>
                                    <li onClick={()=>{setminDes(58);setmostrarDesm(!mostraDesm)}}>58</li>
                                    <li onClick={()=>{setminDes(59);setmostrarDesm(!mostraDesm)}}>59</li>
                                </ul></div>:null}
                        </div>
                    </div>
                    <div className="w3-panel">
                        <div className="w3-col m12 w3-left-align">
                            <label className="w3-text-indigo"><b>Hora de fin: </b> {horaFn===0?'12:':horaFn>12?horaFn-12+':':horaFn+':'}
                            {minFn<10?'0'+minFn:minFn}
                            {horaFn>11?' pm':' am'}</label>
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarFn(!mostraFn)} style={{cursor:'pointer',width:"95%"}}className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Hora: 
                            </div>
                        {mostraFn?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                            <ul className="w3-ul w3-hoverable">
                                <li onClick={()=>{sethoraFn(0);setmostrarFn(!mostraFn)}}>12am</li>
                                <li onClick={()=>{sethoraFn(1);setmostrarFn(!mostraFn)}}>1am</li>
                                <li onClick={()=>{sethoraFn(2);setmostrarFn(!mostraFn)}}>2am</li>
                                <li onClick={()=>{sethoraFn(3);setmostrarFn(!mostraFn)}}>3am</li>
                                <li onClick={()=>{sethoraFn(4);setmostrarFn(!mostraFn)}}>4am</li>
                                <li onClick={()=>{sethoraFn(5);setmostrarFn(!mostraFn)}}>5am</li>
                                <li onClick={()=>{sethoraFn(6);setmostrarFn(!mostraFn)}}>6am</li>
                                <li onClick={()=>{sethoraFn(7);setmostrarFn(!mostraFn)}}>7am</li>
                                <li onClick={()=>{sethoraFn(8);setmostrarFn(!mostraFn)}}>8am</li>
                                <li onClick={()=>{sethoraFn(9);setmostrarFn(!mostraFn)}}>9am</li>
                                <li onClick={()=>{sethoraFn(10);setmostrarFn(!mostraFn)}}>10am</li>
                                <li onClick={()=>{sethoraFn(11);setmostrarFn(!mostraFn)}}>11am</li>
                                <li onClick={()=>{sethoraFn(12);setmostrarFn(!mostraFn)}}>12pm</li>
                                <li onClick={()=>{sethoraFn(13);setmostrarFn(!mostraFn)}}>1pm</li>
                                <li onClick={()=>{sethoraFn(14);setmostrarFn(!mostraFn)}}>2pm</li>
                                <li onClick={()=>{sethoraFn(15);setmostrarFn(!mostraFn)}}>3pm</li>
                                <li onClick={()=>{sethoraFn(16);setmostrarFn(!mostraFn)}}>4pm</li>
                                <li onClick={()=>{sethoraFn(17);setmostrarFn(!mostraFn)}}>5pm</li>
                                <li onClick={()=>{sethoraFn(18);setmostrarFn(!mostraFn)}}>6pm</li>
                                <li onClick={()=>{sethoraFn(19);setmostrarFn(!mostraFn)}}>7pm</li>
                                <li onClick={()=>{sethoraFn(20);setmostrarFn(!mostraFn)}}>8pm</li>
                                <li onClick={()=>{sethoraFn(21);setmostrarFn(!mostraFn)}}>9pm</li>
                                <li onClick={()=>{sethoraFn(22);setmostrarFn(!mostraFn)}}>10pm</li>
                                <li onClick={()=>{sethoraFn(23);setmostrarFn(!mostraFn)}}>11pm</li>
                            </ul></div>:null}
                        </div>
                        <div className="w3-col m6 w3-left-align">
                            <div onClick={()=>setmostrarFnm(!mostraFnm)} style={{cursor:'pointer',width:"95%"}}
                            className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                            {mostraFnm?<div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                <ul className="w3-ul w3-hoverable">
                                    <li onClick={()=>{setminFn(0);setmostrarFnm(!mostraFnm)}}>00</li>
                                    <li onClick={()=>{setminFn(1);setmostrarFnm(!mostraFnm)}}>01</li>
                                    <li onClick={()=>{setminFn(2);setmostrarFnm(!mostraFnm)}}>02</li>
                                    <li onClick={()=>{setminFn(3);setmostrarFnm(!mostraFnm)}}>03</li>
                                    <li onClick={()=>{setminFn(4);setmostrarFnm(!mostraFnm)}}>04</li>
                                    <li onClick={()=>{setminFn(5);setmostrarFnm(!mostraFnm)}}>05</li>
                                    <li onClick={()=>{setminFn(6);setmostrarFnm(!mostraFnm)}}>06</li>
                                    <li onClick={()=>{setminFn(7);setmostrarFnm(!mostraFnm)}}>07</li>
                                    <li onClick={()=>{setminFn(8);setmostrarFnm(!mostraFnm)}}>08</li>
                                    <li onClick={()=>{setminFn(9);setmostrarFnm(!mostraFnm)}}>09</li>
                                    <li onClick={()=>{setminFn(10);setmostrarFnm(!mostraFnm)}}>10</li>
                                    <li onClick={()=>{setminFn(11);setmostrarFnm(!mostraFnm)}}>11</li>
                                    <li onClick={()=>{setminFn(12);setmostrarFnm(!mostraFnm)}}>12</li>
                                    <li onClick={()=>{setminFn(13);setmostrarFnm(!mostraFnm)}}>13</li>
                                    <li onClick={()=>{setminFn(14);setmostrarFnm(!mostraFnm)}}>14</li>
                                    <li onClick={()=>{setminFn(15);setmostrarFnm(!mostraFnm)}}>15</li>
                                    <li onClick={()=>{setminFn(16);setmostrarFnm(!mostraFnm)}}>16</li>
                                    <li onClick={()=>{setminFn(17);setmostrarFnm(!mostraFnm)}}>17</li>
                                    <li onClick={()=>{setminFn(18);setmostrarFnm(!mostraFnm)}}>18</li>
                                    <li onClick={()=>{setminFn(19);setmostrarFnm(!mostraFnm)}}>19</li>
                                    <li onClick={()=>{setminFn(20);setmostrarFnm(!mostraFnm)}}>20</li>
                                    <li onClick={()=>{setminFn(21);setmostrarFnm(!mostraFnm)}}>21</li>
                                    <li onClick={()=>{setminFn(22);setmostrarFnm(!mostraFnm)}}>22</li>
                                    <li onClick={()=>{setminFn(23);setmostrarFnm(!mostraFnm)}}>23</li>
                                    <li onClick={()=>{setminFn(24);setmostrarFnm(!mostraFnm)}}>24</li>
                                    <li onClick={()=>{setminFn(25);setmostrarFnm(!mostraFnm)}}>25</li>
                                    <li onClick={()=>{setminFn(26);setmostrarFnm(!mostraFnm)}}>26</li>
                                    <li onClick={()=>{setminFn(27);setmostrarFnm(!mostraFnm)}}>27</li>
                                    <li onClick={()=>{setminFn(28);setmostrarFnm(!mostraFnm)}}>28</li>
                                    <li onClick={()=>{setminFn(29);setmostrarFnm(!mostraFnm)}}>29</li>
                                    <li onClick={()=>{setminFn(30);setmostrarFnm(!mostraFnm)}}>30</li>
                                    <li onClick={()=>{setminFn(31);setmostrarFnm(!mostraFnm)}}>31</li>
                                    <li onClick={()=>{setminFn(32);setmostrarFnm(!mostraFnm)}}>32</li>
                                    <li onClick={()=>{setminFn(33);setmostrarFnm(!mostraFnm)}}>33</li>
                                    <li onClick={()=>{setminFn(34);setmostrarFnm(!mostraFnm)}}>34</li>
                                    <li onClick={()=>{setminFn(35);setmostrarFnm(!mostraFnm)}}>35</li>
                                    <li onClick={()=>{setminFn(36);setmostrarFnm(!mostraFnm)}}>36</li>
                                    <li onClick={()=>{setminFn(37);setmostrarFnm(!mostraFnm)}}>37</li>
                                    <li onClick={()=>{setminFn(38);setmostrarFnm(!mostraFnm)}}>38</li>
                                    <li onClick={()=>{setminFn(39);setmostrarFnm(!mostraFnm)}}>39</li>
                                    <li onClick={()=>{setminFn(40);setmostrarFnm(!mostraFnm)}}>40</li>
                                    <li onClick={()=>{setminFn(41);setmostrarFnm(!mostraFnm)}}>41</li>
                                    <li onClick={()=>{setminFn(42);setmostrarFnm(!mostraFnm)}}>42</li>
                                    <li onClick={()=>{setminFn(43);setmostrarFnm(!mostraFnm)}}>43</li>
                                    <li onClick={()=>{setminFn(44);setmostrarFnm(!mostraFnm)}}>44</li>
                                    <li onClick={()=>{setminFn(45);setmostrarFnm(!mostraFnm)}}>45</li>
                                    <li onClick={()=>{setminFn(46);setmostrarFnm(!mostraFnm)}}>46</li>
                                    <li onClick={()=>{setminFn(47);setmostrarFnm(!mostraFnm)}}>47</li>
                                    <li onClick={()=>{setminFn(48);setmostrarFnm(!mostraFnm)}}>48</li>
                                    <li onClick={()=>{setminFn(49);setmostrarFnm(!mostraFnm)}}>49</li>
                                    <li onClick={()=>{setminFn(50);setmostrarFnm(!mostraFnm)}}>50</li>
                                    <li onClick={()=>{setminFn(51);setmostrarFnm(!mostraFnm)}}>51</li>
                                    <li onClick={()=>{setminFn(52);setmostrarFnm(!mostraFnm)}}>52</li>
                                    <li onClick={()=>{setminFn(53);setmostrarFnm(!mostraFnm)}}>53</li>
                                    <li onClick={()=>{setminFn(54);setmostrarFnm(!mostraFnm)}}>54</li>
                                    <li onClick={()=>{setminFn(55);setmostrarFnm(!mostraFnm)}}>55</li>
                                    <li onClick={()=>{setminFn(56);setmostrarFnm(!mostraFnm)}}>56</li>
                                    <li onClick={()=>{setminFn(57);setmostrarFnm(!mostraFnm)}}>57</li>
                                    <li onClick={()=>{setminFn(58);setmostrarFnm(!mostraFnm)}}>58</li>
                                    <li onClick={()=>{setminFn(59);setmostrarFnm(!mostraFnm)}}>59</li>
                                </ul>
                            </div>:null}
                        </div>
                    </div> 
                </div>
                <div className="w3-col m12 w3-panel w3-center">
                    <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                    onClick={validarDatos}>
                        Validar y crear
                    </button>
                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                    onClick={limpiarDatos} >
                        Limpiar
                    </button>
                </div>
            </div>
            <div>
                <CrearTablaHorario franjas={franja} horaInicio={horaIni} minIni={minIni} horaFran={horaFran} minFran={minFran}
                horaDes={horaDes} minDes={minDes} lunes={lunes} martes={martes} miercoles={miercoles}
                jueves={jueves} viernes={viernes} sabado={sabado} domingo={domingo} titulo={titulo}/>
            </div>
        </div>
    )
}
