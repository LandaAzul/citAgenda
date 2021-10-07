import React, {useState} from 'react';
import axios from 'axios'

var idEm = '';
const TextoEstilo = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Helvética arial',
    fontSize: '22px',
    textShadow: '2px 2px 2px black',
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
        <div className="w3-col m2">
            <div className="w3-container w3-metro-dark-orange w3-center w3-padding">
                <div style={TextoEstilo}>
                    {texto}
                </div>
            </div>
        </div>
        
    )
}    
 

