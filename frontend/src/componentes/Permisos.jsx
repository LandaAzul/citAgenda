import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';
import { InputSwitch } from 'primereact/inputswitch';


export default function Permisos() {

    const { datosempresa, upDateDates, updatedates } = useAuth();
    const [solnombre, setsolnombre] = useState(datosempresa.solnombre);
    const [soldocumento, setsoldocumento] = useState(datosempresa.soldocumento);
    const [solcodigo, setsolcodigo] = useState(datosempresa.solcodigo);
    const [soldireccion, setsoldireccion] = useState(datosempresa.soldireccion);
    const [soltelefono, setsoltelefono] = useState(datosempresa.soltelefono);
    const [soltelefono2, setsoltelefono2] = useState(datosempresa.soltelefono2);
    const [solemail, setsolemail] = useState(datosempresa.solemail);
    const [solidfamiliar, setsolidfamiliar] = useState(datosempresa.solidfamiliar);
    const [solimagen, setsolimagen] = useState(datosempresa.solimagen);
    const [soltodo, setsoltodo] = useState(false);
    const [editnombre, setnombre] = useState(datosempresa.editnombre);
    const [editdocumento, setdocumento] = useState(datosempresa.editdocumento);
    const [editcodigo, setcodigo] = useState(datosempresa.editcodigo);
    const [editdireccion, setdireccion] = useState(datosempresa.editdireccion);
    const [edittelefono, settelefono] = useState(datosempresa.edittelefono);
    const [edittelefono2, settelefono2] = useState(datosempresa.edittelefono2);
    const [editemail, setemail] = useState(datosempresa.editemail);
    const [editidfamiliar, setidfamiliar] = useState(datosempresa.editidfamiliar);
    const [editimagen, setimagen] = useState(datosempresa.editimagen);
    const [edittodo, settodo] = useState(false);
    const [mostrar, setmostrar] = useState(true);
    const [mostraredit, setmostraredit] = useState(false);

    useEffect(() => {
        setsolnombre(datosempresa.solnombre);
        setsoldocumento(datosempresa.soldocumento);
        setsolcodigo(datosempresa.solcodigo);
        setsoldireccion(datosempresa.soldireccion);
        setsoltelefono(datosempresa.soltelefono);
        setsoltelefono2(datosempresa.soltelefono2);
        setsolemail(datosempresa.solemail);
        setsolidfamiliar(datosempresa.solidfamiliar);
        setsolimagen(datosempresa.solimagen);
        setnombre(datosempresa.editnombre);
        setdocumento(datosempresa.editdocumento);
        setcodigo(datosempresa.editcodigo);
        setdireccion(datosempresa.editdireccion);
        settelefono(datosempresa.edittelefono);
        settelefono2(datosempresa.edittelefono2);
        setemail(datosempresa.editemail);
        setidfamiliar(datosempresa.editidfamiliar);
        setimagen(datosempresa.editimagen);
    }, [mostrar,
        datosempresa.solnombre,
        datosempresa.soldocumento,
        datosempresa.solcodigo,
        datosempresa.soldireccion,
        datosempresa.soltelefono,
        datosempresa.soltelefono2,
        datosempresa.solemail,
        datosempresa.solidfamiliar,
        datosempresa.solimagen,
        datosempresa.editnombre,
        datosempresa.editdocumento,
        datosempresa.editcodigo,
        datosempresa.editdireccion,
        datosempresa.edittelefono,
        datosempresa.edittelefono2,
        datosempresa.editemail,
        datosempresa.editidfamiliar,
        datosempresa.editimagen,
    ])


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
                        <b>Gestione los formularios para sus usuarios.</b>
                    </h2>
                </div>
                {mostrar ?
                    <div style={{ maxWidth: '700px', margin: 'auto' }}>
                        <div>
                            <div className='w3-col m6'>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={solnombre} onChange={(e) => setsolnombre(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar nombre.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={soldocumento} onChange={(e) => setsoldocumento(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar documento.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={solcodigo} onChange={(e) => setsolcodigo(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar código.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={soltelefono} onChange={(e) => setsoltelefono(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={soltelefono2} onChange={(e) => setsoltelefono2(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar celular/teléfono (2).</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={soldireccion} onChange={(e) => setsoldireccion(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar Dirección.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={solemail} onChange={(e) => setsolemail(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar email.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={solidfamiliar} onChange={(e) => setsolidfamiliar(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar id familiar.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={solimagen} onChange={(e) => setsolimagen(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Solicitar Imagen.</b>
                                </label><br></br><br></br>
                            </div>
                            <div className='w3-col m6'>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editnombre} onChange={(e) => setnombre(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar nombre.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editdocumento} onChange={(e) => setdocumento(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar documento.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editcodigo} onChange={(e) => setcodigo(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar código.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={edittelefono} onChange={(e) => settelefono(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar celular/teléfono.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={edittelefono2} onChange={(e) => settelefono2(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar celular/teléfono (2).</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editdireccion} onChange={(e) => setdireccion(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar dirección.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editemail} onChange={(e) => setemail(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar email.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editidfamiliar} onChange={(e) => setidfamiliar(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar id familiar.</b>
                                </label><br></br><br></br>
                                <label className="w3-text-indigo">
                                    <InputSwitch disabled checked={editimagen} onChange={(e) => setimagen(e.value)} />
                                    <b style={{ marginLeft: '20px' }}>Editar imagen.</b>
                                </label><br></br><br></br>
                            </div>
                        </div>
                        <div className="w3-col w3-panel w3-center">
                            <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={e => { setmostrar(false); setmostraredit(true) }}>
                                Editar
                            </button>
                        </div>
                    </div>
                    : null}
                {mostraredit ?
                    <div style={{ maxWidth: '700px', margin: 'auto' }}>
                        <div>
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
                                    <b style={{ marginLeft: '20px' }}>Editar todo.</b>
                                </label><br></br><br></br>
                            </div>
                        </div>
                        <div className="w3-col w3-panel w3-center">
                            <button style={{ marginRight: '15px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                Actualizar
                            </button>
                            <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={e => { setmostrar(true); setmostraredit(false) }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    </>
    )
}
