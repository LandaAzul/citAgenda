import React, { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import { ConfigEmpresa } from '../componentes/ConfigEmpresa';
import { InicioSesion } from '../componentes/InicioSesion';
import { RegistroUsers } from '../componentes/RegistroUsers';
import { Busqueda } from '../componentes/Busqueda';
import { Ayuda } from '../componentes/Ayuda';
import { ConfHorario } from '../componentes/ConfHorario';
import { RegistroUsersAdmin } from '../componentes/RegistroUsersAdmin';
import { NotFoundPage } from '../componentes/NotFoundPage';
import roles from '../helpers/roles';
import { MenuAdmin } from '../componentes/MenuAdmin';
import { MenuProf } from '../componentes/MenuProf';
import { MenuCanc } from '../componentes/MenuCanc';
import { MenuSocio } from '../componentes/MenuSocio';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';
import Redireccionar from './Redireccionar';


export function Rutas() {

    const { roll } = useAuth();

    return (
        <Fragment>

            <Routes>
                <Route path={rutas.home} element={!roll ? (<InicioSesion />) : (<Redireccionar />)} />
                <Route path={rutas.admin} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<MenuAdmin />) : (<Redireccionar />)} />
                <Route path={rutas.profesor} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.profesor ? (<MenuProf />) : (<Redireccionar />)} />
                <Route path={rutas.canchero} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.canchero ? (<MenuCanc />) : (<Redireccionar />)} />
                <Route path={rutas.socio} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.socio ? (<MenuSocio />) : (<Redireccionar />)} />
                <Route path={rutas.registro} element= {!roll ? (<RegistroUsers/>) : (<Redireccionar />)} />

                <Route path={rutas.adminPagina} element= {!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<ConfigEmpresa/>) : (<Redireccionar />)} />
                <Route path={rutas.adminPoliticas} element= {!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<ConfHorario/>) : (<Redireccionar />)} />
                <Route path={rutas.adminRegistro} element= {!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<RegistroUsersAdmin/>) : (<Redireccionar />)} />
                <Route path={rutas.adminUsers} element= {!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Busqueda/>) : (<Redireccionar />)}/>
                <Route path={rutas.adminAyuda} element= {!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Ayuda/>) : (<Redireccionar />)}/>
                
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

        </Fragment>
    )
}