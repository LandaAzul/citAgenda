import React, {Fragment} from 'react';
import {Politicas} from './Politicas';
import {Ajustes} from './Ajustes';





export default function BloqueCentral() {
    return (
        <Fragment>
            
            <div class="w3-panel w3-card w3-margin">
                <h3>Configure o actualice aquí sus datos!!!</h3>
                <Ajustes/>
            </div>
            <div class="w3-panel w3-card w3-margin">
                <h3>Configure aquí las políticas o restricciones para su centro de agenda!!!</h3>
                <Politicas/>
            </div>
            
        </Fragment>
    )
}
