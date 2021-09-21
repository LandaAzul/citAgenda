import React, {useState}from 'react'
import axios from 'axios'


export  function PedirTUsuarios() {
    
    const [users, setUsers]= useState([])

     async function componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users');
        //setUsers({users: res.data});
        setUsers(res.data);
        //console.log(users)

    }

   
    return (
        <div className="w3-container">
            <div className="w3-panel">
                <button type="button" onClick={componentDidMount}>
                    Mostrar todos los usuarios
                </button>
            
                <button type="button" onClick={e => setUsers([])}>
                    Limpiar
                </button>
            </div>
            <div className="w3-panel">
                <ul className="w3-ul w3-hoverable">
                    {
                        users.map(user => (
                            <li key={user._id}>
                               {user.username}
                            </li>
                        ))
                    }
                </ul>
            </div>
            
        </div>
    )
}
