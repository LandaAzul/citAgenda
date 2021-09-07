import React, {Fragment} from 'react';


//creamos una const para dar estilo a nuestro título;
const tituloEstilo = {
  color: '#ffffe0',
  fontSize: '60px', //camelCase property
  textAlign:'left'
}


export function Encabezado() {
  
    return (
      <Fragment>
        <div class="w3-col m4  w3-center">
          Aquí va la imagen
        </div>
        <div class="w3-col m5  w3-center">
          <h1 style={tituloEstilo}>
            CitAgenda.
          </h1>
        </div>
        <div class="w3-container w3-col m3 w3-center">
          Aqui van los datos del usuario
        </div>
      </Fragment>
      
    );
  }
