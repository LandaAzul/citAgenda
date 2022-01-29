import React, { useState, useEffect } from 'react';
import imagen1 from '../imagenes/imagenEnc.jpg';
import imagen2 from '../imagenes/imagenEnc2.jpg';
import imagen3 from '../imagenes/imagenEnc3.jpg';
import axios from 'axios'
import '../index.css'
import useAuth from '../auth/useAuth'


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

//constante para limitar el tamaño del div
const Tamano = {
  //width:'100%',
  height: '350px',
  //overFlow:'auto',
}

const circulo = {
  //width: "20px",
  //height: "20px",
  MozBorderRadius: "50%",
  WebkitBorderRadius: "50%",
  borderRadius: "50%",
  marginRight: "10px"
  //background:"white",
  //opacity:"0.5"
}


export function Encabezado() {

  const { user } = useAuth();
  const [titulo, setTitulo] = useState('')
  const [control, setControl] = useState(1)

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
    let ignore = false;  //hacemos uso de esta variable local para evitar que se recarguen datos innecesariamente
    const traerDatos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/empresas');
        let idEm = res.data.map(user => user._id).join()
        const resp = await axios.get('http://localhost:4000/api/empresas/' + idEm);
        if (!ignore) setTitulo(resp.data.message.title);
      }
      catch { if (!ignore) setTitulo(null) }
    }

    traerDatos();
    return () => { ignore = true };
  }, []);

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
      {(titulo === null) ? <div className="w3-container w3-white w3-center">
        <h1 style={{ color: 'red', }} >
          <b>Sin conexión con el servidor!!!</b>
        </h1>
      </div> :
        <div style={TituloEstiloP} className="w3-container w3-hide-large w3-hide-medium w3-metro-dark-orange w3-center">
          <h1>
            <b>{titulo}</b>
          </h1>
        </div>}
      <div className="w3-display-container" style={Tamano}>
        {(control === 1) ?
          <img src={imagen1} alt="raqueta en cancha de tenis"
            title="Imagen tomada de: https://pixabay.com/es/users/igfotojonas-2899402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6308994"
            width="100%" height="100%" className="" />
          : null}
        {(control === 2) ?
          <img src={imagen2} alt="entrada al club"
            width="100%" height="100%" className="" />
          : null}
        {(control === 3) ?
          <img src={imagen3} alt="canchas"
            width="100%" height="100%" className="" />
          : null}
        {(titulo === 'Null') ? null :
          <div className="w3-display-middle w3-large w3-center">
            <div className="w3-container w3-hide-small">
              <h1 style={TituloEstilo}>
                {titulo}
              </h1>
            </div>
          </div>
        }
        <div className="w3-display-left w3-container">
          <button className="w3-button w3-black w3-round-xlarge w3-hover-aqua w3-small" onClick={devolver}><b>&#10094;</b></button>
        </div>
        <div className="w3-display-right w3-container">
          <button className="w3-button w3-black w3-round-xlarge w3-hover-aqua w3-small"
            onClick={avanzar}><b>&#10095;</b></button>
        </div>
        <div  className="w3-display-bottommiddle w3-margin-bottom">
          {control===1?<button style={circulo} className="w3-button w3-white" onClick={() => setControl(1)}></button>:<button style={circulo} className="w3-button w3-border w3-hover-white" onClick={() => setControl(1)}></button>}
          {control===2?<button style={circulo} className="w3-button w3-white" onClick={() => setControl(2)}></button>:<button style={circulo} className="w3-button w3-border w3-hover-white" onClick={() => setControl(2)}></button>}
          {control===3?<button style={circulo} className="w3-button w3-white" onClick={() => setControl(3)}></button>:<button style={circulo} className="w3-button w3-border w3-hover-white" onClick={() => setControl(3)}></button>}
        </div>
      </div>
    </>
  );
}
 //<Route path="/" exact render={() => <RegistroUsers titulo="Registrarme"/>}/>