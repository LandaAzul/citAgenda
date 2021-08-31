import React, {Fragment} from 'react';
import { IniSesionOReg } from './IniSesionOReg';




export function Encabezado({imagen, titulo, inicioSesion}) {
  
    return (
      <Fragment>
        <div class="w3-col m3  w3-center">
          Aqui va la imagen
        </div>
        <div class="w3-col m6  w3-center">
          Aqui debe retornar el titulo
        </div>
        <div class="w3-container w3-col m3 w3-card">
          <IniSesionOReg/>
        </div>
      </Fragment>
      
    );
  }
