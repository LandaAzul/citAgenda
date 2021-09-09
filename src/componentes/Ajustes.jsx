import React, {useState, Fragment} from 'react'


export function Ajustes () {
    
const [configuracion, setConfiguracion] = useState(true);
 

const [nombreCompleto, setNombre] = useState('');
const [celular, setCelular] = useState('');
const [email, setEmail] = useState('');
const [contrasena, setContra] = useState('');
const [descripcion,setDescripcion] = useState('');

// const storage = useStorage();
const [Imagen, setImagen] = useState();

//OBTENIENDO LA IMAGEN
const changeImagen = e => {
    setImagen(e.target.files[0]);
}

const handleClearAll = () => {
    const newTodos = [];
    setDescripcion(newTodos);
    setImagen(newTodos);
    setNombre(newTodos);
    setCelular(newTodos);
    setEmail(newTodos);
    setContra(newTodos);
}
    
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
          ) : (
              <div>
                <div class="w3-panel">
                    <form>
                        <div class="w3-panel w3-col m4">
                            <div>
                                <input type='text' maxLength={50} placeholder="Nombre Completo" required
                                onChange={e => setNombre(e.target.value)}></input>
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
                        <div class="w3-panel w3-col m4 w3-pale-blue">
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
                        <div class="w3-panel w3-col m4">
                            <input type="file" name="imagen" onChange={changeImagen} />
                            
                        </div>
                        <div class="w3-panel w3-center">
                            <button type='submit'>Actualizar</button>
                            <button type='reset' onClick={handleClearAll}>Limpiar</button>
                        </div>
                    </form>
                </div>
                <div class="w3-panel">
                  
                </div>
              </div>  
          )}
        </div>
      </Fragment>
    );
  };
