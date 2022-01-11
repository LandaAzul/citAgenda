import {Redirect, Route,useLocation} from 'react-router-dom'
import useAuth from '../auth/useAuth';
import rutas from '../helpers/rutas';

export function RutaPrivada({hasRole:role , ...rest}) {
    
const location = useLocation();
const {hasRole, isLogged, user} = useAuth();

if(role && !hasRole(role)) return <Redirect to={rutas.home}/>


//if(!isLogged()) return <Redirect to={{pathname: home, state: {from: location}}}/>
if(!isLogged()) return <Redirect to={rutas.home}/>

    return (
        <Route {...rest}/>
    )
}
