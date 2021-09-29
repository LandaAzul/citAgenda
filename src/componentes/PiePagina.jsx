import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

var idEm = '';

export function PiePagina() {

    const [admin, setAdmin]= useState('')
    const [telefono1,setTelefono1] = useState('');
    const [telefono2,setTelefono2] = useState('');
    const [telefono3,setTelefono3] = useState('');
    const [direccion,setDireccion] = useState('');
    const [correo,setCorreo] = useState('');
    const [facebook,setFace] = useState('');
    const [instagram,setInst] = useState('');
    const [whatsapp,setWhat] = useState('');
    const [linToWhatsapp, setLTW] = useState('');
    const [twitter,setTwit] = useState('');
    const [linkedin,setLinked] = useState('');

    async function componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/empresas');
        idEm = res.data.map(user => user._id).join()
        const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
        setAdmin(resp.data.message.administrador);
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
        setLTW('https://api.whatsapp.com/send?phone='+ whatsapp +'&text=Esto%20es%20una%20prueba')
    }

    componentDidMount()


    return (
        <div className="w3-container">
            <div className="w3-panel w3-black">
                <div className="w3-col m4  w3-center">
                    <a href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a><br></br>
                    <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a><br></br>
                    <a href={"https://api.whatsapp.com/send?phone=+57"+ whatsapp +"&text=Bienvenido,%20pronto%20lo%20atenderemos"} target="_blank" rel="noopener noreferrer">
                        Whatsapp
                    </a><br></br>
                    <a href={twitter} target="_blank" rel="noopener noreferrer">Twitter</a><br></br>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
                <div className="w3-col m4  w3-center">
                    {telefono1}<br></br>
                    {telefono2}<br></br>
                    {telefono3}<br></br>
                    {direccion}
                </div>
                <div className="w3-col m4  w3-center">
                    {admin}<br></br>
                    {/*<a href={"mailto:"+correo} target="_blank" rel="noopener noreferrer">Email</a>*/}
                    <a href={"mailto:"+correo} target="_blank" rel="noopener noreferrer">{correo}</a>
                </div>
            </div>
        </div>
    )
}
