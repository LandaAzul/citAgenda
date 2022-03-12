import React, { useState, useEffect, useRef } from 'react'
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import axios from 'axios'
import roles from "../helpers/roles";
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

export function CrearTablaHorario({ horario }) {

    const selectSocio = useRef();
    const selectProfesor = useRef();
    const selectCanchero = useRef();

    const [envio, setenvio] = useState(false);

    const { user, upDateDates } = useAuth();
    const [franjas, setfranjas] = useState(horario)
    const [idhorario, setidhorario] = useState('')

    const [dia, setdia] = useState('')
    const [indice, setindice] = useState(0)
    const [autor1, setautor1] = useState('')
    const [autor2, setautor2] = useState('')
    const [autor3, setautor3] = useState('')
    const [autor4, setautor4] = useState('')
    const [fecha, setfecha] = useState('')
    const [turno, setturno] = useState('')
    const [horaSolicitud, sethoraSolicitud] = useState('')
    const [asistio, setasistio] = useState(false)
    const [profesor, setprofesor] = useState('')
    const [canchero, setcanchero] = useState('')
    const [solicita, setsolicita] = useState('')

    const [socios, setsocios] = useState('')
    const [profesores, setprofesores] = useState('')
    const [cancheros, setcancheros] = useState('')


    useEffect(() => {
        setfranjas(horario)
    }, [horario])

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    const agendar = (id, dia, indice, fecha, turno, profe, canche) => {
        if (!user) { swal('Upss', 'Para solicitar o agendar una cita por favor inicia sesión', 'info'); return }
        document.getElementById('id05').style.display = 'block';
        setidhorario(id)
        setdia(dia)
        setindice(indice)
        if (user.role !== 'Administrador') { setautor1(user.id) }
        setfecha(fecha)
        setturno(turno)
        setprofesor(profe)
        setcanchero(canche)
        if (profe !== null) {
            if (profe !== '') { setsolicita('Clase') }
            else { setsolicita('Turno') }
        }
        else { setsolicita('Turno') }

    }


    const autor2AMay = (n) => {
        if (autor1 === '') { swal('Sin autor 1', 'Por favor "carga datos" y selecciona un usuario', 'info'); return }
        if (n === '') { setautor2(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setautor2(nombreCompleto.join(' '));
    }


    const autor3AMay = (n) => {
        if (autor1 === '' || autor2 === '') { swal('Sin autores', 'Debes agregar los anteriores autores', 'info'); return }
        if (n === '') { setautor3(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setautor3(nombreCompleto.join(' '));
    }

    const autor4AMay = (n) => {
        if (autor1 === '' || autor2 === '' || autor3 === '') { swal('Sin autores', 'Debes agregar los anteriores autores', 'info'); return }
        if (n === '') { setautor4(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setautor4(nombreCompleto.join(' '));
    }

    const limpiar = () => {
        if (user.role === 'Administrador') {
            selectSocio.current.value = ''; selectProfesor.current.value = ''; selectCanchero.current.value = ''; setautor1(''); setprofesor(''); setcanchero('')
        }
        setautor2('')
        setautor3('')
        setautor4('')
    }


    const traerDatos = async () => {
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users', {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setsocios(res.data.filter(user => user.rol[0].name === roles.socio && user.activo === true))
            setprofesores(res.data.filter(user => user.rol[0].name === roles.profesor && user.activo === true))
            setcancheros(res.data.filter(user => user.rol[0].name === roles.canchero && user.activo === true))
            setenvio(false);
            console.log(socios, profesores, cancheros)
        }
        catch (e) { setenvio(false); }
    }


    if (franjas) {
        if (franjas) {
            return (
                <>
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
                    {/*bloque para usuarios socios*/}
                    <div id="id05" className="w3-modal">
                        <div style={{ maxWidth: '850px', margin: '-30px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id05').style.display = 'none' }}        >
                                    &times;
                                </span>
                                <h2><b>{user.nombre}</b></h2>
                                <h3>Solicitud de: <b>{solicita}</b></h3>
                                {profesor ? <h3>Profesor: <b>{profesor}</b></h3> : null}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '650px' }} className="w3-panel w3-text-indigo">Otros participantes<br></br>
                                {user.role === 'Administrador' ?
                                    <div style={{ marginTop: '15px' }}>
                                        {socios.length < 1 ?
                                            <div >
                                                <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-small"
                                                    onClick={e => traerDatos()}>
                                                    Cargar Datos
                                                </button>
                                            </div> : null}
                                        {socios.length > 0 ?
                                            <label>Participante(1): <b></b>
                                                <select ref={selectSocio} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => setautor1(e.target.value)}>
                                                    <option defaultValue={''} value={''}>Seleccione un usuario</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb.documento} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label> : null}
                                    </div>
                                    : null}
                                <div>
                                    <label>Participante(2): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 2" title="escriba aquí el nombre del solicitante 2"
                                        onChange={e => autor2AMay(e.target.value)} value={autor2} />
                                </div>
                                <div>
                                    <label>Participante(3): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 3" title="escriba aquí el nombre del solicitante 3"
                                        onChange={e => autor3AMay(e.target.value)} value={autor3} />
                                </div>
                                <div>
                                    <label>Participante(4): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 4" title="escriba aquí el nombre del solicitante 4"
                                        onChange={e => autor4AMay(e.target.value)} value={autor4} />
                                </div>
                                <div className='w3-padding w3-center'>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-small"
                                        onClick={limpiar}>
                                        Limpiar
                                    </button>
                                </div>
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                    >
                                        Solicitar
                                    </button>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id05').style.display = 'none' }}>
                                        Cerrar
                                    </button>
                                </div>
                                {user.role === 'Administrador' ?
                                    <div style={{ marginTop: '15px' }}>
                                        {profesores.length > 0 ?

                                            <label>Profesor: <b></b>
                                                <select ref={selectProfesor} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => setprofesor(e.target.value)}>
                                                    <option defaultValue={''} value={''}>Seleccione un profesor</option>
                                                    {profesores.map(prof =>
                                                        <option key={prof.documento} value={prof._id}>{prof.nombre}</option>
                                                    )};
                                                </select>
                                            </label> : null}
                                        {cancheros.length > 0 ?
                                            <label>Canchero: <b></b>
                                                <select ref={selectCanchero} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => setprofesor(e.target.value)}>
                                                    <option defaultValue={''} value={''}>Seleccione un canchero</option>
                                                    {cancheros.map(fbb =>
                                                        <option key={fbb.documento} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            : null}
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                    {/*bloque para otros usuarios*/}
                    {/*bloque para montar el horario*/}
                    {
                        franjas.lugar ?
                            <div className="w3-text-indigo w3-center w3-panel w3-white">
                                <div>
                                    <h1>{franjas.lugar}</h1>
                                </div>
                                <div className="w3-container w3-responsive w3-margin-bottom">
                                    <table className="w3-table-all w3-centered w3-hoverable">
                                        <thead>
                                            <tr className="w3-indigo">
                                                <th>Hora/Día</th>
                                                {franjas.horario[0].lunes ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].lunes.fecha}</th> : null}
                                                {franjas.horario[0].martes ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].martes.fecha}</th> : null}
                                                {franjas.horario[0].miercoles ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].miercoles.fecha}</th> : null}
                                                {franjas.horario[0].jueves ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].jueves.fecha}</th> : null}
                                                {franjas.horario[0].viernes ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].viernes.fecha}</th> : null}
                                                {franjas.horario[0].sabado ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].sabado.fecha}</th> : null}
                                                {franjas.horario[0].domingo ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].domingo.fecha}</th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                franjas.horario.map(dato => (

                                                    <tr key={dato.indice} title="Clíck para agendar turno">
                                                        <td>{dato.franja}</td>
                                                        {franjas.horario[0].lunes ? <td onClick={e => { agendar(franjas._id, 'lunes', dato.indice, dato.lunes.fecha, dato.lunes.turno, dato.lunes.profesor, dato.lunes.canchero) }}></td> : null}
                                                        {franjas.horario[0].martes ? <td onClick={e => { agendar(franjas._id, 'martes', dato.indice, dato.martes.fecha, dato.martes.turno, dato.martes.profesor, dato.martes.canchero) }} ></td> : null}
                                                        {franjas.horario[0].miercoles ? <td onClick={e => { agendar(franjas._id, 'miercoles', dato.indice, dato.miercoles.fecha, dato.miercoles.turno, dato.miercoles.profesor, dato.miercoles.canchero) }}></td> : null}
                                                        {franjas.horario[0].jueves ? <td onClick={e => { agendar(franjas._id, 'jueves', dato.indice, dato.jueves.fecha, dato.jueves.turno, dato.jueves.profesor, dato.jueves.canchero) }}></td> : null}
                                                        {franjas.horario[0].viernes ? <td onClick={e => { agendar(franjas._id, 'viernes', dato.indice, dato.viernes.fecha, dato.viernes.turno, dato.viernes.profesor, dato.viernes.canchero) }}></td> : null}
                                                        {franjas.horario[0].sabado ? <td onClick={e => { agendar(franjas._id, 'sabado', dato.indice, dato.sabado.fecha, dato.sabado.turno, dato.sabado.profesor, dato.sabado.canchero) }}></td> : null}
                                                        {franjas.horario[0].domingo ? <td onClick={e => { agendar(franjas._id, 'domingo', dato.indice, dato.domingo.fecha, dato.domingo.turno, dato.domingo.profesor, dato.domingo.canchero) }}></td> : null}
                                                    </tr>

                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                </>
            )
        }
        else {
            return (
                <div>Franjas vacia</div>
            )
        }
    }
    else {
        return null
    }
}
