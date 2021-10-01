import React, {useState} from 'react';
import imagenEncabezado from '../imagenes/imagenEnc.jpg';
import axios from 'axios'

//creamos una const para dar estilo a nuestro título;
const TituloEstilo = {
  color: 'white',
  fontFamily: 'fantasy',
  textAlign: 'center',
  fontSize: '60px', //camelCase property
  //textAlign:'left'
}

//constante para limitar el tamaño del div
const Tamano = {
  //width:'100%',
  height:'300px',
  overFlow:'auto',
}


var idEm = '';
 

export function Encabezado() {

const [titulo, setTitulo]= useState('')

  async function componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/empresas');
    idEm = res.data.map(user => user._id).join()
    const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
    setTitulo(resp.data.message.title);
  }

componentDidMount()

  
    return (
        <div className="w3-display-container" style={Tamano}>
          <img src={imagenEncabezado} alt="Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
            title= "Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
            width="100%" height="100%" className=""/>
          <div className="w3-display-middle w3-large">
            <h1 style={TituloEstilo}>
              {titulo}
            </h1>
          </div>
        </div>
    );
  }
 //<Route path="/" exact render={() => <RegistroUsers titulo="Registrarme"/>}/>