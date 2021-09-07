import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import BloqueCentral from './componentes/BloqueCentral';
import { InicioSesion } from './componentes/InicioSesion';


ReactDOM.render(
  <React.StrictMode>
    <div class="w3-container w3-cyan w3-padding-16">
      <Encabezado/>
    </div>
    <div class="w3-container w3-cyan w3-padding-16 w3-right-align">
      <InicioSesion/>
    </div>
    <div class="w3-col w3-panel">
      <BloqueCentral/>
    </div>
    <div class="w3-col m2 w3-teal w3-center w3-panel w3-card">
      <BarraLateral/>
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
