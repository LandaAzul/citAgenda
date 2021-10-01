import React, {useState} from 'react';
import axios from 'axios'

var idEm = '';
const TextoEstilo = {
    //color: 'black',
    textAlign: 'justify',
    fontFamily: 'arial',
    fontSize: '18px', //camelCase property
    //textAlign:'left'
  }

export default function BarraLateral() {

    const [texto, setTexto]= useState('')

    async function componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/empresas');
    idEm = res.data.map(user => user._id).join()
    const resp = await axios.get('http://localhost:4000/api/empresas/'+ idEm ); 
    setTexto(resp.data.message.descripcion);
    }

    componentDidMount()

    return(
        <div className="w3-container w3-panel w3-col m2 w3-indigo w3-center w3-card" >
            <div style={TextoEstilo}>
                {texto}
            </div>
        </div>
        
    )
}    
 

