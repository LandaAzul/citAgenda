import React, {useState} from 'react';
import imagenEncabezado from '../imagenes/logoEncabezado.jpg';
import { InicioSesion } from './InicioSesion';
import { RegistroUsers } from './RegistroUsers';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

//creamos una const para dar estilo a nuestro título;
const TituloEstilo = {
  color: 'white',
  fontFamily: 'fantasy',
  fontSize: '60px', //camelCase property
  //textAlign:'left'
}

const Tamano = {
  //width:'100%',
  height:'250px',
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
      <Router>
        <div className="w3-display-container w3-padding-16" style={Tamano}>
          
          <img src={imagenEncabezado} alt="Agenda sobre mesa"  width="100%" height="100%" className="w3-sepia-min"/>
          <div className="w3-display-middle w3-large">
            <h1 style={TituloEstilo}>
              {titulo}
            </h1>
          </div>
          <div className="w3-display-right w3-container">
            <Route path="/" exact component={InicioSesion}/>
            <Route path="/" exact render={() => <RegistroUsers titulo="Registrarme"/>}/>
            {//<Route path="/users" component={}/> 
            }
          </div>
          
        </div>
      </Router>
    );
  }
