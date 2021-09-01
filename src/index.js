import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import BloqueCentral from './componentes/BloqueCentral';

ReactDOM.render(
  <React.StrictMode>
    <div class="w3-container w3-teal w3-padding-16">
      <Encabezado/>
    </div>
    <div class="w3-col m2 w3-green w3-center w3-panel w3-card">
      <BarraLateral/>
    </div>
    <div class="w3-col m10 w3-panel">
      <BloqueCentral/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
