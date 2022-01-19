import { Redirect, Route } from 'react-router-dom'
import useAuth from '../auth/useAuth';
import rutas from '../helpers/rutas';
import roles from '../helpers/roles';

export function RutaPublica({ hasRole: role, ...rest }) {
    //export function RutaPublica(props) {

    const { hasRole, isLogged, user } = useAuth();

    //if(role && !hasRole(role)) return <Redirect to="/sinpermiso"/>

    if (isLogged()) {
        if (user.role === roles.admin) { return <Redirect to={rutas.admin} /> }
        if (user.role === roles.profesor) { return <Redirect to={rutas.profesor} /> }
        if (user.role === roles.canchero) { return <Redirect to={rutas.canchero} /> }
        if (user.role === roles.socio) { return <Redirect to={rutas.socio} /> }
    }

    return (
        <Route {...rest} />
    )
}
