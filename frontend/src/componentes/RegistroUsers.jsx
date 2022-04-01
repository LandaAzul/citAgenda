import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import rutas from '../helpers/rutas';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import '../index.css';
import useAuth from '../auth/useAuth';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import ReCAPTCHA from 'react-google-recaptcha';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { SelectPeso } from './SelectPeso';
import { SelectEstatura } from './SelectEstatura';
import { Toast } from 'primereact/toast';

const espacio = {
    margin: '10px',
}

export function RegistroUsers() {

    const { datosempresa } = useAuth();
    const toast = useRef(null);
    const resetBoton = useRef(null);
    const navigate = useNavigate();
    const captcha = useRef(null);
    const [nombre, setNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [celular, setCel] = useState('');
    const [telefono2, settelefono2] = useState('');
    const [direccion, setdireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [activo, setAct] = useState(false);
    const [rol, setRol] = useState('Socio');
    const [idFamiliares, setFam] = useState('');
    const [imagen, setimagen] = useState(null);
    const [preimagen, setpreimagen] = useState(null);
    const [namefile, setnamefile] = useState('');
    const [envio, setenvio] = useState(false);
    const [captchavalido, setcaptchavalido] = useState(false);
    const [mostrarencaptcha, setmostrarencaptcha] = useState(false);
    const [fechaNacimiento, setfechanacimiento] = useState('');
    const [estatura, setestatura] = useState(0);
    const [peso, setpeso] = useState(0);
    const [genero, setgenero] = useState('');
    const [barrio, setbarrio] = useState('');
    const [categoria, setcategoria] = useState('');
    const [torneos, settorneos] = useState('');
    const [brazoDominante, setbrazo] = useState('');


    const limpiarDatos = () => {
        setNombre('');
        setCod('');
        setDoc('');
        setCel('');
        settelefono2('');
        setdireccion('');
        setCorreo('');
        setContra('');
        setContra2('');
        setAct(false);
        setRol('Socio');
        setFam('');
        setimagen(null);
        setpreimagen(null)
        setnamefile('');
        setcaptchavalido(false);
        setmostrarencaptcha(false);
        captcha.current.reset();
        setfechanacimiento('')
        setestatura(0)
        setpeso(0)
        setgenero('')
        setbarrio('')
        setcategoria('')
        settorneos('')
        setbrazo('')
    }

    const enviarDatos = async (e) => {
        setenvio(true);
        try {
            //imagen.append('imagen', file)
            let respu = await axios.post(rutas.server + 'api/auth/signUp', {
                nombre: nombre,
                codigo: codigo,
                documento: documento,
                celular: celular,
                telefono2: telefono2,
                direccion: direccion,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: rol,
                contra: contra,
                email: correo,
                fechaNacimiento: fechaNacimiento,
                estatura: estatura,
                peso: peso,
                genero: genero,
                barrio: barrio,
                categoria: categoria,
                torneos: torneos,
                brazoDominante: brazoDominante
            })
            let id = respu.data.savedUser._id
            let token = respu.data.token
            enviarImagen(id, token);
            setenvio(false);
            limpiarDatos();
            swal({
                title: "En hora buena!",
                text: "Has sido registrado, por favor inicia sesión. Recuerda que el administrador deberá habilitar y dar tú respectivo roll",
                icon: "success",
                buttons: "Ok"
            })
            navigate(rutas.home, { replace: true });
        } catch (e) {
            setenvio(false);
            let respuesta = JSON.parse(e.request.response).message;
            if (e.request.status === 500) { swal('Error', 'Lo sentimos, al parecer hubo una falla en la transacción.' + respuesta, 'warning'); return }
            swal({
                title: "Datos ya existentes!",
                //text: ('Por favor revisa los datos ingresados, ' + respuesta),
                text: ('Por favor revisa los datos ingresados, uno o varios de los datos ya se encuentran registrados en nuestra base de datos.'),
                icon: "warning",
                buttons: 'cerrar'
            })
        }

    };

    const mostrarAlerta = () => {
        swal({
            title: 'Error en contraseñas',
            text: 'las contraseñas deben coincidir',
            icon: 'warning', //success , warning, info, error
            buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
            timer: '' //tiempo en milisegundos
        })
    };



    const validarContra = e => {
        e.preventDefault()
        if (!captchavalido) { setmostrarencaptcha(true); return }
        if (contra.length >= 8) {
            if (contra === contra2) {
                enviarDatos()
            }
            else {
                mostrarAlerta();
                return;
            }
        }
        else {
            swal("Contraseña muy corta!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning");
        }
    }

    // Bloque con todo lo relacionado con imagenes de usuario.....
    const subirImagen = (e) => {
        const [file] = e.target.files;
        if (file) {
            const validateSize = file.size < 2 * 1024 * 1024;
            const extencionName = /.(jpe?g|gif|png|jfif)$/i;
            const validateExtention = extencionName.test(file.name)
            if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); return }
            if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); return }
            if (validateSize && validateExtention) {
                document.getElementById('id01').style.display = 'block';
                const reader = new FileReader();
                reader.onloadend = () => {
                    setnamefile(file.name);
                    setimagen(file);
                    setpreimagen(reader.result);
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const enviarImagen = async (id, token) => {
        let file = new FormData()
        file.append('imagen', imagen)
        try {
            await axios.put(rutas.server + 'api/users/cambiarImagen/' + id, file,
                {
                    headers: {
                        'x-access-token': token,
                        'content-Type': 'multipart/form-data'
                    }
                })
        }
        catch (e) {
            swal('Upss', 'Algo no salio bien, no pudimos enviar tu imagen', 'error')
        }
    }


    const limpiarBoton = () => {
        resetBoton.current.value = '';
        setimagen(null);
        setpreimagen(null);
        setnamefile('');
    }

    // funcion para cerrar el modal fuera del cuadro de la imagen
    var modal = document.getElementById('id01');
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    const nombreAMay = (n) => {
        if (n === '') { setNombre(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setNombre(nombreCompleto.join(' '));
    }

    const onChange = () => {
        if (captcha.current.getValue()) { setcaptchavalido(true); setmostrarencaptcha(false) }
        else { setcaptchavalido(false) }
    }


    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />;
    }


    const validarCorreo = async (mail) => {
        try {
            const resp = await axios.get(rutas.server + 'api/auth/email/' + mail);
            if(resp.data){
                toast.current.show({ severity: 'warn', summary: 'Correo ya registrado', detail: 'Por favor verifica tu correo, ya tenemos este mail registrado en nuestra base de datos', life: 30000 });
            }
        }
        catch (e) {
            //console.log(e.request)
        }
        setCorreo(mail)
    }


    return (
        <>
            <Toast ref={toast} />
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
            <div className='componentes'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large w3-text-indigo">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                        <h2 className='w3-center w3-text-indigo w3-margin'><b>Regístrate aquí.</b></h2>
                    </div>
                    <form onSubmit={validarContra}>
                        <div style={{ maxWidth: '400px', margin: 'auto' }}>
                            {datosempresa.solNombre ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Nombre Completo.</b></label>
                                        <input autoFocus className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={nombre}
                                            onChange={e => nombreAMay(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solDocumento ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Número documento:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={20} value={documento}
                                            onChange={e => setDoc(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solCodigo ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Código:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text"
                                            maxLength={20} value={codigo}
                                            onChange={e => setCod(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solTelefono ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Celular/Teléfono:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel"
                                            maxLength={15} value={celular}
                                            onChange={e => setCel(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solTelefono2 ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Celular/Teléfono(2):</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel"
                                            maxLength={15} value={telefono2}
                                            onChange={e => settelefono2(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solDireccion ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Dirección:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel"
                                            maxLength={100} value={direccion}
                                            onChange={e => setdireccion(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solBarrio ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Barrio:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel"
                                            maxLength={100} value={barrio}
                                            onChange={e => setbarrio(e.target.value)} />
                                    </p>
                                </div> : null}
                            {datosempresa.solfechaNacimiento ?
                                <div className="w3-text-indigo">
                                    <label><b>Fecha de nacimiento:</b></label>
                                    <Calendar value={fechaNacimiento} onChange={(e) => setfechanacimiento(e)} monthNavigator yearNavigator yearRange="1922:2018"
                                        dateFormat="dd/mm/yy" readOnlyInput
                                        monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                                </div> : null}
                            {datosempresa.solEstatura ?
                                <div className='w3-margin-top'>
                                    <label className="w3-text-indigo"><b>Estatura(cm):</b></label>
                                    <SelectEstatura minimo={80} maximo={220} intervalo={1} value={estatura} onChange={e => setestatura(e)} />
                                </div> : null}
                            {datosempresa.solPeso ?
                                <div className='w3-margin-top'>
                                    <label className="w3-text-indigo"><b>Peso(kg):</b></label>
                                    <SelectPeso minimo={35} maximo={140} intervalo={1} value={peso} onChange={e => setpeso(e)} />
                                </div> : null}
                            {datosempresa.solGenero ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Género:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setgenero(e.target.value)}>
                                            <option defaultValue={''}></option>
                                            <option value={'masculino'}>Masculino</option>
                                            <option value={'femenino'}>Femenino</option>
                                            <option value={'otro'}>Otro</option>
                                        </select>
                                    </p>
                                </div> : null}
                            {datosempresa.solCategoria ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Categoría:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setcategoria(e.target.value)}>
                                            <option defaultValue={''}></option>
                                            <option value={'4ta B'}>4ta B</option>
                                            <option value={'4ta'}>4ta</option>
                                            <option value={'3ra B'}>3ra B</option>
                                            <option value={'2da'}>2da</option>
                                        </select>
                                    </p>
                                </div> : null}
                            {datosempresa.solBrazoDominante ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Brazo dominante:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setbrazo(e.target.value)}>
                                            <option defaultValue={''}></option>
                                            <option value={'derecho'}>Derecho</option>
                                            <option value={'izquierdo'}>Izquierdo</option>
                                            <option value={'ambidiestro'}>Ambidiestro</option>
                                        </select>
                                    </p>
                                </div> : null}
                            {datosempresa.solTorneos ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Torneos:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="tel"
                                            maxLength={100} value={torneos}
                                            onChange={e => settorneos(e.target.value)} />
                                    </p>
                                </div> : null}
                            <p>
                                <label className="w3-text-indigo"><b>Email:</b></label>
                                <input className="w3-input w3-border w3-round-large" type="email" required
                                    maxLength={50} value={correo}
                                    onChange={e => validarCorreo(e.target.value)} />
                            </p>
                            {datosempresa.solIdFamiliar ?
                                <div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Id Familiar:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text"
                                            maxLength={20} value={idFamiliares}
                                            onChange={e => setFam(e.target.value)} />
                                    </p>
                                </div> : null}
                            <div className='w3-margin-bottom'>
                                <label className="w3-text-indigo"><b>Contraseña:</b><br></br>
                                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask feedback={false} />
                                </label>
                            </div>
                            <div>
                                <label className="w3-text-indigo"><b>Confirme contraseña:</b></label><br></br>
                                <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" />
                            </div>
                            {datosempresa.solImagen ?
                                <div className="w3-center w3-margin-top w3-indigo w3-border w3-round-large w3-hover-blue">
                                    {namefile ?
                                        <div style={{ cursor: "pointer" }} className='w3-light-blue w3-border w3-round-large'
                                            onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                            {namefile}<br></br>
                                        </div>
                                        : null}
                                    <label style={{ cursor: "pointer" }} >
                                        {namefile ? <b>Elegir otra imagen.</b>
                                            : <b>Agregar imagen.</b>}
                                        <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif" ref={resetBoton}
                                            onChange={subirImagen} />
                                        <span className="material-icons-round">
                                            image
                                        </span>
                                    </label>
                                </div> : null}
                            {preimagen ?
                                <div className='w3-right-align'>
                                    <span style={{ cursor: "pointer" }} className="material-icons-round"
                                        onClick={e => { document.getElementById('id01').style.display = 'block' }} >
                                        visibility
                                    </span>
                                    <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={limpiarBoton}>
                                        delete
                                    </span>
                                </div> : null}
                            <div id="id01" className="w3-modal">
                                <div className="w3-modal-content w3-animate-opacity w3-card-4">
                                    <header className="w3-container w3-indigo w3-center">
                                        <span onClick={e => document.getElementById('id01').style.display = 'none'}
                                            className="w3-button w3-display-topright">&times;</span>
                                        <h3>{namefile}</h3>
                                    </header>
                                    <div className="w3-container w3-center">
                                        <img src={preimagen} alt="previsualización" className="w3-circle" style={{ width: "100%", maxWidth: "400px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w3-col w3-panel w3-center ">
                            <div style={{ margin: '10px auto', maxWidth: '300px' }}>
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LcOL34eAAAAACeYxi2YDP9-XFNo0l6qQYQupyKh"
                                    onChange={onChange}
                                />
                            </div>
                            {mostrarencaptcha &&
                                <div className='error-captcha'>
                                    Por favor acepta el captcha
                                </div>}
                        </div>
                        <div className="w3-col w3-panel w3-center ">
                            <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                Registrar
                            </button>
                            <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={limpiarDatos}>
                                Limpiar
                            </button>
                        </div>
                    </form>
                    <div className='w3-center w3-padding'>
                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={limpiarDatos}>
                            <Link to={rutas.home}>
                                Cerrar
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}