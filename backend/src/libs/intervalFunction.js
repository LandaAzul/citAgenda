const interFunc = {};
const Horario = require("../models/horario");
const Turno = require("../models/Turno");

interFunc.seleccionarTurnoAleatorio = async () => {
setInterval(async() =>  {
    const count = await Horario.estimatedDocumentCount();
    console.log("numero de horarios")
    console.log(count)
    const horarios = await Horario.find();
    for (i=0; i<count; i++) { //itera horarios
        //console.log(horarios[i])
        console.log("horario"+i)
        indices = horarios[i].horario.length
        //console.log(indices)
        for (j=0; j<indices; j++) { //itera indices
            //console.log(horarios[i].horario)
            console.log("indice")
            console.log(j)

            const domingo = horarios[i].horario[j].domingo
            if (domingo != null)
            {
                const autor1 = horarios[i].horario[j].domingo.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                    const idHor = horarios[i]._id
                    console.log(idHor)
                    //const turnos = await Turno.find({},{idHorario: idHor}); //devuelve solo el id y el id horario
                    const turnos = await Turno.find({idHorario: idHor});      //devuelve un array vacio
                    console.log(turnos)
                }
            } else {
                console.log("no tiene domingo")
            }

            const lunes = horarios[i].horario[j].lunes
            if (lunes != null)
            {
                const autor1 = horarios[i].horario[j].lunes.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
                
            } else {
                console.log("no tiene lunes")
            }


            const martes = horarios[i].horario[j].martes
            if (martes != null)
            {
                const autor1 = horarios[i].horario[j].martes.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
                
            } else {
                
                console.log("no tiene martes")
            }


            const miercoles = horarios[i].horario[j].miercoles
            if (miercoles != null)
            {
                const autor1 = horarios[i].horario[j].miercoles.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
            } else {
                
                console.log("no tiene miercoles")
            }
            
            const jueves = horarios[i].horario[j].jueves
            if (jueves != null)
            {
                const autor1 = horarios[i].horario[j].jueves.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
            } else { 
                console.log("no tiene jueves")
            }


            const viernes = horarios[i].horario[j].viernes
            if (viernes != null)
            {
                const autor1 = horarios[i].horario[j].viernes.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
            } else {
                
                console.log("no tiene viernes")
            }

            
            const sabado = horarios[i].horario[j].sabado
            if (sabado != null)
            {
                const autor1 = horarios[i].horario[j].sabado.autor1
                if(autor1 != null)
                {
                    console.log("la clase ya esta agendada")
                } else {
                    console.log("la clase no esta agendada")
                }
            } else {
                
                console.log("no tiene sabado")
            }
        }
    }



},10000)
};

module.exports = interFunc;