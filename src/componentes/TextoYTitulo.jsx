import React, {useState} from 'react'

export default function TextoYTitulo() {

    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [Imagen, setImagen] = useState();

    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    const handleClearAll = () => {
        setDescripcion();
        setTitulo();
        setImagen();
    }

    return (
        <form>
            <div className="w3-panel w3-col w3-pale-blue">
                <div className="w3-panel w3-center">
                    <h3>
                        Aquí se configura lo relacionado con la página.
                    </h3>
                </div>
                <div className="w3-panel w3-col m3">
                    <div>
                        Ingrese aquí el título. 
                    </div>
                    <div>
                        <input type="text" maxLength = {50} name="título" placeholder="Máx 50 caracteres" 
                        onChange={e => setTitulo(e.target.value)}/>
                    </div>
                    <div>
                        <h2>
                            {titulo}
                        </h2>
                    </div>
                </div>
                <div className="w3-panel w3-col m6 w3-center">        
                    <div>
                        Aquí puede ingresar una breve descripción de su actividad, políticas o requerimientos, cualquier cosa que desee compartir. 
                    </div>
                    <div>
                        <input type="text" maxLength = {300} name="descripcion" placeholder="Máx 300 caracteres" 
                        onChange={e => setDescripcion(e.target.value)}/>
                    </div>
                    <div>
                        <h3>
                            {descripcion}
                        </h3>
                    </div>
                </div>
                <div className="w3-panel w3-col m3 w3-center">
                    <div>
                        Ingrese una imagen.
                    </div><br></br>
                    <div>
                        <input type="file" name="imagen" accept=".jpg,.jpeg,.png"
                        onChange={changeImagen} />
                    </div>
                </div>
                <div className="w3-panel w3-center">
                    <button type='submit'>Actualizar</button>
                    <button type='reset' onClick={handleClearAll}>Limpiar</button>
                </div>
            </div>
        </form>
    )
}
