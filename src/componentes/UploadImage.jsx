import React, { useState } from 'react'
//import {useStorage } from "reactfire";

export function UploadImage() {
    const [ref, setRef] = useState(null);

   // const storage = useStorage();
    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    /*const uploadImage = async () => {
        try {
            const newRef = storage.ref('images').child(Imagen.name); // nombre del archivo
            setRef(newRef);
            await newRef.put(Imagen);
            let urlImagen = await newRef.getDownloadURL()
            console.log('la ul de la imagen es' + urlImagen);
        } catch (error) {
            alert(error);
        }
    };*/
    return (
        <div >
            <input type="file" name="imagen" onChange={changeImagen} />
            <button /*onClick={uploadImage}*/ >GUARDAR</button>
        </div>
    )
}