import React, {useState, Fragment}from 'react'
import { ConfHorario } from './ConfHorario';
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
                  <h3>Ingrese aquí las Profesiones, áreas o dependencias si maneja más de una. </h3>
                  <UsuariosAdmin/>
                </div>
                <div class="w3-panel">
                  <ConfHorario/>
                </div>
                <div class="w3-panel">
                  
                </div>
              </div>  
          )}
        </div>
      </Fragment>
    );
  };
