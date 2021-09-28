import React, {Fragment, useState} from 'react'
import axios from 'axios'

export default function ConfigEmpresa() {

    const [empresa, setEmpresa]= useState([]);
    
    const [admin,setAdmin] = useState('');
    const [logo,setLogo] = useState('');
    const [titulo,setTitulo] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const [Imagen, setImagen] = useState();
    const [telefono1,setTelefono1] = useState();
    const [telefono2,setTelefono2] = useState();
    const [telefono3,setTelefono3] = useState();
    const [direccion,setDireccion] = useState('');
    const [correo,setCorreo] = useState('');
    const [facebook,setFace] = useState('');
    const [instagram,setInst] = useState('');
    const [whatsapp,setWhat] = useState('');
    const [twitter,setTwit] = useState('');
    const [linkedin,setLinked] = useState('');

    var _id = '';
    
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    const handleClearAll = () => {
        setAdmin();
        setLogo();
        setTitulo();
        setDescripcion();
        setImagen();
        setTelefono1();
        setTelefono2();
        setTelefono3();
        setDireccion();
        setCorreo();
        setFace();
        setInst();
        setWhat();
        setTwit();
        setLinked();
    }

   
    
    async function componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/empresas');
        //setEmpresa(res.data);
        console.log(empresa)
        
        setAdmin(res.data.map(user => user.administrador))
        //setLogo();
        setTitulo(res.data.map(user => user.title));
        setDescripcion(res.data.map(user => user.descripcion));
        //setImagen();
        setTelefono1(res.data.map(user => user.telefono1));
        setTelefono2(res.data.map(user => user.telefono2));
        setTelefono3(res.data.map(user => user.telefono3));
        setDireccion(res.data.map(user => user.administrador));
        setCorreo(res.data.map(user => user.email));
        setFace(res.data.map(user => user.facebook));
        setInst(res.data.map(user => user.instagram));
        setWhat(res.data.map(user => user.whatsapp));
        setTwit(res.data.map(user => user.twitter));
        setLinked(res.data.map(user => user.linkedin)); 
        _id =  (res.data.map(user => user._id));     
    }

    const onSubmit = async e => {
        e.preventDefault()
        await axios.put('http://localhost:4000/api/empresas'+ _id ,{
            title:titulo ,
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
            linkedin:linkedin
        })
        handleClearAll()
    }


    return (
           
        <div className="w3-panel w3-col w3-pale-blue">
            <div>
                <button onClick={componentDidMount}>Editar datos Club</button>
                
                    {/*
                        empresa.map(datos =>(
                            <ul key={datos._id}>
                            <Fragment>
                                <li >{datos.administrador}</li>
                                <li >{datos.title}</li>
                            </Fragment>
                            </ul>
                        ))*/
                        
                    }
                
            </div>
            <form onSubmit={onSubmit}>
                <div className="w3-panel w3-center">
                    <h3>
                        Aquí se configura lo relacionado con la página.
                    </h3>
                </div>
                <div className="w3-panel w3-col m4">
                    <div>
                        Admin o representante legal.<br></br> 
                    </div>
                    <div>

                        <input type="text" maxLength = {50} name="admin" value= {admin}
                        onChange={e => setAdmin(e.target.value)}/>
                    </div>
                </div>
                <div className="w3-panel w3-col m4">
                    <div>
                        Dirección. 
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="direccion" value= {direccion}
                        onChange={e => setDireccion(e.target.value)}/>
                    </div>
                </div>
                <div className="w3-panel w3-col m4">
                    <div>
                        Teléfono. 
                    </div>
                    <div>
                        <input type="tel" maxLength = {15} name="telefono1" value= {telefono1}
                        onChange={e => setTelefono1(e.target.value)}/>
                    </div>
                    <div>
                        <input type="tel" maxLength = {15} name="telefono2" value= {telefono2}
                        onChange={e => setTelefono2(e.target.value)}/>
                    </div>
                    <div>
                        <input type="tel" maxLength = {15} name="telefono3" value= {telefono3} 
                        onChange={e => setTelefono3(e.target.value)}/>
                    </div>

                </div>
                <div className="w3-panel w3-col m4">
                    <div>
                        Ingrese aquí el título. 
                    </div>
                    <div>
                        <input type="text" maxLength = {50} name="titulo" value={titulo}
                        onChange={e => setTitulo(e.target.value)}/>
                    </div>
                   
                </div>
                
                <div className="w3-panel w3-col m8 w3-center">        
                    <div>
                        Aquí puede ingresar una breve descripción de su actividad, políticas o requerimientos, cualquier cosa que desee compartir. 
                    </div>
                    <div>
                        <input type="text" maxLength = {300} name="descripcion" value={descripcion} 
                        onChange={e => setDescripcion(e.target.value)}/>
                    </div>
                    <div>
                    {descripcion}
                    </div>
                </div>
                <div className="w3-panel m4 w3-col m4">
                    <div>
                        Correo electrónico. 
                    </div>
                    <div>
                        <input type="email" maxLength = {80} name="correo" value={correo}
                        onChange={e => setCorreo(e.target.value)}/>
                    </div>
                </div>
                <div className="w3-panel m4 w3-col m4">
                    <div>
                        Redes sociales. 
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="redes" value={facebook}
                        onChange={e => setFace(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="redes" value={instagram}
                        onChange={e => setInst(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="redes" value={whatsapp}
                        onChange={e => setWhat(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="redes" value={twitter}
                        onChange={e => setTwit(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" maxLength = {80} name="redes" value={linkedin}
                        onChange={e => setLinked(e.target.value)}/>
                    </div>
                </div>
                <div className="w3-panel m4 w3-col m4">
                    <div>
                        Logo. 
                    </div>
                    <div>
                        <input type="file" name="logo" accept=".jpg,.jpeg,.png"
                        onChange={e => setLogo(e.target.value)}/>
                    </div>
                </div>
                <div className="w3-panel w3-col w3-center">
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
                    <button type='reset' onClick={handleClearAll}>Cancelar</button>
                </div>
            </form>
        </div>
        
    )
}
