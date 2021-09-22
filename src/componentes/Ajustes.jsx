import React, {useState} from 'react'
import Busqueda from './Busqueda';
import TextoYTitulo from './TextoYTitulo';
import axios from 'axios'
import { PedirTUsuarios } from './PedirTUsuarios';
import {RegistroUsers} from './RegistroUsers'


export function Ajustes () {
    
const [configuracion, setConfiguracion] = useState(true);
 
const [codigo,setCodigo] = useState('')
const [nombreCompleto, setNombre] = useState('');
const [celular, setCelular] = useState('');
const [email, setEmail] = useState('');
const [contrasena, setContra] = useState('');
const [validarUsuario, setValidar] = useState(false);




const handleClearAll = () => {
    setCodigo();
    setNombre();
    setCelular();
    setEmail();
    setContra();
    setValidar();
}
 
//const mostrarConsola = () => {
//  console.log(validarUsuario)
//}

    return (
     <div className="w3-panel w3-card w3-margin"> 
        <div>
            <h3>
                Configure o actualice aquí sus datos!!!
            </h3>
        </div>
        <div className="w3-panel">
            <button
                type="button"
                onClick={() => {
                setConfiguracion(!configuracion);
                }}
            >
              {configuracion ? 'Mostrar configuración' : 'Ocultar configuración'}
            </button>
  
            {configuracion ? (
                <div></div>
            ) : 
            (

            <div className="w3-panel">
                <div className="w3-panel w3-center">
                    <h3>
                        Aquí se configura lo relacionado con los usuarios.
                    </h3>
                </div>
                <div className="w3-panel w3-col m12 w3-center w3-sand">
                    <div className="w3-panel w3-center">
                        <RegistroUsers titulo={"Registre Usuario"}/>
                    </div>
                    <div className="w3-panel w3-center">
                        <PedirTUsuarios/>
                    </div>
                    <div className="w3-panel w3-center">
                        <Busqueda/>
                    </div>
                </div>
                    
{
    //Primer bloque de configuracion, buscar y actualizar datos de usuario, y gestionar familiares!!!
}
                <form> 
                    <div className="w3-panel w3-col">
                        
                            <div className="w3-panel w3-col m4 w3-center">
                                <div>
                                    <input type='text' maxLength={15} placeholder="Id o documento" required
                                    onChange={e => setCodigo(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <input type='text' maxLength={50} placeholder="Nombre Completo" required
                                    onChange={e => setNombre(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <input type='tel' maxLength={12} placeholder='Número celular' required
                                    onChange={e => setCelular(e.target.value)}></input>
                                </div>
                                <div>
                                    <input type='text' maxLength={50} placeholder='Email' required
                                    onChange={e => setEmail(e.target.value)}></input>
                                </div>
                                <div>
                                    <input type='password' placeholder='contraseña' required
                                    onChange={e => setContra(e.target.value)}></input>
                                </div>
                                <div>
                                    <input type='password' placeholder='confirme contraseña' required></input>
                                </div>
                                
                            </div>
                            <div className="w3-panel w3-col m4 w3-center">
                                <div>
                                    Establezca Roll del usuario:
                                    <select name="roll">
                                        <option defaultValue="usuario">Usuario socio</option>
                                        <option value="Canche">Canchero</option>
                                        <option value="Profe">Profesor</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div><br></br>
                                <div>
                                    Activar o desactivar usuario:<br></br>
                                    <input type="radio" id="act" name="actv" value={true}
                                    onClick={e => setValidar(true)}></input>
                                    <label htmlFor="act">Activar</label><br></br>
                                    <input type="radio" id="des" name="actv" value={false}
                                    onChange={e => setValidar(false)}></input>
                                    <label htmlFor="des">Desactivar</label><br></br>
                                </div>
                                {//<button onClick= {mostrarConsola}>mostrar en consola</button>
                                }
                            </div>
                            <div className="w3-panel w3-col m4 w3-center">
                                <div className="w3-section">
                                Es familiar o allegado:
                                <select name="parentesco">
                                    <option defaultValue=""></option>
                                    <option value="conyuge">Cónyuge</option>
                                    <option value="padre">Padre/Madre</option>
                                    <option value="hijo">Hij@</option>
                                    <option value="primo">Prim@</option>
                                    <option value="tio">Tí@</option>
                                    <option value="sobrino">Sobrin@</option>
                                </select>
                                </div>
                                <div className="w3-section">
                                de:
                                <input type="text"></input>
                                </div>
                            
                                {//<button onClick= {mostrarConsola}>mostrar en consola</button>
                                }
                            </div>
                    </div>
    {
        //aquí ya es otro bloque, título, descripción e imagen
    }    
                    
                    <div className="w3-panel w3-center">
                            <button type='submit'>Actualizar</button>
                            <button type='reset' onClick={handleClearAll}>Limpiar</button>
                    </div>
                </form>
                <div>
                    <TextoYTitulo/>
                </div> 
            </div> 
            
          )}
        </div>
        
    </div> 
    );
  };