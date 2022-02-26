import React, { useState, useEffect, useRef } from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

export default function Imagenes() {

    const resetBoton = useRef(null);
    const { user, datosempresa } = useAuth();
    const [envio, setenvio] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const [preimagenes, setpreimagenes] = useState([]);
    const [namefiles, setnamefiles] = useState([]);


    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    useEffect(() => {
        if (preimagenes.length === 0) { document.getElementById('id01').style.display = 'none' }
    }, [preimagenes])


    const subirImagen = (e) => {
        if (e.target.files.length > 5) {
            swal('Upss, Máx 5 imágenes', 'Por favor no se exceda de 5 imágenes por solicitud', 'info')
            return;
        }
        const file = e.target.files;
        const fileValide = []
        const extencionName = /.(jpe?g|gif|png|jfif)$/i;
        if (file) {
            for (var j = 0; j < e.target.files.length; j++) {
                let validateSize = file[j].size < 2 * 1024 * 1024;
                let validateExtention = extencionName.test(file[j].name);
                if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen "' + file[j].name + '" que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); }
                if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo "' + file[j].name + '" no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); }
                if (validateSize && validateExtention) {
                    fileValide.push(file[j]);
                    document.getElementById('id01').style.display = 'block';
                }
            }
        }
        setpreimagenes(fileValide);
    }


    function Previsualizar() {
        if (preimagenes) {
            const images = preimagenes;
            const urls = images.map((url, index) =>
                <div key={index} className="w3-col m4">
                    <img src={URL.createObjectURL(url)} alt="previsualización" style={{ maxHeight: "150px", width: "100%", margin: "15px", marginLeft: "15px" }} />
                    <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={e => limpiarSeleccion(index)}>
                        delete
                    </span>
                </div>
            );
            return (
                <div className='w3-panel w3-white'>{urls}
                    <div className='w3-col m12 w3-center'>
                        <button className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-margin"
                            onClick={enviarImagen}>
                            Subir imágenes
                        </button>
                    </div>
                </div>
            );
        }
        else { return null }
    }


    const limpiarSeleccion = (e) => {
        const updatedItems = [...preimagenes];
        updatedItems.splice(e, 1);
        setpreimagenes(updatedItems);
    }

    const enviarImagen = async () => {
        setenvio(true)
        let files = new FormData()
        for (var k = 0; k < preimagenes.length; k++) {
            files.append('imagen', preimagenes[k])
        }
        try {
            await axios.put(rutas.server + 'api/empresas/subirImagenes/' + datosempresa._id, files,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            setpreimagenes([]);
            document.getElementById('id01').style.display = 'none';
            swal('En hora buena', 'Archivos guardados satisfactoriamente', 'success')
            //recargarImagen();
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')

        }
    }


    const borrarImagen = async () => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/empresas/subirImagenes/' + datosempresa._id,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            swal('Listo', 'Hemos eliminado tu foto de perfil', 'success')
            recargarImagen();
        }
        catch (e) {
            if (e.request.response) {
                setenvio(false)
                swal(';)', 'No tienes imagen alguna para eliminar', 'info');
                return
            }
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
        }
    }

    const deleteImage = () => {
        swal({
            title: '¿Eliminar imagen?',
            text: ('Estas a punto de eliminar tu foto de perfil, si estas de acuerdo da clic en "Continuar".'),
            icon: 'warning',
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                setimagenes([]);
                setpreimagenes([]);
                setnamefiles([]);
                borrarImagen();
            }
        })
    }

    const recargarImagen = async () => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/empresas/subirImagenes/' + datosempresa._id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setimagenes(resp.data.message.imagen);
            setenvio(false);
        } catch {
            setenvio(false);
        }
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
            <div className='componentes'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <div className="w3-container w3-border w3-round-large w3-gray w3-padding">
                        <h2 className='w3-center w3-text-indigo'><b>Personalice aquí las imagenes a mostrar de su página.</b></h2>
                    </div>
                    <div className="w3-col w3-center ">
                        <div style={{ margin: '10px auto', maxWidth: '300px' }}>
                            <div className="w3-center w3-margin-top w3-indigo w3-border w3-round-large w3-hover-cyan">
                                <label style={{ cursor: "pointer" }} >
                                    {namefiles.length > 0 ? <b>Elegir más imágenes</b>
                                        : <b>Agregar imágenes</b>}
                                    <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif" multiple={true}
                                        ref={resetBoton} onChange={subirImagen} />
                                    <span className="material-icons-round">
                                        image
                                    </span>
                                </label>
                            </div>
                            {preimagenes.length > 0 ?
                                <div>
                                    {preimagenes.length === 1 ? <div style={{ cursor: "pointer" }} className='w3-container w3-border w3-round-large w3-hover-cyan w3-blue w3-text-white'
                                        onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                        {preimagenes.length} imagen seleccionada.
                                        <div className='w3-right-align'>
                                            <span className="material-icons-round">
                                                visibility
                                            </span>
                                        </div>
                                    </div>
                                        : null}
                                    {preimagenes.length > 1 ? <div style={{ cursor: "pointer" }} className='w3-container w3-border w3-round-large w3-hover-cyan w3-blue w3-text-white'
                                        onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                        {preimagenes.length} imágenes seleccionadas.
                                        <div className='w3-right-align'>
                                            <span className="material-icons-round">
                                                visibility
                                            </span>
                                        </div>
                                    </div>
                                        : null}
                                    <button className="w3-button w3-indigo w3-round-large w3-hover-cyan"
                                        onClick={enviarImagen}>
                                        Subir imágenes
                                    </button>
                                </div>
                                : null}
                        </div>
                        <div id="id01" className="w3-modal">
                            <div style={{ maxWidth: "1250px" }} className="w3-modal-content w3-animate-opacity w3-card-4">
                                <header className="w3-container w3-indigo w3-center">
                                    <span onClick={e => document.getElementById('id01').style.display = 'none'}
                                        className="w3-button w3-display-topright">&times;</span>
                                    <h3>Imágenes seleccionadas</h3>
                                </header>
                                <Previsualizar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
