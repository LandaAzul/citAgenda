import {Redirect, Route} from 'react-router-dom'
import useAuth from '../auth/useAuth';

export function RutaPublica({hasRole:role , ...rest}) {
//export function RutaPublica(props) {
    
const {hasRole, isLogged, user} = useAuth();

//if(role && !hasRole(role)) return <Redirect to="/sinpermiso"/>

if(isLogged()) {
   if(user.role==='Administrador') {return <Redirect to="/users/admin"/>}
   if(user.role==='Profesor') {return <Redirect to="/users/profesor"/>}
   if(user.role==='Canchero') {return <Redirect to="/users/ballboy"/>}
   if(user.role==='Socio') {return <Redirect to="/users/socio"/>}
}

    return (
        <Route {...rest}/>
    )
}
