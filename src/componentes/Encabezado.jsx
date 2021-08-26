import React, {Fragment} from 'react';
import { IniSesionOReg } from './IniSesionOReg';




export function Encabezado({imagen, titulo, inicioSesion}) {
  
    return (
      <Fragment>
        <div>
          Aqui va la imagen
        </div>
        <div>
          Aqui debe retornar el titulo
        </div>
        <div>
          <IniSesionOReg/>
        </div>
      </Fragment>
      
    );
  }
