import React, {Fragment} from 'react';
import imagenEncabezado from '../imagenes/logoEncabezado.jpg';
import { InicioSesion } from './InicioSesion';
import { RegistroUsers } from './RegistroUsers';

//creamos una const para dar estilo a nuestro título;
const TituloEstilo = {
  color: '#00ced1',
  fontSize: '65px', //camelCase property
  //textAlign:'left'
}


export function Encabezado() {
  
    return (
      <div className="w3-container w3-pale-blue w3-padding-16">
        <div className="w3-col m5  w3-center">
          <img src={imagenEncabezado} alt="Agenda sobre mesa"  width="350" height="130" className="w3-circle w3-hover-opacity w3-sepia-min"/>
        </div>
        <div className="w3-col m4">
          <h1 style={TituloEstilo}>
            CitAgenda.
          </h1>
        </div>
        <div className="w3-container w3-col m3 w3-right-align">
          <div className="w3-section">
            <InicioSesion/>
          </div>
          <div className="w3-section">
            <RegistroUsers />
          </div>            
        </div>
      </div>
      
    );
  }
