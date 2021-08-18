import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';



export function TituloYDescripcion ({titulo, LongitudTexto}) {

    const {register, errors, handleSubmit} = useForm();

    const [entradas, setentradas] = useState([]);

    const procesarFormulario = (data, e) => {
        console.log(data);
        //Aqui guardamos todo los estados anteriores.
        setentradas([
            ...entradas,
            data
        ]);
        // limpiar campos
        e.target.reset();
    }
    //funcion para limpiar el array
    const handleClearAll = () => {
        setentradas([entradas]);

    };

    return (
        <Fragment>
            <h3>{titulo}</h3>
            <form onSubmit={handleSubmit(procesarFormulario)}>
                   
              <input {...register('texto', { required: true, maxLength: LongitudTexto })} /> 
              
                
              <button type="submit" >Aregar</button>
              <button onClick={handleClearAll}>eliminar</button>
              
            </form>
            <ul >
                {
                    entradas.map((item, index) =>
                        <h2 key={index}>
                            {item.texto}
                        </h2>
                    )
                }
            </ul>
        </Fragment>
    );
}
 

