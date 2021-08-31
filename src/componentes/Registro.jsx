import React, {useState, Fragment}from 'react'


export function Registro () {
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
              {configuracion ? '¿No tienes cuenta?' : 'Volver'}
          </button>
  
          {configuracion ? (
              <div></div>
          ) : (
              <div>
                <ul>
                  <li>
                    
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