import React, { useState, useEffect } from 'react'
import axios from 'axios'
import rutas from '../helpers/rutas';
import { Link } from 'react-router-dom';
import { CrearTablaHorario } from './CrearTablaHorario';
import useAuth from '../auth/useAuth';
import swal from 'sweetalert';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

export function TodoHorarios() {

    const { user, upDateDates } = useAuth();
    const [franjas, setfranjas] = useState([])
    const [franja, setfranja] = useState([])
    const [mostrar, setmostrar] = useState(false)
    const [envio, setenvio] = useState(false);

    const limpiarDatos = () => {
        setfranja([])
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

    const traerHorario = async () => {
        try {
            const respu = await axios.get(rutas.server + 'api/horario')
            setfranjas(respu.data)
        } catch (e) {
            //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }


    const pedirTurno = async (id) => {
        if (user === null) { swal('Inicia sesión', 'Para agendar o gestionar horario debes iniciar sesión', 'info'); return }
        try {
            const respu = await axios.get(rutas.server + 'api/horario/' + id)
            setfranja(respu.data.horario)
            document.getElementById('horario').style.display = 'block';
        }
        catch (e) {
            swal('Upss', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo', 'info')
        }
    }


    const preeliminarHorario = (id) => {
        swal({
            title: 'Eliminar horario',
            text: 'Estas a punto de eliminar este horario, clic en "Continuar" si realmente quieres borrarlo',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                eliminarHorario(id);
            }
        })
    }

    const eliminarHorario = async (id) => {
        setenvio(true)
        try {
            await axios.delete(rutas.server + 'api/horario/' + id,
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            setmostrar(false)
            upDateDates();
            swal('¡Listo!', 'Hemos eliminado el horario seleccionado', 'success');
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    function MostrarHorarios() {
        if (franjas) {
            const horarios = franjas;
            const hors = horarios.map((url, index) =>
                <div key={horarios[index]._id} className='w3-panel w3-white w3-border w3-round-large'>
                    <div className='w3-right-align'>
                        <button style={{ marginLeft: '25px', marginTop: '20px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red w3-small"
                            onClick={e => { preeliminarHorario(horarios[index]._id) }}>
                            Eliminar este horario
                        </button>
                    </div>
                    <div onClick={e => { pedirTurno(horarios[index]._id) }} >
                        <div style={{ pointerEvents: 'none' }}>
                            <CrearTablaHorario horario={url} />
                        </div>
                    </div>

                </div>
            );
            return (
                <div>
                    {hors}
                </div>
            );
        }
        else { return null }
    }


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
            <div id="horario" className="w3-modal">
                <div style={{ width: '100%', margin: '-50px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                    <header className="w3-container w3-indigo w3-center">
                        <span style={{ textDecoration: 'underline' }} className="w3-button w3-display-topright"
                            onClick={e => { document.getElementById('horario').style.display = 'none'; limpiarDatos() }}        >
                            cerrar
                        </span>
                        {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                        Clic en la franja que desees agendar.
                    </header>
                    <div style={{ backgroundColor: '#fdfeaa' }} className='w3-container'>
                        <CrearTablaHorario horario={franja} />
                    </div>
                    <div className='w3-center'>
                        <button style={{ marginRight: '25px', marginBottom: '20px', marginTop: '20px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={e => { document.getElementById('horario').style.display = 'none'; limpiarDatos() }}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            <div className='componentes'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                        <h2><b>Lista del histórico de horarios</b></h2>
                    </div>
                    {mostrar ?
                        <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center w3-border w3-round-large'>
                            <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={e => { setfranjas({}); setmostrar(false) }}>
                                Cerrar
                            </button>
                        </div> :
                        <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                            <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={e => { traerHorario(); setmostrar(true) }}>
                                Mostrar horarios
                            </button>
                        </div>
                    }
                    {mostrar ?
                        <div>
                            {franjas.length > 0 ?
                                <MostrarHorarios />
                                : <div className='w3-container w3-padding w3-center w3-text-gray'>
                                    <h1>Sin horario(s) definido(s).</h1>
                                </div>}
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}
