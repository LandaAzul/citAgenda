import React, { useState } from 'react';
import useAuth from '../auth/useAuth';
import { Helmet } from "react-helmet";

const TextoEstilo = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Helvética arial',
    fontSize: '24px',
    textShadow: '2px 2px 2px black',
    cursor: 'pointer'
}

export function TextoInformativo() {

    const { datosempresa } = useAuth();
    const [mostrar, setMostrar] = useState(false)
    const [mostrarclima, setmostrarclima] = useState(false)


    return (
        <>
            <div style={TextoEstilo} className="w3-container w3-center w3-metro-dark-orange">
                <div onClick={e => setMostrar(!mostrar)} style={TextoEstilo} className="w3-padding w3-metro-dark-orange w3-center">
                    {mostrar ? 'Ocultar' : '¡Más información aquí!'}
                </div>
                {mostrar ?
                    <div className="w3-metro-dark-orange">
                        <div className="w3-panel w3-center w3-metro-dark-orange" onClick={e => setMostrar(!mostrar)}>
                            {datosempresa.descripcion}
                        </div>
                    </div>
                    : null}
            </div>
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
        </>
    )
}