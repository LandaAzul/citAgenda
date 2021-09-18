import React, {Fragment} from 'react';
import imagenEncabezado from '../imagenes/logoEncabezado.jpg';
import { InicioSesion } from './InicioSesion';
import { RegistroUsers } from './RegistroUsers';

//creamos una const para dar estilo a nuestro título;
const tituloEstilo = {
  color: '#00ced1',
  fontSize: '65px', //camelCase property
  //textAlign:'left'
}


export function Encabezado() {
  
    return (
      <div class="w3-container w3-pale-blue w3-padding-16">
        <div class="w3-col m5  w3-center">
          <img src={imagenEncabezado} alt="Imagen tomada de https://pixabay.com/es/" title={"Imagen tomada de https://pixabay.com/es/"} width="350" height="130" class="w3-circle w3-hover-opacity w3-sepia-min"/>
        </div>
        <div class="w3-col m4">
          <h1 style={tituloEstilo}>
            CitAgenda.
          </h1>
        </div>
        <div class="w3-container w3-col m3 w3-right-align">
          <div class="w3-section">
            <InicioSesion/>
          </div>
          <div class="w3-section">
              <RegistroUsers />
          </div>            
        </div>
      </div>
      
    );
  }
