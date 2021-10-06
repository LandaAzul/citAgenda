import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';

var idEm = '';

const espacio = {
    margin: '10px',
  }

export default function ConfigEmpresa() {

    const [validar, setVal] = useState('')
    const [admin,setAdmin] = useState('');
    const [logo,setLogo] = useState('');
    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [Imagen, setImagen] = useState('');
    const [telefono1,setTelefono1] = useState('');
    const [telefono2,setTelefono2] = useState('');
    const [telefono3,setTelefono3] = useState('');
    const [direccion,setDireccion] = useState('');
    const [correo,setCorreo] = useState('');
    const [facebook,setFace] = useState('');
    const [instagram,setInst] = useState('');
    const [whatsapp,setWhat] = useState('');
    const [twitter,setTwit] = useState('');
    const [linkedin,setLinked] = useState('');
    const [youtube,setYou] = useState('');

       
    
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    const handleClearAll = () => {
        setAdmin('');
        setLogo('');
        setTitulo('');
        setDescripcion('');
        setImagen('');
        setTelefono1('');
        setTelefono2('');
        setTelefono3('');
        setDireccion('');
        setCorreo('');
        setFace('');
        setInst('');
        setWhat('');
        setTwit('');
        setLinked('');
        setYou('');
        idEm= '';        
    }

   
    
    async function componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/empresas');
      
        idEm = res.data.map(user => user._id).join()
        
        //idEm = (res.data.message._id)
        //setAdmin(res.data.map(user => user.administrador))
              
        const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
        setVal(resp.data.message._id);
        setAdmin(resp.data.message.administrador);
        setTitulo(resp.data.message.title);
        setDescripcion(resp.data.message.descripcion);
        setImagen(resp.data.message.imagen);
        setLogo(resp.data.message.logo);
        setTelefono1(resp.data.message.telefono1);
        setTelefono2(resp.data.message.telefono2);
        setTelefono3(resp.data.message.telefono3);
        setDireccion(resp.data.message.direccion);
        setCorreo(resp.data.message.email);
        setFace(resp.data.message.facebook);
        setInst(resp.data.message.instagram);
        setWhat(resp.data.message.whatsapp);
        setTwit(resp.data.message.twitter);
        setLinked(resp.data.message.linkedin);
        setYou(resp.data.message.youtube);   
                       
    }

    const enviarDatos = async () => {
        await axios.put('http://localhost:4000/api/empresas/'+ idEm ,{
            title:titulo,
            descripcion:descripcion ,
            administrador:admin ,
            imagen:Imagen,
            telefono1:telefono1,
            telefono2:telefono2,
            telefono3:telefono3,
            logo:logo ,
            direccion:direccion ,
            email:correo ,
            facebook:facebook,
            instagram:instagram,
            whatsapp:whatsapp,
            twitter:twitter,
            linkedin:linkedin,
            youtube:youtube
        })
        handleClearAll();
        window.location.reload();         
    }

    const validarVacio = (e) => {
        e.preventDefault()
        if(validar){enviarDatos()}
        else{
            swal({
                title:'Sin datos',
                text:'Por favor de clíck en "Editar datos club"',
                icon:'info', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }


    return (
           
        <div className="w3-container w3-col m10 w3-padding">
            <div className="w3-container w3-padding w3-card w3-white">
                <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                    <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                    onClick={componentDidMount}>Editar datos Club</button>
                </div>
                <form className="w3-container" onSubmit={validarVacio}>
                    <div className="w3-container w3-col m6 w3-padding">
                        <p>      
                            <label class="w3-text-indigo"><b>Admin o representante legal.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text"
                            maxLength = {50} name="admin" value= {admin}
                            onChange={e => setAdmin(e.target.value)}/>
                        </p> 
                        <p>      
                            <label class="w3-text-indigo"><b>Dirección.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {90} name="direccion" value= {direccion}
                            onChange={e => setDireccion(e.target.value)}/>
                        </p> 
                        <p>      
                            <label class="w3-text-indigo"><b>Teléfono(s).</b></label>
                            <input class="w3-input w3-border w3-round-large" type="tel" 
                            maxLength = {15} name="telefono1" value= {telefono1}
                            onChange={e => setTelefono1(e.target.value)}/>
                            <input class="w3-input w3-border w3-round-large" type="tel" 
                            maxLength = {15} name="telefono1" value= {telefono2}
                            onChange={e => setTelefono2(e.target.value)}/>
                            <input class="w3-input w3-border w3-round-large" type="tel" 
                            maxLength = {15} name="telefono1" value= {telefono3}
                            onChange={e => setTelefono3(e.target.value)}/>
                        </p> 
                        <p>      
                            <label class="w3-text-indigo"><b>Correo electrónico.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="email" 
                            maxLength = {80} name="correo" value={correo}
                            onChange={e => setCorreo(e.target.value)}/>
                        </p> 
                        <p>      
                            <label class="w3-text-indigo"><b>Ingrese aquí el título.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {50} name="titulo" value={titulo}
                            onChange={e => setTitulo(e.target.value)}/>
                        </p>
                    </div>               
                    <div className="w3-container w3-col m6 w3-padding">
                        <p>      
                            <label class="w3-text-indigo"><b>Facebook.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {100} name="redes" value={facebook}
                            onChange={e => setFace(e.target.value)}/>
                        </p> 
                        <p>      
                            <label class="w3-text-pink"><b>Instagram.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {100} name="redes" value={instagram}
                            onChange={e => setInst(e.target.value)}/>
                        </p>
                        <p>      
                            <label class="w3-text-green"><b>Whatsapp.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {100} name="redes" value={whatsapp}
                            onChange={e => setWhat(e.target.value)}/>
                        </p>
                        <p>      
                            <label class="w3-text-blue"><b>Twitter.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {100} name="redes" value={twitter}
                            onChange={e => setTwit(e.target.value)}/>
                        </p>
                        <p>      
                            <label class="w3-text-blue"><b>Linkedin.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {100} name="redes" value={linkedin}
                            onChange={e => setLinked(e.target.value)}/>
                        </p>
                        <p>      
                            <label class="w3-text-red"><b>Youtube.</b></label>
                            <input class="w3-input w3-border w3-round-large" type="text" 
                            maxLength = {300} name="redes" value={youtube}
                            onChange={e => setYou(e.target.value)}/>
                        </p>
                    </div>
                    
                    <div className="w3-panel w3-col m12">        
                        <p>      
                            <label class="w3-text-indigo">
                                <b>
                                    Texto, políticas o información a mostrar:
                                </b>
                            </label>
                            <input class="w3-input w3-animate-input w3-border w3-round-xlarge" type="text" 
                            maxLength = {500} name="descripcion" value={descripcion} 
                            onChange={e => setDescripcion(e.target.value)}/>
                        </p>
                        <p>
                            <b>{descripcion}</b>
                        </p>
                    </div>
                    <div className="w3-panel m6 w3-col m6 w3-center">
                        <p>
                        <label class="w3-text-indigo"><b>Cargue su Logo.</b></label> 
                            <input type="file" name="logo" accept=".jpg,.jpeg,.png"
                            onChange={e => setLogo(e.target.value)}/>
                        </p>
                    </div>
                    <div className="w3-panel w3-col m6 w3-center">
                        <p>
                            <label class="w3-text-indigo"><b>Imágen encabezado.</b></label> 
                            <input type="file" name="imagen" accept=".jpg,.jpeg,.png"
                            onChange={changeImagen} />
                        </p>
                    </div>
                    
                    <div className="w3-col w3-panel w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                            Actualizar
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                        onClick={handleClearAll}>
                            <Link to="/users/admin">
                                Cancelar
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
