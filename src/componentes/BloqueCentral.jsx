import React from 'react';
import {Politicas} from './Politicas';
import {Ajustes} from './Ajustes';
import {BrowserRouter as Router, Route} from 'react-router-dom'


// agregamos <Route path="/admin" exact component={CerrarSesion}/> 

export default function BloqueCentral() {
    return (
        <Router>
            <div className="w3-col m10 w3-center w3-panel">
                <Route path="/users/admin" exact component={Ajustes}/>
                <Route path="/users/admin" exact component={Politicas}/>
                    
                 Aquí va la matriz del horario  
            </div>
            
        </Router>
    )
}
