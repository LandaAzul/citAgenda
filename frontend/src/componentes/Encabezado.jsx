import React, { useState, useEffect } from 'react';
import axios from 'axios';
import rutas from '../helpers/rutas';
import imagen1 from '../imagenes/imagenEnc.jpg';
import imagen2 from '../imagenes/imagenEnc2.jpg';
import imagen3 from '../imagenes/imagenEnc3.jpg';
import '../index.css'
import useAuth from '../auth/useAuth'
import { Helmet } from "react-helmet";
import swal from 'sweetalert';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';


//creamos una const para dar estilo a nuestro título;
const TituloEstilo = {
  color: '#4BC61C',
  lineHeight: '55px',
  fontSize: '65px',
  textShadow: '7px 7px 5px black',
  //width:'90%'
}
const TituloEstiloP = {
  color: '#4BC61C',
  lineHeight: '35px',
  fontSize: '30px',
  textShadow: '3px 3px 3px black',
}

const TextoEstilo = {
  color: 'white',
  textAlign: 'justify',
  fontFamily: 'Helvética arial',
  fontSize: '24px',
  textShadow: '2px 2px 2px black',
  cursor: 'pointer'
}

export function Encabezado() {

  const { datosempresa, updatedates } = useAuth();
  const [control, setControl] = useState(0);
  const [controlmax, setControlmax] = useState(0);
  const [control2, setControl2] = useState(0);
  const [conteo, setConteo] = useState(updatedates);
  const [mostrarclima, setmostrarclima] = useState(false);
  const [envio, setenvio] = useState(false);
  const [imagenes, setimagenes] = useState([]);
  const [mostrarencabezado, setmostrare] = useState(datosempresa.encabezado);
  const [mostrarClima, setmostrarClima] = useState(datosempresa.clima);

  useEffect(() => {
    if (envio) {
      document.getElementById('id02').style.display = 'block';
    }
    if (!envio) { document.getElementById('id02').style.display = 'none' }
  }, [envio])

  useEffect(() => {
    setmostrare(datosempresa.encabezado);
    setmostrarClima(datosempresa.clima);
  }, [datosempresa.encabezado, datosempresa.clima])

  const avanzar = () => {
    setControl(control + 1)
    if (control > 1) {
      setControl(0)
    }
  }


  const devolver = () => {
    setControl(control - 1)
    if (control < 1) {
      setControl(2)
    }
  }

  const adelante = () => {
    if (control2 < controlmax) {
      setControl2(control2 + 1);
    }
    else { setControl2(0) }
  }


  const atras = () => {
    setControl2(control2 - 1)
    if (control2 < 1) {
      setControl2(controlmax)
    }
  }

  useEffect(() => {
    const tiempo = setTimeout(() => {
      avanzar();
      adelante();
    }, 10000);
    if (conteo !== updatedates) {
      atras();
    }
    return () => { clearTimeout(tiempo); }
  });

  useEffect(() => {
    setConteo(updatedates);
  }, [updatedates])


  useEffect(() => {
    let ignore = false
    const recargarImagenes = async () => {
      setenvio(true);
      try {
        const resp = await axios.get(rutas.server + 'api/empresa/imagenes/')
        if (!ignore) {
          setimagenes(resp.data.filter(user => user.ver === true));
          setControlmax(resp.data.filter(user => user.ver === true).length - 1);
          setenvio(false);
        }
      } catch (e) {
        if (!ignore) {
          setenvio(false);
          swal('Lo sentimos', 'Ocurrio un inconveniente y no pudimos cargar tus imágenes, por favor intenta de nuevo', 'error')
          return;
        }
      }
    }
    recargarImagenes();
    return () => { ignore = true };
  }, [updatedates])


  function MostrarImagenes() {
    if (imagenes.length > 0) {
      return (<>
        {
          imagenes[control2] !== undefined ?
            <div className="contenedor">
              <img src={imagenes[control2].imagen} alt="imágenes subidas por parte del administrador" className="cortar" />
              {(datosempresa.title === null || datosempresa.title === undefined) ? null :

                <div className="w3-display-middle w3-large w3-center">
                  <div className="w3-container w3-hide-small">
                    <h1 style={TituloEstilo}>
                      {mostrarencabezado ? datosempresa.title : null}
                    </h1>
                  </div>
                </div>

              }
              {imagenes.length > 1 ?
                <div>
                  <div className="w3-display-left w3-container">
                    <div className='flechaI' onClick={atras}>&#10094;</div>
                  </div>
                  <div className="w3-display-right w3-container">
                    <div className='flechaD' onClick={adelante}>&#10095;</div>
                  </div>
                </div> : null}
            </div> : null
        }
      </>
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
      {!navigator.onLine ? //con este llamado hacemos saber al user que no hay conexión a internet
        <div className="w3-container w3-white w3-center">
          <h1 style={{ color: 'red', }} >
            <b>Sin conexión a internet!!!</b>
          </h1>
        </div> : null}
      {(datosempresa.title === null || datosempresa.title === undefined) ? <div className="w3-container w3-white w3-center">
        <h1 style={{ color: 'red', }} >
          <b>Sin conexión con el servidor!!!</b>
        </h1>
      </div> :
        <div style={TituloEstiloP} className="w3-container w3-hide-large w3-hide-medium w3-metro-dark-orange w3-center">
          <h1>
            <b>{datosempresa.title}</b>
          </h1>
        </div>}
      {mostrarClima ?
        <div className="w3-metro-dark-purple">
          <div onClick={e => setmostrarclima(!mostrarclima)} style={TextoEstilo} className="w3-padding w3-metro-dark-purple w3-center">
            {mostrarclima ? 'Ocultar' : '¡Ver pronóstico del tiempo!'}
          </div>
          {mostrarclima ?
            <div onClick={e => setmostrarclima(!mostrarclima)}>
              <div id="ww_657115df366c8" v='1.20' loc='id' a='{"t":"responsive","lang":"es","ids":["wl6129"],"cl_bkg":"#512DA8","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_tof":"3","sl_sot":"celsius","sl_ics":"one_a","font":"Arial","cl_odd":"#0000000a"}'>
                <a href="https://weatherwidget.org/es/" id="ww_657115df366c8_u" target="_blank" rel="noreferrer">
                  Widget de tiempo para el sitio web de Weatherwidget.org
                </a>
              </div>
              <Helmet>
                <script async src="https://srv2.weatherwidget.org/js/?id=ww_657115df366c8"></script>
              </Helmet>
            </div> : null}
        </div>
        : null}
      {imagenes.length > 0 ?
        <MostrarImagenes />
        : <div className="contenedor">
          {(control === 0) ?
            <img src={imagen1} alt="raqueta en cancha de tenis"
              title="Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
              className="cortar" />
            : null}
          {(control === 1) ?
            <img src={imagen2} alt="entrada al club" className="cortar" />
            : null}
          {(control === 2) ?
            <img src={imagen3} alt="canchas" className="cortar" />
            : null}
          {(datosempresa.title === null || datosempresa.title === undefined) ? null :
            <div className="w3-display-middle w3-large w3-center">
              <div className="w3-container w3-hide-small">
                <h1 style={TituloEstilo}>
                  {mostrarencabezado ? datosempresa.title : null}
                </h1>
              </div>
            </div>
          }
          <div className="w3-display-left w3-container">
            <div className='flechaI' onClick={devolver} >&#10094;</div>
          </div>
          <div className="w3-display-right w3-container">
            <div className='flechaD' onClick={avanzar} >&#10095;</div>
          </div>
          {/*<div className="w3-display-bottommiddle w3-margin-bottom">
            {control === 0 ? <button style={circuloselet} onClick={() => setControl(0)}></button> : <button style={circulo} onClick={() => setControl(0)}></button>}
            {control === 1 ? <button style={circuloselet} onClick={() => setControl(1)}></button> : <button style={circulo} onClick={() => setControl(1)}></button>}
            {control === 2 ? <button style={circuloselet} onClick={() => setControl(2)}></button> : <button style={circulo} onClick={() => setControl(2)}></button>}
          </div>*/
          }
        </div>}
    </>
  );
}
