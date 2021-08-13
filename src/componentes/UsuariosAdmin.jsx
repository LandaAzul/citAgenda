import React, {useState, Fragment} from 'react';
import {Lista} from './Lista';
  
export function UsuariosAdmin(){

    const [todos, setTodos] = useState([
        {id: 1, task: 'Area o profesion', completed: false},
    ]);
    return(
        <Fragment>
            <Lista todos={todos}/>
            <input type='text' placeholder='Nueva area o profesion'></input>
            <button>agregar</button>
            <button>eliminar</button>
        </Fragment>
    );
        
}