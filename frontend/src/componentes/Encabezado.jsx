import React, { useState, useEffect } from 'react';
import imagen1 from '../imagenes/imagenEnc.jpg';
import imagen2 from '../imagenes/imagenEnc2.jpg';
import imagen3 from '../imagenes/imagenEnc3.jpg';
import '../index.css'
import useAuth from '../auth/useAuth'
import { Helmet } from "react-helmet";


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

const circulo = {
  width: "20px",
  height: "20px",
  MozBorderRadius: "50%",
  WebkitBorderRadius: "50%",
  borderRadius: "50%",
  marginRight: "8px",
  //background:"white",
  opacity:"0.3",
  border: '2px solid white',
  cursor:'pointer',
}

const circuloselet = {
  width: "20px",
  height: "20px",
  MozBorderRadius: "50%",
  WebkitBorderRadius: "50%",
  borderRadius: "50%",
  marginRight: "8px",
  //background:"white",
  //opacity:"0.5",
  border: '2px solid white',
  cursor:'pointer',
}

 const flechas ={
  fontSize:'30px', 
  cursor:'pointer', 
  color:'white',
  marginRight: '25px',
  marginLeft: '25px'
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

  const { user, datosempresa } = useAuth();
  const [control, setControl] = useState(1)
  const [mostrarclima, setmostrarclima] = useState(false)

  const avanzar = () => {
    setControl(control + 1)
    if (control > 2) {
      setControl(1)
    }
  }

  const devolver = () => {
    setControl(control - 1)
    if (control < 2) {
      setControl(3)
    }
  }

  useEffect(() => {
    const tiempo = setTimeout(() => {
      avanzar();
    }, 10000);
    return () => { clearTimeout(tiempo); }
  });


  return (
    <>
      {user ? <div className="w3-container w3-metro-dark-purple">
        <div className='w3-right' title='Recuerda que para cambiar a estado "Activo" debes contactar con el administrador.'>
          Bienvenido <b>{user.nombre}</b>, tu estado: <b>{user.activo ? 'Activo' : 'Inactivo'}</b>
        </div>
      </div>
        : null}
      {!navigator.onLine ? //con este llamado hacemos saber al user que no hay conexión a internet
        <div className="w3-container w3-white w3-center">
          <h1 style={{ color: 'red', }} >
            <b>Sin conexión a internet!!!</b>
          </h1>
        </div> : null}
      {(datosempresa.title === null) ? <div className="w3-container w3-white w3-center">
        <h1 style={{ color: 'red', }} >
          <b>Sin conexión con el servidor!!!</b>
        </h1>
      </div> :
        <div style={TituloEstiloP} className="w3-container w3-hide-large w3-hide-medium w3-metro-dark-orange w3-center">
          <h1>
            <b>{datosempresa.title}</b>
          </h1>
        </div>}
        <div className="w3-metro-dark-purple">
                <div onClick={e => setmostrarclima(!mostrarclima)} style={TextoEstilo} className="w3-padding w3-metro-dark-purple w3-center">
                    {mostrarclima ? 'Ocultar' : '¡Mostrar clima!'}
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
      <div className="contenedor">
        {(control === 1) ?
          <img src={imagen1} alt="raqueta en cancha de tenis"
            title="Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
            className="cortar"/>
          : null}
        {(control === 2) ?
          <img src={imagen2} alt="entrada al club" className="cortar" />
          : null}
        {(control === 3) ?
          <img src={imagen3} alt="canchas" className="cortar" />
          : null}
        {(datosempresa.title === 'Null') ? null :
          <div className="w3-display-middle w3-large w3-center">
            <div className="w3-container w3-hide-small">
              <h1 style={TituloEstilo}>
                {datosempresa.title}
              </h1>
            </div>
          </div>
        }
        <div className="w3-display-left w3-container">
          <label style={flechas} onClick={devolver} >&#10094;</label>
                  </div>
        <div className="w3-display-right w3-container">
        <label style={flechas} onClick={avanzar} >&#10095;</label>
        </div>
        <div className="w3-display-bottommiddle w3-margin-bottom">
          {control === 1 ? <button style={circuloselet} onClick={() => setControl(1)}></button> : <button style={circulo} onClick={() => setControl(1)}></button>}
          {control === 2 ? <button style={circuloselet} onClick={() => setControl(2)}></button> : <button style={circulo} onClick={() => setControl(2)}></button>}
          {control === 3 ? <button style={circuloselet} onClick={() => setControl(3)}></button> : <button style={circulo} onClick={() => setControl(3)}></button>}
        </div>
      </div>
    </>
  );
}
