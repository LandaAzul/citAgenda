import React from 'react'
import  {Button} from '@material-ui/core';
import {Link} from 'react-router-dom'

export default function CerrarSesion() {
    return (
        <div className="w3-container w3-indigo w3-padding-16 w3-right-align">
            <Button variant="contained">
                <Link to="/">
                    Cerrar Sesion
                </Link>
            </Button>
        </div>        
    )
}
