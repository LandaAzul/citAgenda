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
    //const [fechaControl, setfechacontrol] = useState((new Date()).getDate() + '/' + ((new Date()).getMonth() + 1) + '/' + (new Date()).getFullYear())
    const [fechaControl, setfechacontrol] = useState(new Date().setDate(new Date().getDate() + 1))

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


    useEffect(() => {
        const tiempo = setTimeout(() => {
            setfechacontrol(new Date().setDate(new Date().getDate() + 1))
        }, 21600000);
        return () => { clearTimeout(tiempo); }
    });

    const agendar = (id, indiceDia, dia, indice, fecha, turno, idProfe, profe, idCanche, canche, aut1) => {
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
            validarAsistencia(id, indice, indiceDia)
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
            if (e.request.status === 400) {
                swal('Ya usaste un turno de alta demanda', 'Lo sentimos, pero por políticas no puedes pedir turno de alta demanda seguido, por favor espera a que algún turno se libere o solicita tu turno para la siguiente fecha disponible.', 'warning')
                return
            }
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
            icon: 'info', //success , warning, info, error
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


    const granDemanda = (id, indice, dem) => {
        if (roll === roles.admin) {
            document.getElementById('id07').style.display = 'block';
            setidhorario(id);
            setindice(indice);
            setdemanda(dem)
        }
    }

    const cambiarDemanda = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/granDemanda/' + idhorario, {
                indice: indice,
                granDemanda: !demanda
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            document.getElementById('id07').style.display = 'none';
            if (!demanda) { swal('Listo', 'Se ha cambiado esta franja como franja de "Gran demanda"', 'info') }
            else { swal('Listo', 'Se ha cambiado esta franja como franja "Sin demanda"', 'info') }
            limpiarDatos();
            upDateDates();
        }
        catch (e) {
            console.log(e.request)
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
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
            setasistencia(respu.data.horario.horario[indi].dia[diaa].asistio)
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
                        franjas.mostrarTodo === true ?
                            <div className="w3-text-indigo w3-center w3-panel">
                                <div>
                                    <h1>{franjas.lugar}</h1>
                                </div>
                                <div className="w3-container w3-responsive w3-margin-bottom">
                                    <table className="w3-table-all w3-centered w3-hoverable">
                                        <thead>
                                            <tr className="w3-indigo">
                                                <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                {franjas.horario[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</th> : null}
                                                {franjas.horario[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</th> : null}
                                                {franjas.horario[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</th> : null}
                                                {franjas.horario[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</th> : null}
                                                {franjas.horario[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</th> : null}
                                                {franjas.horario[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</th> : null}
                                                {franjas.horario[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                franjas.horario.map((dato, index) => (
                                                    <tr key={dato.indice} title="Clíck para agendar turno">
                                                        {dato.granDemanda ?
                                                            <td bgcolor={'#FF7C78'} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-white w3-round-large w3-text-indigo'><b>alta demanda<br></br>{dato.franja}</b></div></td>
                                                            : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>}
                                                        {franjas.horario[index].dia[0] ? <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                            {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[1] ? <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }} >
                                                            {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[2] ? <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                            {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[3] ? <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                            {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[4] ? <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                            {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[5] ? <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                            {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                        {franjas.horario[index].dia[6] ? <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                            onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                            {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                : null}</td> : null}
                                                    </tr>

                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                    {//bloque para mostrar el horario limitado a solo dos días fuera del admin
                        franjas.mostrarTodo === false ? <div>
                            {roll === roles.admin ?//bloque para admin para ver toda la franja
                                <div className="w3-text-indigo w3-center w3-panel">
                                    <div>
                                        <h1>{franjas.lugar}</h1>
                                    </div>
                                    <div className="w3-container w3-responsive w3-margin-bottom">
                                        <table className="w3-table-all w3-centered w3-hoverable">
                                            <thead>
                                                <tr className="w3-indigo">
                                                    <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                    {franjas.horario[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</th> : null}
                                                    {franjas.horario[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</th> : null}
                                                    {franjas.horario[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</th> : null}
                                                    {franjas.horario[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</th> : null}
                                                    {franjas.horario[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</th> : null}
                                                    {franjas.horario[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</th> : null}
                                                    {franjas.horario[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</th> : null}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    franjas.horario.map((dato, index) => (
                                                        <tr key={dato.indice} title="Clíck para agendar turno">
                                                            {dato.granDemanda ?
                                                                <td bgcolor={'#FF7C78'} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-white w3-round-large w3-text-indigo'><b>alta demanda<br></br>{dato.franja}</b></div></td>
                                                                : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>}
                                                            {franjas.horario[index].dia[0] ? <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[1] ? <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }} >
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[2] ? <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[3] ? <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[4] ? <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[5] ? <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                            {franjas.horario[index].dia[6] ? <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        </tr>

                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                : //Bloque para limitar el horario
                                <div className="w3-text-indigo w3-center w3-panel">
                                    <div>
                                        <h1>{franjas.lugar}</h1>
                                    </div>
                                    <div className="w3-container w3-responsive w3-margin-bottom">
                                        <table className="w3-table-all w3-centered w3-hoverable">
                                            <thead>
                                                <tr className="w3-indigo">
                                                    <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                    {franjas.horario[0].dia[0] && fechaControl > (new Date(franjas.horario[0].dia[0].fecha).getTime()) ? <th><b>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[1] && fechaControl > (new Date(franjas.horario[0].dia[1].fecha).getTime()) ? <th><b>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[2] && fechaControl > (new Date(franjas.horario[0].dia[2].fecha).getTime()) ? <th><b>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[3] && fechaControl > (new Date(franjas.horario[0].dia[3].fecha).getTime()) ? <th><b>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[4] && fechaControl > (new Date(franjas.horario[0].dia[4].fecha).getTime()) ? <th><b>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[5] && fechaControl > (new Date(franjas.horario[0].dia[5].fecha).getTime()) ? <th><b>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</b></th> : null}
                                                    {franjas.horario[0].dia[6] && fechaControl > (new Date(franjas.horario[0].dia[6].fecha).getTime()) ? <th><b>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</b></th> : null}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    franjas.horario.map((dato, index) => (

                                                        <tr key={dato.indice} title="Clíck para agendar turno">
                                                            {dato.granDemanda ?
                                                                <td bgcolor={'#FF7C78'} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-white w3-round-large w3-text-indigo'><b>alta demanda<br></br>{dato.franja}</b></div></td>
                                                                : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div>
                                                                </td>}
                                                            {franjas.horario[index].dia[0] && fechaControl > (new Date(dato.dia[0].fecha).getTime()) ? <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[1] && fechaControl > (new Date(dato.dia[1].fecha).getTime()) ? <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }}>
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[2] && fechaControl > (new Date(dato.dia[2].fecha).getTime()) ? <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[3] && fechaControl > (new Date(dato.dia[3].fecha).getTime()) ? <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[4] && fechaControl > (new Date(dato.dia[4].fecha).getTime()) ? <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[5] && fechaControl > (new Date(dato.dia[5].fecha).getTime()) ? <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                            {franjas.horario[index].dia[6] && fechaControl > (new Date(dato.dia[6].fecha).getTime()) ? <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td>
                                                                : null}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
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
