import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

var idEm = '';

const espacio = {
    margin: '10px',
}

export function ConfigEmpresa() {

    const { user } = useAuth();
    const [validar, setVal] = useState('');
    const [admin, setAdmin] = useState('');
    const [logo, setLogo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [Imagen, setImagen] = useState('');
    const [telefono1, setTelefono1] = useState('');
    const [telefono2, setTelefono2] = useState('');
    const [telefono3, setTelefono3] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [facebook, setFace] = useState('');
    const [instagram, setInst] = useState('');
    const [whatsapp, setWhat] = useState('');
    const [twitter, setTwit] = useState('');
    const [linkedin, setLinked] = useState('');
    const [youtube, setYou] = useState('');
    const [envio, setenvio] = useState(false);

    //if(user){if (user.role !== roles.admin) {return <Navigate to= {rutas.home}/>} }

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
        idEm = '';
    }



    async function traerDatos() {
        setenvio(true)
        try {
            const res = await axios.get(rutas.server + 'api/empresas');
            idEm = res.data.map(user => user._id).join()
            const resp = await axios.get(rutas.server + 'api/empresas/' + idEm);
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
            setenvio(false);
        }
        catch {
            setenvio(false)
            swal('Algo no salio bien', 'Por favor intenta de nuevo.', 'info')
        }
    }

    const enviarDatos = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresas/' + idEm, {
                title: titulo,
                descripcion: descripcion,
                administrador: admin,
                imagen: Imagen,
                telefono1: telefono1,
                telefono2: telefono2,
                telefono3: telefono3,
                logo: logo,
                direccion: direccion,
                email: correo,
                facebook: facebook,
                instagram: instagram,
                whatsapp: whatsapp,
                twitter: twitter,
                linkedin: linkedin,
                youtube: youtube
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false)
            handleClearAll();
            window.location.reload();
        } catch {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }

    const validarVacio = (e) => {
        e.preventDefault()
        if (validar) {
            swal({
                title: '¿Actualizar datos?',
                text: ('Estas a punto de modificar uno o más datos, si estas de acuerdo da en "Continuar".'),
                icon: 'info',
                buttons: ['Cancelar', 'Continuar'],
            }).then(res => {
                if (res) enviarDatos();
            })
        }
        else {
            swal({
                title: 'Sin datos',
                text: 'Por favor de clic en "Editar datos club"',
                icon: 'info', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const nombreAMay = (n) => {
        if (n === '') { setAdmin(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setAdmin(nombreCompleto.join(' '));
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    return (
        <>
            {/*aquí para pantallas grandes ##############################################################3*/}
            <div id="id02" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <h3>Por favor espera un momento</h3>
                        Estamos trabajando en tu solicitud.
                    </header>
                    <div className="w3-container w3-panel w3-center">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="4s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="1.8s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" /><br></br>
                        <ProgressBar mode="indeterminate" style={{ height: '8px' }} />
                    </div>
                </div>
            </div>
            <div style={{ position: 'relative', left: '10%' }} className="w3-container w3-hide-small">
                <div className="w3-container w3-col m10 w3-padding">
                    <div className="w3-container w3-padding w3-card w3-white">
                        <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                            <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={traerDatos}>Editar datos Club</button>
                        </div>
                        <form className="w3-container" onSubmit={validarVacio}>
                            <div className="w3-container w3-col m6 w3-padding">
                                <p>
                                    <label className="w3-text-indigo"><b>Admin o representante legal.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={50} name="admin" value={admin}
                                        onChange={e => nombreAMay(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Dirección.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={90} name="direccion" value={direccion}
                                        onChange={e => setDireccion(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Teléfono(s).</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="tel"
                                        maxLength={10} name="telefono1" value={telefono1}
                                        onChange={e => setTelefono1(e.target.value)} />
                                    <input className="w3-input w3-border w3-round-large" type="tel"
                                        maxLength={10} name="telefono1" value={telefono2}
                                        onChange={e => setTelefono2(e.target.value)} />
                                    <input className="w3-input w3-border w3-round-large" type="tel"
                                        maxLength={10} name="telefono1" value={telefono3}
                                        onChange={e => setTelefono3(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="email"
                                        maxLength={80} name="correo" value={correo}
                                        onChange={e => setCorreo(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Ingrese aquí el título.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={50} name="titulo" value={titulo}
                                        onChange={e => setTitulo(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Sitio Web.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={80} value={logo}
                                        onChange={e => setLogo(e.target.value)} />
                                </p>
                            </div>
                            <div className="w3-container w3-col m6 w3-padding">
                                <p>
                                    <label className="w3-text-indigo"><b>Facebook.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} name="redes" value={facebook}
                                        onChange={e => setFace(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-pink"><b>Instagram.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} name="redes" value={instagram}
                                        onChange={e => setInst(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-green"><b>Whatsapp.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} name="redes" value={whatsapp}
                                        onChange={e => setWhat(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-blue"><b>Twitter.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} name="redes" value={twitter}
                                        onChange={e => setTwit(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-blue"><b>Linkedin.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} name="redes" value={linkedin}
                                        onChange={e => setLinked(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-red"><b>Youtube.</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={300} name="redes" value={youtube}
                                        onChange={e => setYou(e.target.value)} />
                                </p>
                            </div>

                            <div className="w3-panel w3-col m12">
                                <p>
                                    <label className="w3-text-indigo">
                                        <b>
                                            Texto, políticas o información a mostrar:
                                        </b>
                                    </label>
                                    <input className="w3-input w3-animate-input w3-border w3-round-xlarge" type="text"
                                        maxLength={1000} name="descripcion" value={descripcion}
                                        onChange={e => setDescripcion(e.target.value)} />
                                </p>
                                <p>
                                    <b>{descripcion}</b>
                                </p>
                            </div>
                            {/*<div className="w3-panel m6 w3-col m6 w3-center">
                                <p>
                                <label className="w3-text-indigo"><b>Cargue su Logo.</b></label> 
                                    <input type="file" name="logo" accept=".jpg,.jpeg,.png"
                                    onChange={e => setLogo(e.target.value)}/>
                                </p>
                            </div>
                            <div className="w3-panel w3-col m6 w3-center">
                                <p>
                                    <label className="w3-text-indigo"><b>Imágen encabezado.</b></label> 
                                    <input type="file" name="imagen" accept=".jpg,.jpeg,.png"
                                    onChange={changeImagen} />
                                </p>
                            </div>*/}

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
            </div>

            {/*aquí para pantallas pequeñas ##############################################################3*/}
            <div className="w3-hide-large w3-hide-medium">

            </div>
        </>
    )
}
