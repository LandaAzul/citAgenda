const interFunc = {};
const Horario = require("../models/horario");
const RenovarHorario = require("../models/renovarHorario");
const Turno = require("../models/Turno");
const Empresa = require("../models/empresa");
const cron = require("node-cron")
const parser = require("cron-parser")

interFunc.seleccionAleatoria = async (opcion, tiempo) => {
    console.log("funcion turno aleatorio")
    console.log(opcion)
    console.log(tiempo)
    var intervalo = "* */"+tiempo+" * * * *"
    console.log(intervalo)
    if (opcion == true) {
        //*/3 * * * * * cada 3 segundos
        var renovar = cron.schedule(intervalo, async() => {
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

interFunc.prueba = async (dia, hora) => {
    console.log('funcion de prueba')
    console.log(dia)
    console.log(hora)
    hora = new Date()
    console.log(hora)
    const [hour, minutes, seconds] = [hora.getHours(), hora.getMinutes(), hora.getSeconds()];
    console.log(hour)
    console.log(minutes)
    console.log(seconds)
    // var intervalo = "* */"+tiempo+" * * * *"
    // console.log(intervalo)
    // var renovar = cron.schedule(intervalo, async() => {
    //     console.log("esto se ejecutara cada"+intervalo)
    // }
}

//una semana en milisegundos es 604800016
//borrar las colleciones de los turnos y las clases
interFunc.renovarHorarios = async (dia, hora) => {
    
    segundo =0
    minuto = 0
    hora = 23
    dia = 6
    var intervalo = ""+segundo+" "+minuto+" "+hora+" * * "+dia+""
    //var intervalor= "* * * * *"
    console.log(intervalo)
    console.log('funcion renovar Horarios')
    var renovar = cron.schedule(intervalo, async() => {
    const horarios = await Horario.find({ regenerar: true });
    console.log('horarios renovar:true listos para su renovacion')
    console.log(horarios)
    var idHor 
    for(i=0;i<horarios.length;i++){
        console.log('horario I')
        console.log(horarios[i])
        idHor = horarios[i]._id
        await Horario.findOneAndUpdate({ _id: idHor }, { $set: { activo: false, regenerar: false } });
        const esqHorario = await RenovarHorario.findOne({ idHorario: idHor });
        console.log('esquemaHorario')
        console.log(esqHorario)
        const nuevoHorario = new Horario({
            horario: esqHorario.horario,
            activo: esqHorario.activo,
            regenerar: esqHorario.regenerar,
            lugar: esqHorario.lugar,
            mostrarTodo: esqHorario.mostrarTodo,
            fechaInicio: esqHorario.fechaInicio,
        });
        const horarioRenovado = await nuevoHorario.save();
        const idNuevo = horarioRenovado._id
        const nuevoEsquema = await RenovarHorario.findOneAndUpdate({ idHorario: idHor }, { $set: { idHorario: idNuevo } });
        console.log(nuevoEsquema)
    }
    })
};

interFunc.granDemanda = async (idHor, objHorario, dia, indice, autor1) => {
    
    console.log("Funcion gran demanda")
    let numDia
    switch (dia){
        case  "domingo":
            numDia = 6;
        break;
        
        case  "lunes":
            numDia = 0;
        break;
        
        case  "martes":
            numDia = 1;
        break;
        
        case  "miercoles":
            numDia = 2;
        break;
        
        case  "jueves":
            numDia = 3;
        break;
        
        case  "viernes":
            numDia = 4;
        break;
        
        case  "sabado":
            numDia = 5;
        break;
      }
    indices = objHorario.horario.length
    console.log(indices)
    for (i=0; i<indices; i++) { //itera indices
        if(objHorario.horario[i].granDemanda == true) {
            let condicion = false;
            let Nd = numDia;
            let numAnt
            while (condicion == false) {
                console.log(Nd)
                if(Nd != 0) { 
                    numAnt = Nd-1
                    console.log(numAnt)
                }
                else { 
                    console.log("el dia anterior no se encuentra en este horario")
                    break;
                }
                if(objHorario.horario[i].dia[numAnt] != null) {
                    if(objHorario.horario[i].dia[numAnt].autor1 == autor1){
                        //si agendo en el dia anterior, se le negara la solicitud
                        console.log("si agendo en el dia anterior, se retorna true")
                        return true;
                    }
                    else {
                        //en el dia anterior, no agendo, aun se deben mirar en las otras horas de gran demanda
                        break;
                    }
                } else { Nd = Nd-1}
            }
        }
        //si se llega a este punto, quiere decir que el autor no agendo en el dia anterior para las diversas horas, se le aceptara la solicitud
        
    }
    console.log("no se encontro, que el socio halla agendado el dia anterior, se retorna false")
    return false

};


module.exports = interFunc;