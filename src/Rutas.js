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
import {RegistroUsersAdmin} from './componentes/RegistroUsersAdmin';
import { NotFoundPage } from './componentes/NotFoundPage';
import { RutaPrivada } from './RutaPrivada';
import { RutaPublica } from './RutaPublica';

const Texto = {
    paddingTop:'5px',
    paddingBottom:'8px' 
  }  

export function Rutas() {
    return (
        <Fragment>
            <Router>
                
    {/*Aqui inicia bloque menu inisio sesion*/}  
                
                <RutaPublica path="/" exact>
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
                </RutaPublica>
                
    {/*Aqui finaliza bloque menu inisio sesion*/} 

    {/*Aqui empieza el bloque de la barra menu*/} 
                <div className="w3-container w3-black">
                    <RutaPrivada hasRole="Administrador" path="/users/admin">
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
                                    <Link to="/users/admin/registroAdmin">
                                        Registrar
                                    </Link><br></br>
                                </button>
                                <button className="w3-button w3-round-xlarge w3-black w3-hover-white"> 
                                    <Link to="/users/admin/usuarios">
                                        Administrar
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
                    </RutaPrivada>
    {/*Hasta esta parte va el menu del admin, continua menu del profesor*/} 
                    <RutaPrivada hasRole="Profesor" path="/users/profesor">
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
                    </RutaPrivada>
    {/*Hasta esta parte va el menu del profesor, continua menu del canchero*/}
                    <RutaPrivada hasRole="Canchero" path="/users/canchero">
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
                    </RutaPrivada>
    {/*Hasta esta parte va el menu del canchero, continua menu del usuario socio*/}
                    <RutaPrivada hasRole="Socio" path="/users/socio">
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
                    </RutaPrivada>
                </div>
    {/*Hasta esta parte va el menu del usuario socio, se finaliza con cerrar sesion*/}
     
    {/*Aqui finaliza el bloque de la barra menu*/} 

                <Encabezado/>
                <TextoInformativo/>

    {/*En este div se ajusta para pantallas pequeñas*/}
                <div className="w3-hide-large w3-hide-medium"> 
                    <RutaPrivada hasRole="Administrador" path="/users/admin/pagina" exact component={ConfigEmpresa}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/politicas" exact component={ConfHorario}/> 
                    <RutaPrivada hasRole="Administrador" path="/users/admin/registroAdmin" exact component={RegistroUsersAdmin}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/usuarios" exact component={Busqueda}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/usuarios" exact component={EditarUser}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/ayuda" exact component={Ayuda}/>
                    <RutaPublica path="/users/registro" exact component={RegistroUsers}/>
                    {/*<Route path="*" component={NotFoundPage}/>*/}
                    <Horario/>
                </div>

    {/*Aqui es para pantallas normal o grande*/}
                <div style={{position:'relative',left:'10%' }}className="w3-container w3-hide-small">
                    <RutaPrivada hasRole="Administrador" path="/users/admin/pagina" exact component={ConfigEmpresa}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/politicas" exact component={ConfHorario}/> 
                    <RutaPrivada hasRole="Administrador" path="/users/admin/registroAdmin" exact component={RegistroUsersAdmin}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/usuarios" exact component={Busqueda}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/usuarios" exact component={EditarUser}/>
                    <RutaPrivada hasRole="Administrador" path="/users/admin/ayuda" exact component={Ayuda}/>
                    <RutaPublica path="/users/registro" exact component={RegistroUsers}/> 
                    {/*<Route path="*" component={NotFoundPage}/>*/}
                    <Horario/>
                </div>
                
                <PiePagina/>
                
            </Router> 
        </Fragment>   
    )
}
 // agregamos exact en <Route path="/users" exact component={CerrarSesion}/> 
 //para que solo lo muestre en esa ruta