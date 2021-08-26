import React, {Fragment} from 'react';
import {Configuracion} from './Configuracion';
import {Politicas} from './Politicas';





export default function BloqueCentral() {
    return (
        <Fragment>
            <div>
                <h2>Espacio para configuraciones!!!</h2>
                <Configuracion/>
                <h2>Espacio para políticas!!!</h2>
                <Politicas/>
                
                
                
            </div>
        </Fragment>
    )
}
