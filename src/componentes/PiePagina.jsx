import React, {useState} from 'react'
import axios from 'axios'
import logoFace from '../imagenes/logoFace.png';
import logoInsta from '../imagenes/logoInsta.png';
import logoWhat from '../imagenes/logoWhat.png';
import logoTwit from '../imagenes/logoTwit.png';
import logoLink from '../imagenes/logoLink.png';
import logoYou from '../imagenes/logoYou.png';

var idEm = '';

export function PiePagina() {

    const [admin, setAdmin]= useState('')
    const [titulo, setTitulo]= useState('')
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

    async function componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/empresas');
        idEm = res.data.map(user => user._id).join()
        const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
        setAdmin(resp.data.message.administrador);
        setTitulo(resp.data.message.title);
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

    componentDidMount()


    return (
        <div className="w3-container">
            <div className="w3-panel w3-black">
                <div className="w3-col w3-center">
                    <h3>
                        <b>{titulo}</b><br></br>
                    </h3>
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Dirección:</b><br></br>
                    <b>{direccion}</b>
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Teléfono(s):</b><br></br>
                    <b>{telefono1} - </b>
                    <b>{telefono2}</b><br></br>
                    <b>{telefono3}</b><br></br>
                </div>
                <div className="w3-col m4  w3-center">
                    <b>Contacto:</b><br></br>
                    <b>{admin}</b><br></br>
                    <a href={"mailto:"+correo} target="_blank" rel="noopener noreferrer">
                        <b>
                            {correo}
                        </b>
                    </a>
                </div>
                <div className="w3-col w3-panel w3-center">
                    {facebook ?
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <img src={logoFace} alt="link a facebook"  width="35px" height="35px" className="w3-round"/>
                    </a>: null}
                    {instagram ?
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <img src={logoInsta} alt="link a instagram"  width="33px" height="33px" className="w3-round"/>
                    </a>: null}
                    {whatsapp ?
                    <a href={"https://api.whatsapp.com/send?phone=+57"+ whatsapp +"&text=Bienvenido,%20pronto%20lo%20atenderemos"} target="_blank" rel="noopener noreferrer">
                        <img src={logoWhat} alt="link a whatsapp"  width="36px" height="33px" className="w3-round"/>
                    </a>: null}
                    {twitter ?
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <img src={logoTwit} alt="link a twitter"  width="48px" height="48px" className="w3-round"/>
                    </a>: null}
                    {linkedin ?
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <img src={logoLink} alt="link a linkedin"  width="33px" height="29px" className="w3-round"/>
                    </a>: null}
                    {youtube ?
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <img src={logoYou} alt="link a youtube"  width="36px" height="40px" className="w3-round"/>
                    </a>: null}
                   
                </div>
            </div>
        </div>
    )
}
