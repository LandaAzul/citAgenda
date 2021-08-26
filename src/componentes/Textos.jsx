import React, { Fragment, useState } from 'react';


export function Textos({texto, LongitudTexto}) {

//texto = me define el texto a mostrar
//LongitudTexto = definimos la longitud del input

    const [firstName, setFirstName] = useState('');
  
    return (
        <Fragment>
            <div>
                {texto}, máximo {LongitudTexto} caracteres. 
            </div>
            <div>
                <form >
                    <input maxLength={LongitudTexto}
                            name="firstName" onChange={e => setFirstName(e.target.value)}
                    />
                        
                    <button type="submit">Agregar</button>
                   
                </form>
                
            </div>
            <div>
                <h3>
                    {firstName}
                </h3>
            </div>
        </Fragment>
    
  );
}
