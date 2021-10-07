import React,{useState} from 'react'
import swal from 'sweetalert';



export function Horas() {

const [valor,setValor] = useState('')
const [fin,SetFin] = useState(12)


const validarNumeros = e => {
    console.log(valor)
    let valu = e.target.value;
   
    if (!Number(valu)) {
        swal({
            title: "Solo números",
            text: 'Debe ingresar solo números',
            icon: "info",
            buttons: 'De acuerdo'
        })
        setValor(0);
        return;
        
    }
        setValor(valu);
        console.log(valor)
   };

    return (
        <div>
            <input type="text" onChange={validarNumeros}/>
            {valor}
        </div>
        
    )
}
