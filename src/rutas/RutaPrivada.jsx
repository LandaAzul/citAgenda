import {Redirect, Route} from 'react-router-dom'
import useAuth from '../auth/useAuth';

export function RutaPrivada({hasRole:role , ...rest}) {
    
const {hasRole, isLogged, user} = useAuth();

//if(role && !hasRole(role)) return <Redirect to="/sinpermiso"/>


if(!isLogged()) return <Redirect to="/"/>

    return (
        <Route {...rest}/>
    )
}
