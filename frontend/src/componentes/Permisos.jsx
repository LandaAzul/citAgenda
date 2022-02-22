import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';
import { InputSwitch } from 'primereact/inputswitch';


export default function Permisos() {

    const [solnombre, setsolnombre] = useState(false)
    const [soldocumento, setsoldocumento] = useState(false)
    const [solcodigo, setsolcodigo] = useState(false)
    const [soldireccion, setsoldireccion] = useState(false)
    const [soltelefono, setsoltelefono] = useState(false)
    const [soltelefono2, setsoltelefono2] = useState(false)
    const [solemail, setsolemail] = useState(false)
    const [solidfamiliar, setsolidfamiliar] = useState(false)
    const [solimagen, setsolimagen] = useState(false)
    const [soltodo, setsoltodo] = useState(false)
    const [editnombre, setnombre] = useState(false)
    const [editdocumento, setdocumento] = useState(false)
    const [editcodigo, setcodigo] = useState(false)
    const [editdireccion, setdireccion] = useState(false)
    const [edittelefono, settelefono] = useState(false)
    const [edittelefono2, settelefono2] = useState(false)
    const [editemail, setemail] = useState(false)
    const [editidfamiliar, setidfamiliar] = useState(false)
    const [editimagen, setimagen] = useState(false)
    const [edittodo, settodo] = useState(false)


    useEffect(() => {
        if (soltodo) {
            setsolnombre(true)
            setsoldocumento(true)
            setsolcodigo(true)
            setsoltelefono(true)
            setsoltelefono2(true)
            setsoldireccion(true)
            setsolemail(true)
            setsolidfamiliar(true)
            setsolimagen(true)
        }
    }, [soltodo])


    useEffect(() => {
        if (!solnombre || !soldocumento || !soltelefono || !soltelefono2 || !soldireccion || !solcodigo || !solemail || !solidfamiliar || !solimagen) {
            setsoltodo(false)
        }
        if (solnombre && soldocumento && soltelefono && soltelefono2 && soldireccion && solcodigo && solemail && solidfamiliar && solimagen) {
            setsoltodo(true)
        }
    }, [solnombre, soldocumento, soltelefono, soltelefono2, soldireccion, solcodigo, solemail, solidfamiliar, solimagen])


    useEffect(() => {
        if (edittodo) {
            setnombre(true)
            setdocumento(true)
            setcodigo(true)
            settelefono(true)
            settelefono2(true)
            setdireccion(true)
            setemail(true)
            setidfamiliar(true)
            setimagen(true)
        }
    }, [edittodo])

    useEffect(() => {
        if (!editnombre || !editdocumento || !edittelefono || !edittelefono2 || !editdireccion || !editcodigo || !editemail || !editidfamiliar || !editimagen) {
            settodo(false)
        }
        if (editnombre && editdocumento && edittelefono && edittelefono2 && editdireccion && editcodigo && editemail && editidfamiliar && editimagen) {
            settodo(true)
        }
    }, [editnombre, editdocumento, edittelefono, edittelefono2, editdireccion, editcodigo, editemail, editidfamiliar, editimagen])

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
                <div style={{ maxWidth: '700px', margin: 'auto' }}>
                    <div className='w3-col m6'>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={solnombre} onChange={(e) => setsolnombre(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar nombre.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={soldocumento} onChange={(e) => setsoldocumento(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar documento.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={solcodigo} onChange={(e) => setsolcodigo(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar código.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={soltelefono} onChange={(e) => setsoltelefono(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={soltelefono2} onChange={(e) => setsoltelefono2(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono (2).</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={soldireccion} onChange={(e) => setsoldireccion(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar Dirección.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={solemail} onChange={(e) => setsolemail(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar email.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={solidfamiliar} onChange={(e) => setsolidfamiliar(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar id familiar.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={solimagen} onChange={(e) => setsolimagen(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar Imagen.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={soltodo} onChange={(e) => setsoltodo(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar todo.</b>
                        </label><br></br><br></br>
                    </div>
                    <div className='w3-col m6'>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editnombre} onChange={(e) => setnombre(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar nombre.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editdocumento} onChange={(e) => setdocumento(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar documento.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editcodigo} onChange={(e) => setcodigo(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar código.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={edittelefono} onChange={(e) => settelefono(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar celular/teléfono.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={edittelefono2} onChange={(e) => settelefono2(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar celular/teléfono (2).</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editdireccion} onChange={(e) => setdireccion(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar dirección.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editemail} onChange={(e) => setemail(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar email.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editidfamiliar} onChange={(e) => setidfamiliar(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar id familiar.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={editimagen} onChange={(e) => setimagen(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Editar imagen.</b>
                        </label><br></br><br></br>
                        <label className="w3-text-indigo">
                            <InputSwitch checked={edittodo} onChange={(e) => settodo(e.value)} />
                            <b style={{ marginLeft: '20px' }}>Solicitar todo.</b>
                        </label><br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
