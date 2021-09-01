import React, {Fragment} from 'react';
import {Configuracion} from './Configuracion';
import {Politicas} from './Politicas';





export default function BloqueCentral() {
    return (
        <Fragment>
            <div class="w3-panel w3-card">
                <h2>Espacio para configuraciones!!!</h2>
                <Configuracion/>
                
            </div>
            <div class="w3-panel w3-card">
                <h2>Espacio para políticas!!!</h2>
                <Politicas/>
            </div>
            <div class="w3-panel">
                Aqui debe aparecer el calendario para elegir la cita
            </div>
        </Fragment>
    )
}
