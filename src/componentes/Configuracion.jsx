import React, { Fragment, useState } from 'react';
import { Textos } from './Textos';
import {UploadImage} from './UploadImage'

export function Configuracion () {

  const [configuracion, setConfiguracion] = useState(true);
  
  return (
    <Fragment>
      <div>
        <button
            type="button"
            onClick={() => {
            setConfiguracion(!configuracion);
            }}
        >
            {configuracion ? 'Mostrar configuración' : 'Ocultar configuración'}
        </button>

        {configuracion ? (
            <div></div>
        ) : (
            <div>
              <ul>
                <li>
                  Agregue aquí la imagen de su entidad.
                    <UploadImage/>
                </li>
                <li>
                    <Textos texto={'Ingrese aquí el título de su entidad'} LongitudTexto={30}/>
                </li>
                <li>
                    <Textos texto={'Ingrese aquí la descripción de su entidad'} LongitudTexto={400}/>
                </li>                
              </ul>
                
            </div>  
        )}
      </div>
    </Fragment>
  );
};