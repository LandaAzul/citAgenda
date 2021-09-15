import React, {useState, Fragment} from 'react'
import Busqueda from './Busqueda';


export function Ajustes () {
    
const [configuracion, setConfiguracion] = useState(true);
 

const [nombreCompleto, setNombre] = useState('');
const [celular, setCelular] = useState('');
const [email, setEmail] = useState('');
const [contrasena, setContra] = useState('');
const [titulo,setTitulo] = useState('');
const [descripcion,setDescripcion] = useState('');
const [validarUsuario, setValidar] = useState(false);

// const storage = useStorage();
const [Imagen, setImagen] = useState();

//OBTENIENDO LA IMAGEN
const changeImagen = e => {
    setImagen(e.target.files[0]);
}

const handleClearAll = () => {
    const newTodos = [];
    setDescripcion(newTodos);
    setTitulo(newTodos);
    setImagen(newTodos);
    setNombre(newTodos);
    setCelular(newTodos);
    setEmail(newTodos);
    setContra(newTodos);
    setValidar();
}
 
//const mostrarConsola = () => {
//  console.log(validarUsuario)
//}

    return (
      <Fragment>
        <div class="w3-panel">
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

            <div class="w3-panel">
                <div class="w3-panel w3-col m12 w3-center">
                    <div class="m12 w3-center">
                        <Busqueda/>
                    </div>
                </div>
                    
{
    //Primer bloque de configuracion, buscar y actualizar datos de usuario, y gestionar familiares!!!
}
                <form> 
                    <div class="w3-panel w3-col">
                        
                            <div class="w3-panel w3-col m4 w3-center">
                                <div>
                                    <input type='text' maxLength={50} placeholder="Nombre Completo" required
                                    onChange={e => setNombre(e.target.value)}
                                    //onClick={e => setNombre()} 
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
                            <div class="w3-panel w3-col m4 w3-center">
                                Activar o desactivar usuario:<br></br>
                                <input type="radio" id="act" name="actv" value={true}
                                onClick={e => setValidar(true)}></input>
                                <label for="act">Activar</label><br></br>
                                <input type="radio" id="des" name="actv" value={false}
                                onChange={e => setValidar(false)}></input>
                                <label for="des">Desactivar</label><br></br>
                            
                                {//<button onClick= {mostrarConsola}>mostrar en consola</button>
                                }
                            </div>
                            <div class="w3-panel w3-col m4 w3-center">
                                <div class="w3-section">
                                Es familiar o allegado:
                                <select name="parentesco">
                                    <option value="" selected></option>
                                    <option value="Cónyuge">Cónyuge</option>
                                    <option value="Padre/Madre">Padre/Madre</option>
                                    <option value="Hijo">Hijo</option>
                                </select>
                                </div>
                                <div class="w3-section">
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
                    <div class="w3-panel w3-col w3-pale-blue">
                        <div class="w3-panel w3-col m3">
                            <div>
                                Ingrese aquí el título. 
                            </div>
                            <div>
                                <input type="text" maxLength = {50} name="título" placeHolder="Máx 50 caracteres" 
                                onChange={e => setTitulo(e.target.value)}/>
                            </div>
                            <div>
                                <h2>
                                    {titulo}
                                </h2>
                            </div>
                        </div>
                        <div class="w3-panel w3-col m6 w3-center">        
                            <div>
                                Aquí puede ingresar una breve descripción de su actividad, políticas o requerimientos, cualquier cosa que desee compartir. 
                            </div>
                            <div>
                                <input type="text" maxLength = {300} name="descripcion" placeHolder="Máx 300 caracteres" 
                                onChange={e => setDescripcion(e.target.value)}/>
                            </div>
                            <div>
                                <h3>
                                    {descripcion}
                                </h3>
                            </div>
                        </div>
                        <div class="w3-panel w3-col m3 w3-center">
                            <div>
                                Ingrese una imagen.
                            </div><br></br>
                            <div>
                                <input type="file" name="imagen" accept=".jpg,.jpeg,.png"
                                onChange={changeImagen} />
                            </div>
                        </div>
    {
        //Aquí finaliza todo el formulario de configuracion
    }
                        
                    </div>
                    <div class="w3-panel w3-center">
                            <button type='submit'>Actualizar</button>
                            <button type='reset' onClick={handleClearAll}>Limpiar</button>
                    </div>
                </form>
            </div>  
          )}
        </div>
      </Fragment>
    );
  };
