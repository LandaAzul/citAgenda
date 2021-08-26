import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import {SalidaTexto} from './SalidaTexto';



export function TituloYDescripcion ({texto, LongitudTexto}) {

    const {register, errors, handleSubmit} = useForm();

    const [entradas, setentradas] = useState([]);
    
    

    const procesarFormulario = (data, e) => {
        console.log(data);
        //Aqui guardamos todo los estados anteriores. ([...entradas]) se deben anteponer los 3 puntos para que los guarde
        setentradas([entradas, data ]);
        // limpiar campos
        e.target.reset();
    }
    //funcion para limpiar el array
    const handleClearAll = () => {
        setentradas([entradas]);
        //setentradas([firstName]);

    };

    

    return (
        
        <Fragment>
            <h3>{texto} maximo {LongitudTexto} caracteres </h3>
            <form onSubmit={handleSubmit(procesarFormulario)}>
                   
              <input
                    //onChange={e => setFirstName(e.target.value)}
                    {...register('texto', { required: true, maxLength: LongitudTexto })} /> 
              
                
              <button type="submit" >Aregar</button>
              <button onClick={handleClearAll}>eliminar</button>
              
              
            </form>
           
            <div>
                
                {
                    entradas.map((item, index) =>
                        <h2 key={index}>
                            <SalidaTexto texto= {item.texto}/>                        
                        </h2>
                    )
                }
                
            </div>
        </Fragment>
    );

    
}
 

