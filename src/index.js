import React from 'react';
import ReactDOM from 'react-dom';
import {Rutas} from './Rutas'
import './index.css'
import AuthProvider from './auth/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Rutas/>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
