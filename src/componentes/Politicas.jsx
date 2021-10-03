import React, { useState, Fragment } from 'react'
import { ConfHorario } from './ConfHorario';


export function Politicas() {
  const [configuracion, setConfiguracion] = useState(true);

  return (

    <div className="w3-panel w3-card w3-margin">
      <div>
        <h3>
          Configure aquí las políticas o restricciones para su centro de agenda!!!
        </h3>
      </div>
      <div className="w3-panel">
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
            {/*<div className="w3-panel">
              <h3>Ingrese aquí las Profesiones, áreas o dependencias si maneja más de una. </h3>
              <UsuariosAdmin />
              </div>*/}
            <div className="w3-panel">
              <ConfHorario />
            </div>
            <div className="w3-panel">

            </div>
          </div>
        )}
      </div>
    </div>

  );
};
