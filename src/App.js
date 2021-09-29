import React,{Fragment} from 'react';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import BloqueCentral from './componentes/BloqueCentral';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BarraMenu from './componentes/BarraMenu';
import { PiePagina } from './componentes/PiePagina';

export function App() {
    return (
        <Fragment>
            <Router>
                <Route path="/users" component={BarraMenu}/>    
                <Encabezado/>                
                <BarraLateral/>
                <Route path="/users" component={BloqueCentral}/> 
                <PiePagina/>
            </Router> 
        </Fragment>   
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta