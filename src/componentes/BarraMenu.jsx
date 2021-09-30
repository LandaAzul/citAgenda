import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default function CerrarSesion() {
    return (
        <Router>
            <div className="w3-container w3-indigo w3-padding-16">
                <Route path="/users/admin">
                    <div className="w3-col m2">    
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/admin/usuarios">
                                Administrar Usuarios
                            </Link>
                        </button>
                    </div>
                </Route>
                <Route path="/users/admin">
                    <div className="w3-col m2">
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/admin/pagina">
                                Gestionar página
                            </Link>
                        </button>
                    </div>
                </Route>
                <Route path="/users/admin">
                    <div className="w3-col m2">
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/admin/politicas">
                                Gestionar Políticas
                            </Link>
                        </button>
                    </div>
                </Route>
                <Route path="/users" exact>
                    <div className="w3-col m6 w3-left-align">
                        <button disabled className="w3-button">
                          
                        </button>
                    </div>
                </Route>
{/*Hasta esta parte va el menu del admin, continua menu del profesor*/} 
                <Route path="/users/profesor">
                    <div className="w3-col m2">    
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/profesor/usuario">
                                Administrar Usuario
                            </Link>
                        </button>
                    </div>
                </Route>
                <Route path="/users/profesor">
                    <div className="w3-col m2">    
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/profesor/politicas">
                                Gestionar Políticas
                            </Link>
                        </button>
                    </div>
                </Route>
                <Route path="/users/profesor">
                    <div className="w3-col m2 w3-left-align">
                        <button disabled className="w3-button">
                            
                        </button>
                    </div>
                </Route>
{/*Hasta esta parte va el menu del profesor, continua menu del canchero*/}
                <Route path="/users/canchero">
                    <div className="w3-col m2">    
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/canchero/usuario">
                                Administrar Usuario
                            </Link>
                        </button>
                    </div>
                </Route>
                
                <Route path="/users/canchero">
                    <div className="w3-col m4 w3-left-align">
                        <button disabled className="w3-button">
                            
                        </button>
                    </div>
                </Route>
{/*Hasta esta parte va el menu del canchero, continua menu del usuario socio*/}
                <Route path="/users/socio">
                    <div className="w3-col m2">    
                        <button className="w3-button w3-round-large w3-hover-white">
                            <Link to="/users/socio/usuario">
                                Administrar Usuario
                            </Link>
                        </button>
                    </div>
                </Route>
               
                <Route path="/users/socio">
                    <div className="w3-col m4 w3-left-align">
                        <button disabled className="w3-button">
                            
                        </button>
                    </div>
                </Route>
{/*Hasta esta parte va el menu del usuario socio, se finaliza con cerrar sesion*/}
                <div className="w3-col m6 w3-right-align">
                    <button className="w3-button w3-round-large w3-hover-white">
                        <Link to="/">
                            CERRAR SESION
                        </Link>
                    </button>
                </div>
            </div> 
        </Router>       
    )
}
