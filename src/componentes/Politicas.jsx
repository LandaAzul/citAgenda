import React, {useState, Fragment}from 'react'
import { UsuariosAdmin } from './UsuariosAdmin';

export function Politicas () {
    const [configuracion, setConfiguracion] = useState(true);
    
    return (
      <Fragment>
        <div class="w3-panel">
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
                <div class="w3-panel">
                  <UsuariosAdmin/>
                </div>
                <div class="w3-panel">
                  
                </div>
                <div class="w3-panel">
                  
                </div>
              </div>  
          )}
        </div>
      </Fragment>
    );
  };
