import {Redirect, Route} from 'react-router-dom'
import useAuth from './auth/useAuth';

export function RutaPublica(props) {
    
const {user} = useAuth();

if(user) return <Redirect to="/users/admin"/>  //pendiente por definir a que ruta dependiendo de rol enviar

    return (
        <Route {...props}/>
    )
}
