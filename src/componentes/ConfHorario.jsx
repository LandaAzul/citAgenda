import React from 'react'

export function ConfHorario() {
    return (
        <div>
            <p className="w3-large w3-center">Ajuste de horario</p>
            <div className="w3-row w3-border">
                <form>
                    <div className="w3-col m2 w3-panel">
                        <div className="w3-center" >
                            <h3>
                                Días
                            </h3>
                        </div>
                        <div>
                            <input type="checkbox" id="lunes" value="lunes"></input>
                            <label htmlFor="lunes">Lunes</label><br></br>
                            <input type="checkbox" id="martes"  value="martes"></input>
                            <label htmlFor="martes">Martes</label><br></br>
                            <input type="checkbox" id="miercoles"  value="miercoles"></input>
                            <label htmlFor="miercoles">Miércoles</label><br></br>
                            <input type="checkbox" id="jueves" value="jueves"></input>
                            <label htmlFor="jueves">Jueves</label><br></br>
                            <input type="checkbox" id="viernes"  value="viernes"></input>
                            <label htmlFor="viernes">Viernes</label><br></br>
                            <input type="checkbox" id="sabado"  value="sabado"></input>
                            <label htmlFor="sabado">Sábado</label><br></br>
                            <input type="checkbox" id="domingo"  value="domingo"></input>
                            <label htmlFor="domingo">Domingo</label>
                        </div>
                    </div>
                    <div className="w3-col m5 w3-center w3-panel">
                        <div className="w3-center">
                            <h3>
                                Hora de inicio
                            </h3>
                        </div>
                        <div>
                            <div>
                                <input type="number" id="horaInicio" name="horaInicio" min="0" max="12" placeholder="Hora"></input>
                                <input type="number" id="minutosInicio" name="minutosInicio" min="0" max="59" placeholder="Minutos"></input>
                                
                            </div>
                            <div>
                                <input type="radio" id="am" name="ampmInicio" value="am"></input>
                                <label htmlFor="am">Am</label><br></br>
                                <input type="radio" id="pm" name="ampmInicio" value="pm"></input>
                                <label htmlFor="pm">Pm</label>
                            </div>
                        </div>
                        <div className="w3-center">
                            <h3>
                                Franja de turno
                            </h3>
                        </div>
                        <div>
                            <input type="number" id="horaFranja" name="horaFranja" min="0" max="24" placeholder="Hora"></input>
                            <input type="number" id="minutosFranja" name="minutosFranja" min="0" max="59" placeholder="Minutos"></input>
                        </div>
                    </div>
                    <div className="w3-col m5 w3-center w3-panel">
                        <div className="w3-center">
                            <h3>
                                Hora de finalización
                            </h3>
                        </div>
                        <div>
                            <div>
                                <input type="number" id="horaFin" name="horaFin" min="0" max="12" placeholder="Hora" ></input>
                                <input type="number" id="minutosFin" name="minutosFin" min="0" max="59" placeholder="Minutos"></input>
                            </div>
                            <div>
                                <input type="radio" id="amm" name="ampmFin" value="am"></input>
                                <label htmlFor="amm">Am</label><br></br>
                                <input type="radio" id="pmm" name="ampmFin" value="pm"></input>
                                <label htmlFor="pmm">Pm</label><br></br>
                            </div>
                        </div>
                        <div>
                            <h3>
                                Franja de descanso entre turnos
                            </h3>
                        </div>
                        <div>
                            <input type="number" id="horaDescanso" name="horaDescanso" min="0" max="24" placeholder="Hora"></input>
                            <input type="number" id="minutosDescanso" name="minutosDescanso" min="0" max="59" placeholder="Minutos"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
