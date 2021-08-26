import React from 'react'

export const IniSesionOReg = () => {
    return (
        <div>
            <h3>Acceso o Registro de usuarios</h3>
                <form>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Email o Celular"
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                        />
                        <button 
                            type="submit"
                        >
                            Ingresar
                        </button>
                    </div>
                    <div>
                        <button 
                            type="button"
                        >
                            ¿No tienes cuenta?
                        </button>
                        <button 
                            type="button"
                        >
                            ¿Olvido la contraseña?
                        </button>
                    </div>
                </form>
        </div>
    )
}

