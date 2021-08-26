import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Encabezado} from './componentes/Encabezado';
import BarraLateral from './componentes/BarraLateral';
import BloqueCentral from './componentes/BloqueCentral';

ReactDOM.render(
  <React.StrictMode>
    <Encabezado/>
    <BarraLateral/>
    <BloqueCentral/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
