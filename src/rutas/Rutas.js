import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import { PiePagina } from '../componentes/PiePagina';
import {Horario} from '../componentes/Horario';
import {ConfigEmpresa} from '../componentes/ConfigEmpresa';
import { InicioSesion } from '../componentes/InicioSesion';
import { RegistroUsers } from '../componentes/RegistroUsers';
import {Busqueda} from '../componentes/Busqueda';
import { Ayuda } from '../componentes/Ayuda';
import { ConfHorario } from '../componentes/ConfHorario';
import {RegistroUsersAdmin} from '../componentes/RegistroUsersAdmin';
import { RutaPrivada } from './RutaPrivada';
import { RutaPublica } from './RutaPublica';
import { NotFoundPage } from '../componentes/NotFoundPage';
import roles from '../helpers/roles';
import { MenuAdmin } from '../componentes/MenuAdmin';
import {MenuProf} from '../componentes/MenuProf';
import {MenuCanc} from '../componentes/MenuCanc';
import {MenuSocio} from '../componentes/MenuSocio';
import rutas from '../helpers/rutas';


export function Rutas() {

//const location = useLocation();
//console.log(location)
    return (
        <Fragment>
            <Router>
            <Switch>
                <RutaPublica path={rutas.home} exact component={InicioSesion}/> 
                <RutaPrivada hasRole={roles.admin} path={rutas.admin} exact component={MenuAdmin}/>    
                <RutaPrivada hasRole={roles.profesor} path={rutas.profesor} exact component={MenuProf}/> 
                <RutaPrivada hasRole={roles.canchero} path={rutas.canchero} exact component={MenuCanc}/> 
                <RutaPrivada hasRole={roles.socio} path={rutas.socio} exact component={MenuSocio}/>               
                
                <RutaPrivada hasRole={roles.admin} path={rutas.adminPagina} exact component={ConfigEmpresa}/>
                <RutaPrivada hasRole={roles.admin} path={rutas.adminPoliticas} exact component={ConfHorario}/> 
                <RutaPrivada hasRole={roles.admin} path={rutas.adminRegistro} exact component={RegistroUsersAdmin}/>
                <RutaPrivada hasRole={roles.admin} path={rutas.adminUsers} exact component={Busqueda}/>
                <RutaPrivada hasRole={roles.admin} path={rutas.adminAyuda} exact component={Ayuda}/>
                <RutaPublica path={rutas.registro} exact component={RegistroUsers}/>
                <Route path="*" component={NotFoundPage}/> 
                
            </Switch> 
                <Horario/>  
                <PiePagina/>
            </Router> 
        </Fragment>   
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta