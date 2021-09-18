import React from 'react';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import BloqueCentral from './componentes/BloqueCentral';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CerrarSesion from './componentes/CerrarSesion';

export function App() {
    return (
        <Router>   
            <div>
                <Encabezado/>
                <Route path="/users" component={CerrarSesion}/> 
                <BarraLateral/>
                <Route path="/users" component={BloqueCentral}/> 
            </div>
        </Router> 
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta