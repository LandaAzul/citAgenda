import React,{Fragment} from 'react';
import {Encabezado} from './componentes/Encabezado';
import {TextoInformativo} from './componentes/TextoInformativo';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { PiePagina } from './componentes/PiePagina';
import {Horario} from './componentes/Horario';
import {ConfigEmpresa} from './componentes/ConfigEmpresa';
import { InicioSesion } from './componentes/InicioSesion';
import { RegistroUsers } from './componentes/RegistroUsers';
import {Busqueda} from './componentes/Busqueda';
import { EditarUser } from './componentes/EditarUser';
import { Ayuda } from './componentes/Ayuda';
import { ConfHorario } from './componentes/ConfHorario';

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
                <div className="w3-container w3-black">
                    <Route path="/users/admin">
                        <div className="w3-col m2 w3-padding">
                            <button className="w3-button w3-round-xlarge w3-hover-white">
                                <Link to="/users/admin/pagina">
                                    Personalizar
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding">
                            <button className="w3-button w3-round-xlarge w3-hover-white">
                                <Link to="/users/admin/politicas">
                                    Políticas
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding w3-dropdown-hover">  
                            <button style={{textDecoration:'underline'}}className="w3-button w3-round-xlarge w3-hover-white">Usuarios</button>  
                            <div className="w3-dropdown-content w3-bar-block w3-black">
                                <button className="w3-button w3-round-xlarge w3-black w3-hover-white">    
                                    <Link to="/users/admin/registro">
                                        Registrar Usuarios
                                    </Link><br></br>
                                </button>
                                <button className="w3-button w3-round-xlarge w3-black w3-hover-white"> 
                                    <Link to="/users/admin/usuarios">
                                        Administrar Usuarios
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding">
                            <button className="w3-button w3-round-xlarge w3-hover-white">
                                <Link to="/users/admin/ayuda">
                                    Guía
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m4 w3-right-align w3-padding">
                            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small">
                                <Link to="/">
                                    <b>CERRAR SESION</b>
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del admin, continua menu del profesor*/} 
                    <Route path="/users/profesor">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-xlarge w3-hover-white">
                                <Link to="/users/profesor/usuario">
                                    Administrar Usuario
                                </Link>
                            </button>
                        </div>
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-xlarge w3-hover-white">
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
                            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small">
                                <Link to="/">
                                    <b>CERRAR SESION</b>
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del profesor, continua menu del canchero*/}
                    <Route path="/users/canchero">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-xlarge w3-hover-white">
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
                            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small">
                                <Link to="/">
                                    <b>CERRAR SESION</b>
                                </Link>
                            </button>
                        </div>
                    </Route>
    {/*Hasta esta parte va el menu del canchero, continua menu del usuario socio*/}
                    <Route path="/users/socio">
                        <div className="w3-col m2 w3-padding">    
                            <button className="w3-button w3-round-xlarge w3-hover-white">
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
                            <button className="w3-button w3-border w3-border-white w3-metro-red w3-round-xlarge w3-hover-white w3-small">
                                <Link to="/">
                                    <b>CERRAR SESION</b>
                                </Link>
                            </button>
                        </div>
                    </Route>
                </div>
    {/*Hasta esta parte va el menu del usuario socio, se finaliza con cerrar sesion*/}
     
    {/*Aqui finaliza el bloque de la barra menu*/} 

                <Encabezado/>
                <TextoInformativo/>

    {/*En este div se ajusta para pantallas pequeñas*/}
                <div className="w3-hide-large w3-hide-medium"> 
                    <Route path="/users/admin/pagina" exact component={ConfigEmpresa}/>
                    <Route path="/users/admin/politicas" exact component={ConfHorario}/> 
                    <Route path="/users/admin/registro" exact component={RegistroUsers}/>
                    <Route path="/users/admin/usuarios" exact component={Busqueda}/>
                    <Route path="/users/admin/usuarios" exact component={EditarUser}/>
                    <Route path="/users/admin/ayuda" exact component={Ayuda}/>
                    <Route path="/users/registro" exact component={RegistroUsers}/>
                    <Horario/>
                </div>

    {/*Aqui es para pantallas normal ogrande*/}
                <div style={{position:'relative',left:'10%' }}className="w3-container w3-hide-small">
                    <Route path="/users/admin/pagina" exact component={ConfigEmpresa}/>
                    <Route path="/users/admin/politicas" exact component={ConfHorario}/> 
                    <Route path="/users/admin/registro" exact component={RegistroUsers}/>
                    <Route path="/users/admin/usuarios" exact component={Busqueda}/>
                    <Route path="/users/admin/usuarios" exact component={EditarUser}/>
                    <Route path="/users/admin/ayuda" exact component={Ayuda}/>
                    <Route path="/users/registro" exact component={RegistroUsers}/> 
                    <Horario/>
                </div>
                
                <PiePagina/>
            </Router> 
        </Fragment>   
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta