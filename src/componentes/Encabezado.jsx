import React, {Fragment} from 'react';
import {TituloYDescripcion} from './TituloYDescripcion';
import { UploadImage } from './UploadImage';


export function Encabezado() {
    return (
      <Fragment>
        <div className="Encabezado">
       <h1>
         CitAgenda
       </h1>
      </div>
      <div>
        <TituloYDescripcion titulo='Escriba aquí el nombre de su organizacion' LongitudTexto = {30} />{/* Aqui definimos la longitud del titulo  */}
      </div>
      <div>
        <UploadImage/>
      </div>
      </Fragment>
      
    );
  }
