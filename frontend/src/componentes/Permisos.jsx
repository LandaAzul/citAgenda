import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';
import { InputSwitch } from 'primereact/inputswitch';



export default function Permisos() {

    const [editnombre, seteditnombre] = useState(false)

    return (<>
        <div className='componentes'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >&times;</b>
                    </Link>
                </div>
                <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                    <h2>
                        <b>Habilite los permisos para sus usuarios.</b>
                    </h2>
                </div>
                <div style={{ maxWidth: '400px', margin: 'auto' }} className="w3-container w3-padding w3-white w3-round-large">
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar nombre.</b>
                    </label><br></br><br></br>
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar documento.</b>
                    </label><br></br><br></br>
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar código.</b>
                    </label><br></br><br></br>
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar celular/teléfono.</b>
                    </label><br></br><br></br>
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar email.</b>
                    </label><br></br><br></br>
                    <label className="w3-text-indigo">
                        <InputSwitch checked={editnombre} onChange={(e) => seteditnombre(e.value)} />
                        <b style={{ marginLeft: '20px' }}>Editar id familiar.</b>
                    </label><br></br><br></br>
                </div>
            </div>
        </div>
    </>
    )
}
