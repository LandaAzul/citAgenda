import React, {useState, } from 'react';
import imagen1 from '../imagenes/imagenEnc.jpg';
import imagen2 from '../imagenes/imagenEnc2.jpg';
import imagen3 from '../imagenes/imagenEnc3.jpg';
import axios from 'axios'
import '../index.css'


//creamos una const para dar estilo a nuestro título;
const TituloEstilo = {
  color: '#4BC61C',
  lineHeight:'55px',
  fontSize: '65px',
  textShadow: '7px 7px 5px black',
  //width:'90%'
}
const TituloEstiloP = {
  color: '#4BC61C',
  lineHeight:'35px',
  fontSize: '30px',
  textShadow: '3px 3px 3px black',
}

//constante para limitar el tamaño del div
const Tamano = {
  //width:'100%',
  height:'350px',
  //overFlow:'auto',
}


var idEm = '';

export function Encabezado() {

const [titulo, setTitulo] = useState('Null')
const [control, setControl] = useState(1)

const componentDidMount= async() => {
    const res = await axios.get('http://localhost:4000/api/empresas');
    idEm = res.data.map(user => user._id).join()
    const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
    setTitulo(resp.data.message.title);
  }

componentDidMount()


const avanzar = () =>{
  setControl(control+1)
  if(control>2)
  {
    setControl(1)
  }
} 

const devolver = () =>{
  setControl(control-1)
  if(control<2)
  {
    setControl(3)
  }
} 


/*// para esta funcion es necesario importar en React {useEffect}
useEffect(() => {
    setTimeout(() => {
      avanzar();
      }, 5000);
  });*/


return (
        <div>
          {(titulo==='Null')?<div className="w3-container w3-white w3-center">
            <h1 style={{color: 'red',}} >
              <b>No conectado con el servidor o más de un arreglo en datos de empresa!!!</b>
            </h1>
          </div>:
          <div style={TituloEstiloP}className="w3-container w3-hide-large w3-hide-medium w3-metro-dark-orange w3-center">
            <h1>
              <b>{titulo}</b>
            </h1>
          </div>}
          <div className="w3-display-container" style={Tamano}>
            {(control===1)?
            <img src={imagen1} alt="raqueta en cancha de tenis"
              title= "Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
              width="100%" height="100%" className=""/>
              :null}
            {(control===2)?
              <img src={imagen2} alt="entrada al club"            
              width="100%" height="100%" className=""/>
              :null}
            {(control===3)?
              <img src={imagen3} alt="canchas"            
              width="100%" height="100%" className=""/>
              :null}
            {(titulo==='Null')?null:
            <div className="w3-display-middle w3-large w3-center">
              <div className="w3-container w3-hide-small">
                <h1 style={TituloEstilo}>
                  {titulo}
                </h1>
              </div>
            </div>
            }
            <div className="w3-display-left w3-container">
              <button className="w3-button w3-black w3-round-xlarge w3-hover-white w3-small"onClick={devolver}> volver </button>
            </div>
            <div className="w3-display-right w3-container">
              <button className="w3-button w3-black w3-round-xlarge w3-hover-white w3-small"
              onClick={avanzar}>siguiente</button>
            </div>
          </div>
        </div>
    );
  }
 //<Route path="/" exact render={() => <RegistroUsers titulo="Registrarme"/>}/>