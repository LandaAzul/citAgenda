import React, { useState, useEffect, useRef } from 'react'
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import axios from 'axios'
import roles from "../helpers/roles";
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import { InputSwitch } from 'primereact/inputswitch';


export function CrearTablaHorario({ horario }) {


    const selectSocio = useRef();
    const selectProfesor = useRef();
    const selectCanchero = useRef();
    const [envio, setenvio] = useState(false);
    const { user, roll, upDateDates, datosempresa } = useAuth();
    const [franjas, setfranjas] = useState(horario)
    const [idhorario, setidhorario] = useState('')
    const [dia, setdia] = useState('')
    const [indice, setindice] = useState(0)
    const [preautor, setpreautor] = useState('')
    const [codigo, setcodigo] = useState('')
    const [autor1, setautor1] = useState('')
    const [autor2, setautor2] = useState('')
    const [autor3, setautor3] = useState('')
    const [autor4, setautor4] = useState('')
    const [fecha, setfecha] = useState('')
    const [turno, setturno] = useState('')
    const [turnoEdit, setturnoedit] = useState('')
    const [asistio, setasistio] = useState(false)
    const [preprofesor, setpreprofesor] = useState('')
    const [idpreprofesor, setidpreprofesor] = useState('')
    const [colorProfesor, setcolorprofesor] = useState('')
    const [idProfesor, setidprofesor] = useState('')
    const [profesor, setprofesor] = useState('')
    const [precanchero, setprecanchero] = useState('')
    const [idprecanchero, setidprecanchero] = useState('')
    const [canchero, setcanchero] = useState('')
    const [idCanchero, setidcanchero] = useState('')
    const [solicita, setsolicita] = useState('')
    const [socios, setsocios] = useState([])
    const [profesores, setprofesores] = useState([])
    const [cancheros, setcancheros] = useState([])
    const [haycita, sethaycita] = useState(false)
    const [demanda, setdemanda] = useState(false)
    const [asistencia, setasistencia] = useState(false)


    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    useEffect(() => {
        setfranjas(horario)
        document.getElementById('id05').style.display = 'none';
        document.getElementById('id06').style.display = 'none';
        document.getElementById('id07').style.display = 'none';
        document.getElementById('id08').style.display = 'none';
    }, [horario])

    const agendar = (id, dia, indice, fecha, turno, idProfe, profe, idCanche, canche, aut1) => {
        if (!user) { swal('Upss', 'Para solicitar o agendar por favor inicia sesión', 'info'); return }
        if (roll === roles.admin) {
            traerDatos();
            traerCanchero(idCanche)
            traerProfesor(idProfe)
            if (aut1 !== null && aut1 !== '') {
                traerPreautor(aut1)
                sethaycita(true)
            }
            document.getElementById('id05').style.display = 'block';
        }
        if (roll === roles.socio) {
            traerAutor(user.id)
            if (aut1 !== null && aut1 !== '') {
                if (user.id.toString() !== aut1.toString()) { swal('Franja ya asignada', 'Por favor elige un turno diferente, este turno no esta disponible.', 'info'); return }
                else {
                    sethaycita(true)
                }
            }
            document.getElementById('id06').style.display = 'block';
        }
        if (roll === roles.canchero) {
            ajustarTurno(turno)
            validarAsistencia(id, indice, dia)
            //traerAutor(user.id)
            if (aut1 === null || aut1 === '') { swal('Franja sin asignar', 'No puedes editar este registro ya que este turno no ha sido solicitado.', 'info'); return }
            if (idCanche === null) { swal('No estás asociado a esta franja', 'No puedes editar este registro ya que no estas asociado para este turno.', 'info'); return }
            if (idCanche !== null || idCanche !== '') {
                if (aut1 !== null || aut1 !== '') {
                    if (user.id.toString() !== idCanche.toString()) { swal('No estás asociado a este turno', 'No puedes editar este registro ya que no estas asociado para este turno.', 'info'); return }
                    else {
                        traerPreautor(aut1)
                        document.getElementById('id08').style.display = 'block';
                    }
                }
                else {
                    swal('Franja sin asignar', 'Esta franja aun no ha sido solicitada.', 'info');
                    return;
                }
            }
            else {
                swal('Sin asignar', 'No existe o no estas asignado a esta franja.', 'info');
                return;
            }

        }
        if (profe !== null) {
            if (profe !== '') { setsolicita('Clase') }
            else { setsolicita('Turno') }
        }
        else { setsolicita('Turno') }
        setidhorario(id);
        setdia(dia)
        setindice(indice)
        setfecha(fecha)
        setturno(turno)
        setpreprofesor(profe)
        setprecanchero(canche)
        setidprecanchero(idCanche)
        setidpreprofesor(idProfe)

    }


    const autor2AMay = (n) => {
        if (autor1 === '') { swal('Sin autor 1', 'Por favor selecciona el usuario principal para esta cita', 'info'); return }
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
        }
        catch (e) {
            setenvio(false);
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const traerPreautor = async (id) => {
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setpreautor(res.data.message.nombre)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const traerAutor = async (id) => {
        if (id === '') { return }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });

            setautor1(res.data.message._id)
            setcodigo(res.data.message.codigo)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const traerCanchero = async (id) => {
        if (id === null) { setidcanchero(''); setcanchero(''); return }
        if (id === '') { setcanchero(''); return }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setcanchero(res.data.message.nombre)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const traerProfesor = async (id) => {
        if (id === null) { setidprofesor(''); setprofesor(''); setcolorprofesor(''); return }
        if (id === '') { setprofesor(''); setcolorprofesor(''); return }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            //console.log(!!res.data.message)
            setprofesor(res.data.message.nombre)
            setcolorprofesor(res.data.message.color)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const limpiarDatos = () => {
        setautor1('')
        setautor2('')
        setautor3('')
        setautor4('')
        setcanchero('')
        setprofesor('')
        setsocios([])
        setprofesores([])
        setsocios([])
        setcancheros([])
        setsolicita('')
        sethaycita(false)
        setpreprofesor('')
        setidpreprofesor('')
        setcolorprofesor('')
        setprecanchero('')
        setidprecanchero('')
        setpreautor('')
        setfecha('')
        setturno('')
        setdemanda(false)
        setidprofesor('')
        setidcanchero('')
        setcodigo('')
        setturnoedit('')
        setdia('')
        setasistencia(false)
    }


    const pedirCita = async () => {
        var hoy = new Date();
        var day = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        if (autor1 === '') { swal('¿Autor 1?', 'Debes seleccionar por lo menos un autor o solicitante para este turno', 'info'); return }
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/solicitud/' + idhorario, {
                dia: dia,
                indice: indice,
                autor1: autor1,
                codigo: codigo,
                autor2: autor2,
                autor3: autor3,
                autor4: autor4,
                horaSolicitud: (day + ' ' + hora),
                solicita: solicita,
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            swal('Excelente', 'Se ha registrado con éxito tu agenda', 'success');
            limpiarDatos();
            upDateDates();
            document.getElementById('id05').style.display = 'none';
            document.getElementById('id06').style.display = 'none';
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const cancelarCita = async () => {
        setenvio(true)
        //var hoy = new Date();
        //var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
        //var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        try {
            await axios.put(rutas.server + 'api/horario/solicitud/' + idhorario, {
                dia: dia,
                indice: indice,
                autor1: '',
                codigo: '',
                autor2: '',
                autor3: '',
                autor4: '',
                horaSolicitud: '',
                solicita: 'cancelar'
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            swal('Bien', 'Se ha cancelado la cita seleccionada', 'success');
            limpiarDatos();
            upDateDates();
            document.getElementById('id05').style.display = 'none';
            document.getElementById('id06').style.display = 'none';
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const actualizarProfesor = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/configuracion/' + idhorario, {
                dia: dia,
                indice: indice,
                profesor: profesor,
                idProfesor: idProfesor,
                canchero: canchero,
                idCanchero: idCanchero,
                colorProfesor: colorProfesor
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            upDateDates();
            limpiarDatos();
            swal('Listo', 'Hemos actualizado estos datos', 'info')
        }
        catch {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const prepedirCita = () => {
        swal({
            title: 'Solicitar turno',
            text: 'Para agendar este turno por favor clic en: "Continuar".',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                pedirCita()
            }
        })
    }


    const preAsistio = () => {

        var hoy = new Date();
        var day = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes();
        if (fecha > day) { swal('El usuario aun no asiste a este turno', 'No se puede validar la asistencia antes de la fecha del turno', 'info'); return }
        if (fecha === day) { if (turnoEdit > hora) { swal('El usuario aun no asiste a este turno', 'No se puede validar la asistencia antes de la hora del turno', 'info'); return } }
        swal({
            title: 'Asistencia',
            text: 'Para validar la asistencia del usuario a este turno, por favor clic en: "Continuar".',
            icon: 'info', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                Asistio()
            }
        })
    }


    const Asistio = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/asistio/' + idhorario, {
                dia: dia,
                indice: indice,
                asistio: true
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            limpiarDatos();
            setenvio(false)
            document.getElementById('id08').style.display = 'none';
            swal('Listo', 'Quedó registrada la asistencia del usuario a este turno', 'info')
        }
        catch (e) {
            console.log(e.request)
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const precancelarCita = () => {
        swal({
            title: 'Cancelar turno',
            text: 'Para cancelar este turno por favor clic en: "Continuar".',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                cancelarCita()
            }
        })
    }


    const preactualizarProfesor = () => {
        swal({
            title: '¿Actualizar estos datos?',
            text: 'Para actualizar estos datos por favor clic en: "Continuar".',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                actualizarProfesor()
            }
        })
    }


    const granDemanda = (id, indice, franja, dem) => {
        if (roll === roles.admin) {
            document.getElementById('id07').style.display = 'block';
            setidhorario(id);
            setindice(indice);
            setturno(franja);
            setdemanda(dem)
        }
    }

    const cambiarDemanda = () => {
        //console.log(!demanda)

        limpiarDatos();
    }


    const ajustarTurno = (turn) => {
        let minute = (turn.slice(3)).substring(0, 2)
        let houre = 0
        if ((turn.slice(5)).substring(0, 2) === 'am') {
            if (turn.substring(0, 2) === 12) houre = 0
            else houre = turn.substring(0, 2)
        }
        else houre = parseInt(turn.substring(0, 2)) + 12;
        setturnoedit(houre + ':' + minute)
    }

    const validarAsistencia = async (id, indi, diaa) => {
        try {
            const respu = await axios.get(rutas.server + 'api/horario/' + id)
            if (diaa === 'lunes') setasistencia(respu.data.horario.horario[indi].lunes.asistio)
            if (diaa === 'martes') setasistencia(respu.data.horario.horario[indi].martes.asistio)
            if (diaa === 'miercoles') setasistencia(respu.data.horario.horario[indi].miercoles.asistio)
            if (diaa === 'jueves') setasistencia(respu.data.horario.horario[indi].jueves.asistio)
            if (diaa === 'viernes') setasistencia(respu.data.horario.horario[indi].viernes.asistio)
            if (diaa === 'sabado') setasistencia(respu.data.horario.horario[indi].sabado.asistio)
            if (diaa === 'domingo') setasistencia(respu.data.horario.horario[indi].domingo.asistio)
        }
        catch (e) {
            swal('Upss', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo', 'info')
        }
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
                    {/*bloque para usuarios admin*/}
                    <div id="id05" className="w3-modal">
                        <div style={{ maxWidth: '900px', margin: '-50px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id05').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                {haycita ? <div className='w3-padding w3-pale-green w3-text-indigo w3-round-large'>
                                    Esta franja ya está asignada a: <b style={{ fontSize: '20px' }}>{preautor}</b>
                                </div> : null}
                                {preprofesor ? <b>Profesor : {preprofesor}</b> : null}<br></br>
                                {precanchero ? <b>Canchero : {precanchero}</b> : null}<br></br>
                                {dia + '\u00A0\u00A0'}{fecha + '\u00A0\u00A0'}{turno}
                            </header>
                            <div className="w3-panel w3-text-indigo">
                                <div className='w3-col m6 w3-padding'>
                                    {socios.length > 0 ?
                                        <label>Participante(1): <b></b>
                                            <select ref={selectSocio} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                onChange={e => traerAutor(e.target.value)}>
                                                <option defaultValue={''} value={''}>Seleccione un usuario</option>
                                                {socios.map(fbb =>
                                                    <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                )};
                                            </select>
                                        </label> : null}
                                    <label>Participante(2): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 2" title="escriba aquí el nombre del solicitante 2"
                                        onChange={e => autor2AMay(e.target.value)} value={autor2} />
                                    <label>Participante(3): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 3" title="escriba aquí el nombre del solicitante 3"
                                        onChange={e => autor3AMay(e.target.value)} value={autor3} />
                                    <label>Participante(4): <b></b></label>
                                    <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Autor 4" title="escriba aquí el nombre del solicitante 4"
                                        onChange={e => autor4AMay(e.target.value)} value={autor4} />
                                    <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                        {haycita ? <div>
                                            <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => prepedirCita()}>
                                                Editar turno
                                            </button><button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => precancelarCita()}>
                                                Cancelar turno
                                            </button>
                                        </div>
                                            : <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => prepedirCita()}>
                                                Agendar turno
                                            </button>}
                                    </div>
                                </div>
                                <div className='w3-col m6 w3-padding'>
                                    {profesores.length > 0 ?
                                        <label>Profesor: <b></b>
                                            <select ref={selectProfesor} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                onChange={e => { setidprofesor(e.target.value); traerProfesor(e.target.value) }}>
                                                <option defaulvalue={idpreprofesor} value={idpreprofesor}>{preprofesor}</option>
                                                <option value={''}>Sin profesor</option>
                                                {profesores.map(prof =>
                                                    <option key={prof._id} value={prof._id}>{prof.nombre}</option>
                                                )};
                                            </select>
                                        </label> : null}
                                    {cancheros.length > 0 ?
                                        <label>Canchero: <b></b>
                                            <select ref={selectCanchero} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                onChange={e => { setidcanchero(e.target.value); traerCanchero(e.target.value) }}>
                                                <option defaulvalue={idprecanchero} value={idprecanchero}>{precanchero}</option>
                                                <option value={''}>Sin canchero</option>
                                                {cancheros.map(fbb =>
                                                    <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                )};
                                            </select>
                                        </label>
                                        : null}
                                    <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                            onClick={e => preactualizarProfesor()}>
                                            Actualizar
                                        </button>
                                    </div>
                                    Si no se muestra lista de profesores o cancheros por favor verifique que se encuentren activos.
                                    Usuarios inactivos no serán listados.
                                </div>
                                <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id05').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Bloque para mostrar modal de asignar si es franja de gran demanda*/}
                    <div id="id07" className="w3-modal">
                        <div style={{ maxWidth: '600px' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id07').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                franja: {turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                <label style={{ marginLeft: '25px' }}><b>Franja de gran demanda</b>
                                    <InputSwitch checked={demanda} onChange={e => { cambiarDemanda() }} />
                                </label>
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id07').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*bloque para usuarios socios*/}
                    <div id="id06" className="w3-modal">
                        <div style={{ maxWidth: '600px' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id06').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                <h3>Solicitud de: <b>{solicita}</b></h3>
                                {user ? <div>
                                    {haycita ? <div className='w3-padding w3-pale-green w3-text-indigo w3-round-large'><b>{user.nombre}</b> ya tienes asignado este turno.</div>
                                        : <div>Solicitud a nombre de <b style={{ fontSize: '20px' }}>{user.nombre}</b>.</div>}
                                </div>
                                    : null}
                                {preprofesor ? <div>Profesor: <b style={{ fontSize: '20px' }}>{preprofesor}</b> </div> : null}
                                {precanchero ? <div>Canchero: <b style={{ fontSize: '20px' }}>{precanchero}</b> </div> : null}
                                {dia + '\u00A0\u00A0'}{fecha + '\u00A0\u00A0'}{turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                {haycita ? null
                                    : <div>
                                        Otros participantes<br></br><br></br>
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
                                    </div>}
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    {haycita ?
                                        <div>
                                            {datosempresa.cancelar ?
                                                <button style={{ marginLeft: '25px', marginBottom: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red"
                                                    onClick={e => precancelarCita()}>
                                                    Cancelar turno
                                                </button>
                                                : null}
                                        </div>
                                        :
                                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                            onClick={e => prepedirCita()}>
                                            Solicitar
                                        </button>}
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id06').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Bloque para cancheros habilitar asistencia*/}
                    <div id="id08" className="w3-modal">
                        <div style={{ maxWidth: '600px', margin: '100px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id08').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                franja asignada a: <b style={{ fontSize: '20px' }}>{preautor}</b><br></br>
                                franja: {turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    {asistencia ?
                                        <div>
                                            <b>Este usuario ya tiene asistencia registrada.</b><br></br><br></br>
                                        </div> :
                                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                            onClick={e => { preAsistio() }}>
                                            Asistencia
                                        </button>}
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id08').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*bloque para montar el horario*/}
                    {
                        franjas.lugar ?
                            <div className="w3-text-indigo w3-center w3-panel">
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
                                                        <td onClick={e => { granDemanda(franjas._id, dato.indice, dato.franja, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>
                                                        {franjas.horario[0].lunes ? <td bgcolor={dato.lunes.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'lunes', dato.indice, dato.lunes.fecha, dato.lunes.turno, dato.lunes.idProfesor, dato.lunes.profesor, dato.lunes.idCanchero, dato.lunes.canchero, dato.lunes.autor1) }}>
                                                            {dato.lunes.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].martes ? <td bgcolor={dato.martes.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'martes', dato.indice, dato.martes.fecha, dato.martes.turno, dato.martes.idProfesor, dato.martes.profesor, dato.martes.idCanchero, dato.martes.canchero, dato.martes.autor1) }} >
                                                            {dato.martes.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].miercoles ? <td bgcolor={dato.miercoles.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'miercoles', dato.indice, dato.miercoles.fecha, dato.miercoles.turno, dato.miercoles.idProfesor, dato.miercoles.profesor, dato.miercoles.idCanchero, dato.miercoles.canchero, dato.miercoles.autor1) }}>
                                                            {dato.miercoles.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].jueves ? <td bgcolor={dato.jueves.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'jueves', dato.indice, dato.jueves.fecha, dato.jueves.turno, dato.jueves.idProfesor, dato.jueves.profesor, dato.jueves.idCanchero, dato.jueves.canchero, dato.jueves.autor1) }}>
                                                            {dato.jueves.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].viernes ? <td bgcolor={dato.viernes.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'viernes', dato.indice, dato.viernes.fecha, dato.viernes.turno, dato.viernes.idProfesor, dato.viernes.profesor, dato.viernes.idCanchero, dato.viernes.canchero, dato.viernes.autor1) }}>
                                                            {dato.viernes.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].sabado ? <td bgcolor={dato.sabado.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'sabado', dato.indice, dato.sabado.fecha, dato.sabado.turno, dato.sabado.idProfesor, dato.sabado.profesor, dato.sabado.idCanchero, dato.sabado.canchero, dato.sabado.autor1) }}>
                                                            {dato.sabado.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[0].domingo ? <td bgcolor={dato.domingo.colorProfesor}
                                                            onClick={e => { agendar(franjas._id, 'domingo', dato.indice, dato.domingo.fecha, dato.domingo.turno, dato.domingo.idProfesor, dato.domingo.profesor, dato.domingo.idCanchero, dato.domingo.canchero, dato.domingo.autor1) }}>
                                                            {dato.domingo.autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                    </tr>

                                                ))}
                                        </tbody>
                                    </table>
                                    <div className='w3-right-align'>
                                        Franjas con color son para clases
                                    </div>
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
