import React from 'react';

export function Lista({todos}) {
    return (
        <ul>
         {
             todos.map((todo) => (
                 <li>Area</li>
             ))
         }  
        </ul>
    );
}

