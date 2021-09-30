import React, {useState} from 'react'
import axios from 'axios'
import logoFace from '../imagenes/logoFace.png';
import logoInsta from '../imagenes/logoInsta.jpg';
import logoWhat from '../imagenes/logoWhat.png';
import logoTwit from '../imagenes/logoTwit.png';
import logoLink from '../imagenes/logoLink.png';
import logoYou from '../imagenes/logoYou.png';

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
    const [youtube,setYou] = useState('');

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
        setYou(resp.data.message.youtube); 
        setLTW('https://api.whatsapp.com/send?phone='+ whatsapp +'&text=Esto%20es%20una%20prueba')
    }

    componentDidMount()


    return (
        <div className="w3-container">
            <div className="w3-panel w3-black">
                <div className="w3-col m2  w3-center w3-panel">
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <img src={logoFace} alt="link a facebook"  width="18%" height="18%" className="w3-round"/>
                    </a><br></br>
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <img src={logoInsta} alt="link a instagram"  width="24%" height="24%" className="w3-round"/>
                    </a><br></br>
                    <a href={"https://api.whatsapp.com/send?phone=+57"+ whatsapp +"&text=Bienvenido,%20pronto%20lo%20atenderemos"} target="_blank" rel="noopener noreferrer">
                        <img src={logoWhat} alt="link a whatsapp"  width="18%" height="18%" className="w3-round"/>
                    </a><br></br>
                   
                </div>
                <div className="w3-col m2  w3-center w3-panel">
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <img src={logoTwit} alt="link a twitter"  width="24%" height="24%" className="w3-round"/>
                    </a><br></br>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <img src={logoLink} alt="link a linkedin"  width="19%" height="19%" className="w3-round"/>
                    </a><br></br>
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <img src={logoYou} alt="link a youtube"  width="20%" height="20%" className="w3-round"/>
                    </a>
                </div>
                <div className="w3-col m4  w3-center w3-panel">
                    {telefono1}<br></br>
                    {telefono2}<br></br>
                    {telefono3}<br></br>
                    {direccion}
                </div>
                <div className="w3-col m4  w3-center w3-panel">
                    {admin}<br></br>
                    {/*<a href={"mailto:"+correo} target="_blank" rel="noopener noreferrer">Email</a>*/}
                    <a href={"mailto:"+correo} target="_blank" rel="noopener noreferrer">{correo}</a>
                </div>
            </div>
        </div>
    )
}
