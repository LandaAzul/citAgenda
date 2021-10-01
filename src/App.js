import React,{Fragment} from 'react';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { PiePagina } from './componentes/PiePagina';
import {Horario} from './componentes/Horario';
import ConfigEmpresa from './componentes/ConfigEmpresa';
import { InicioSesion } from './componentes/InicioSesion';

const Texto = {
    paddingTop:'5px',
    paddingBottom:'8px' 
  }  

export function App() {
    return (
        <Fragment>
            <Router>
    {/*Aqui inicia bloque menu inisio sesion*/}  
                
                <Route path="/" exact>
                    <div className="w3-container w3-black"> {/*color importado de w3-metro-color*/}
                        <div className="w3-padding">
                            <div className="w3-col m10 w3-left-align">
                                <button disabled className="w3-button">
                                </button>
                            </div>
                            <div className="w3-col m2 w3-center">
                                <div style={Texto}>
                                    <InicioSesion></InicioSesion>
                                    <Link to="/users/registro">
                                        <b >
                                            ¿No estoy registrado?
                                        </b>
                                    </Link>  
                                </div>                          
                            </div>
                        </div>
                    </div>
                </Route>
                
    {/*Aqui finaliza bloque menu inisio sesion*/} 

    {/*Aqui empieza el bloque de la barra menu*/} 
                <div className="w3-container w3-indigo ">
                    <Route path="/users/admin">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/admin/usuarios">
                                    Administrar Usuarios
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/admin/pagina">
                                    Gestionar página
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/admin/politicas">
                                    Gestionar Políticas
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m6 w3-right-align w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/">
                                    CERRAR SESION
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del admin, continua menu del profesor*/} 
                    <Route path="/users/profesor">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/profesor/usuario">
                                    Administrar Usuario
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/profesor/politicas">
                                    Gestionar Políticas
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-left-align">
                            <button disabled className="w3-button">
                                
                            </button>
                        </div>
                        <div className="w3-col m6 w3-right-align w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/">
                                    CERRAR SESION
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del profesor, continua menu del canchero*/}
                    <Route path="/users/canchero">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/canchero/usuario">
                                    Administrar Usuario
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m4 w3-left-align">
                            <button disabled className="w3-button">
                                
                            </button>
                        </div>
                        <div className="w3-col m6 w3-right-align w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/">
                                    CERRAR SESION
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del canchero, continua menu del usuario socio*/}
                    <Route path="/users/socio">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/users/socio/usuario">
                                    Administrar Usuario
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m4 w3-left-align">
                            <button disabled className="w3-button">
                                
                            </button>
                        </div>
                        <div className="w3-col m6 w3-right-align w3-padding">
                            <button className="w3-button w3-round-large w3-hover-white">
                                <Link to="/">
                                    CERRAR SESION
                                </Link>
                            </button>
                        </div>
                    </Route>
                </div>
    {/*Hasta esta parte va el menu del usuario socio, se finaliza con cerrar sesion*/}
                    
                
    {/*Aqui finaliza el bloque de la barra menu*/} 

                <Encabezado/> 

   

                <BarraLateral/>
                <Route path="/users/admin/pagina" exact component={ConfigEmpresa}/> 
                <Horario/> 
                <PiePagina/>
            </Router> 
        </Fragment>   
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta