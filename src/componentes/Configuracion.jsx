import React, { Fragment, useState } from 'react';
import { Textos } from './Textos';
import {UploadImage} from './UploadImage'

export function Configuracion () {

  const [configuracion, setConfiguracion] = useState(true);
  
  return (
    <Fragment>
      <div  class="w3-panel" >
        <button
            type="button"
            onClick={() => {
            setConfiguracion(!configuracion);
            }}
        >
            {configuracion ? 'Mostrar configuración' : 'Ocultar configuración'}
        </button>

        {configuracion ? (
            <div>{//este div queda vacio para que no muestre nada al moemnto de ocultar
            }</div>
        ) : (
            <div>              
                Agregue aquí la imagen de su entidad.
                <div class="w3-panel">
                  <UploadImage/>
                </div>
                <div class="w3-panel">
                  <Textos texto={'Ingrese aquí el título de su entidad'} LongitudTexto={30}/>
                </div>
                <div class="w3-panel">
                  <Textos texto={'Ingrese aquí la descripción de su entidad'} LongitudTexto={400}/>
                </div>
            </div>  
        )}
      </div>
    </Fragment>
  );
};