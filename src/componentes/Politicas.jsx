import React, {useState, Fragment}from 'react'
import { UsuariosAdmin } from './UsuariosAdmin';

export function Politicas () {
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
                    <UsuariosAdmin/>
                  </li>
                  <li>
                    
                  </li>                
                </ul>
                  
              </div>  
          )}
        </div>
      </Fragment>
    );
  };
