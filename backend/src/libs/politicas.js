const interFunc = {};
const Horario = require("../models/horario");
const Turno = require("../models/Turno");
const Empresa = require("../models/empresa");
const cron = require("node-cron")

interFunc.seleccionAleatoria = async (opcion) => {
    console.log("funcion turno aleatorio")
    console.log(opcion)
    
    if (opcion == true) {
        //*/3 * * * * * cada 3 segundos
        var renovar = cron.schedule("* * * * * *", async() => {
            const count = await Horario.estimatedDocumentCount();
            console.log("numero de horarios")
            console.log(count)
            const horarios = await Horario.find();
            for (i=0; i<count; i++) { //itera horarios
                //console.log(horarios[i])
                console.log("horario "+i)
                indices = horarios[i].horario.length
                //console.log(indices)
                for (j=0; j<indices; j++) { //itera indices
                    //console.log(horarios[i].horario)
                    console.log("indice")
                    console.log(j)
                    for(d=0; d<7; d++){
                        const diaSeleccionado = horarios[i].horario[j].dia[d]
                        if (diaSeleccionado != null) {
                            const autor1 = horarios[i].horario[j].dia[d].autor1
                            const profesor = horarios[i].horario[j].dia[d].profesor
                            const idHor = horarios[i]._id
                            const nombreDia = diaSeleccionado.dia
                            console.log(nombreDia)
                            if(autor1 != null){
                                console.log(" ya esta agendado")
                            } else {
                                if(profesor != null) {
                                    console.log('la clase no esta agendada')
                                    const clases = await Turno.find({idHorario: idHor, dia: nombreDia, indice: j});      
                                    console.log(clases)
                                    if(clases.length>0) {
                                        var rand = Math.floor(Math.random()*clases.length);
                                        var claseAleatoria = clases[rand];
                                        console.log("la clase escojida aleatoriamente fue")
                                        console.log(claseAleatoria)
                                        horarios[i].horario[j].dia[d].solicita = claseAleatoria.solicita
                                        horarios[i].horario[j].dia[d].autor1 = claseAleatoria.autor1
                                        horarios[i].horario[j].dia[d].codigo = claseAleatoria.codigo
                                        horarios[i].horario[j].dia[d].horaSolicitud = claseAleatoria.horaSolicitud
                                        horario = horarios[i].horario
                                        try {
                                            await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                        } catch (error) {
                                            console.log(error)
                                            res.json(error.message);
                                        }
                                    }
                                } else {
                                    console.log("el turno no  esta agendado")
                                    const turnos = await Turno.find({idHorario: idHor, dia: nombreDia, indice: j});      
                                    console.log(turnos)
                                    if(turnos.length>0) {
                                        var rand = Math.floor(Math.random()*turnos.length);
                                        var turnoAleatorio = turnos[rand];
                                        console.log("el turno escojido aleatoriamente fue")
                                        console.log(turnoAleatorio)
                                        horarios[i].horario[j].dia[d].autor1 = turnoAleatorio.autor1
                                        horarios[i].horario[j].dia[d].autor2 = turnoAleatorio.autor2
                                        horarios[i].horario[j].dia[d].autor3 = turnoAleatorio.autor3
                                        horarios[i].horario[j].dia[d].autor4 = turnoAleatorio.autor4
                                        horarios[i].horario[j].dia[d].horaSolicitud = turnoAleatorio.horaSolicitud
                                        horarios[i].horario[j].dia[d].solicita = turnoAleatorio.solicita
                                        horario = horarios[i].horario
                                        try {
                                            await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                        } catch (error) {
                                            console.log(error)
                                            res.json(error.message);
                                        }
                                    }
                                }
                            }     
                        } else {
                            console.log("no tiene dia "+d)
                        }
                    }//for dias
                } //for indices (horas)
            }//for horarios
        })
    } else {
        var tareas = cron.getTasks();
        // console.log("tareas actuales")
        // console.log(tareas)
        // console.log("numero de tareas "+tareas.length)
        tareas[tareas.length-1].stop()
        console.log("tarea detenida")
    }
    
};

interFunc.activarIntervalos = async () => {
    const empresas = await Empresa.find();
    if(empresas[0].aleatorio == true)
    {
        console.log("el sorteo aleatorio esta activado, se va a activar el intervalo")
        interFunc.seleccionAleatoria(true);
    }
}

//una semana en milisegundos es 604800016
//borrar las colleciones de los turnos y las clases
interFunc.renovarHorarios = async (opcion) => {

    
    if (opcion == true) {
        var renovar = cron.schedule("*/3 * * * * *", () => {
            console.log("tarea de cron")
            //console.log(renovar)
        })
        
    } else {
        var tareas = cron.getTasks();
        console.log("tareas actuales")
        console.log(tareas)
        tareas[0].stop()
        console.log("tarea detenida")
    }
    
};

interFunc.politicaGranDemanda = async (idHor, objHorario, dia, indice, autor1) => {
    
    console.log("Funcion gran demanda")
    console.log(objHorario.horario[indice])
    console.log(dia)
    console.log(indice)
    console.log(autor1)
    console.log("fin gran demanda")
    indices = objHorario.horario.length
    console.log(indices)
    let horasDeGranDemanda = []
    for (i=0; i<indices; i++) { //itera indices
        if(objHorario.horario[i].granDemanda == true) {
            horasDeGranDemanda.push(objHorario.horario[i])
        }
    }
    console.log(horasDeGranDemanda)
    console.log(horasDeGranDemanda.length)
    for (j=0; j<horasDeGranDemanda.length; j++) { //itera indices de las horas de gran demanda
        //como no se sabe si el dia anterior existe, se debe preguntar, si verifica que el autor del turno del dia anterior no sea el de este dia, si no existe, se procede a mirar el dia anterior a ese y asi con todos los dias
        if(dia == "domingo"){
        //se procede a comprobar si hay un turno guardado en el dia anterior
            let diaAnterior = objHorario[indice].sabado
            if(diaAnterior != null){
                //el dia anterior existe
                if(diaAnterior.autor1 = autor1){
                    //el dia anterior ya esta agendado para el socio
                    return false;
                }
            } else {  //no  existia el dia anterior, se procede a verificar el anterior al sabado
                let diaAnterior = objHorario[indice].viernes
                if(diaAnterior != null){
                //el dia anterior existe
                    if(diaAnterior.autor1 = autor1){
                    //el dia anterior ya esta agendado para el socio
                        return false;
                    }
                }
            } 
            
        }
    }
    
};


module.exports = interFunc;