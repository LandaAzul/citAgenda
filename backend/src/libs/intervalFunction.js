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
        var renovar = cron.schedule(" * * * * *", async() => {
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
        
                    const domingo = horarios[i].horario[j].domingo
                    if (domingo != null)
                    {
                        const autor1 = horarios[i].horario[j].domingo.autor1
                        const profesor = horarios[i].horario[j].domingo.profesor
                        if(autor1 != null)
                        {
                            console.log(" domingo ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del domingo no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "domingo", indice: j});      
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].domingo.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].domingo.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].domingo.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].domingo.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del domingo no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "domingo", indice: j});      
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].domingo.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].domingo.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].domingo.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].domingo.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].domingo.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].domingo.solicita = turnoAleatorio.solicita
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
                        console.log("no tiene domingo")
                    }
        
                    const lunes = horarios[i].horario[j].lunes
                    if (lunes != null)
                    {
                        const autor1 = horarios[i].horario[j].lunes.autor1
                        const profesor = horarios[i].horario[j].lunes.profesor
                        if(autor1 != null)
                        {
                            console.log("el lunes ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del lunes no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "lunes", indice: j});      
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].lunes.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].lunes.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].lunes.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].lunes.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del lunes no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "lunes", indice: j});     
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].lunes.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].lunes.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].lunes.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].lunes.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].lunes.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].lunes.solicita = turnoAleatorio.solicita
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
                        console.log("no tiene lunes")
                    }
        
        
                    const martes = horarios[i].horario[j].martes
                    if (martes != null)
                    {
                        const autor1 = horarios[i].horario[j].martes.autor1
                        const profesor = horarios[i].horario[j].martes.profesor
                        if(autor1 != null)
                        {
                            console.log("el martes ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del martes no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "martes", indice: j});     
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].martes.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].martes.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].martes.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].martes.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del martes no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "martes", indice: j});      
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].martes.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].martes.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].martes.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].martes.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].martes.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].martes.solicita = turnoAleatorio.solicita
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
                        
                        console.log("no tiene martes")
                    }
        
        
                    const miercoles = horarios[i].horario[j].miercoles
                    if (miercoles != null)
                    {
                        const autor1 = horarios[i].horario[j].miercoles.autor1
                        const profesor = horarios[i].horario[j].miercoles.profesor
                        if(autor1 != null)
                        {
                            console.log("el miercoles ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del miercoles no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "miercoles", indice: j});      
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].miercoles.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].miercoles.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].miercoles.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].miercoles.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del miercoles no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "miercoles", indice: j});      
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].miercoles.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].miercoles.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].miercoles.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].miercoles.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].miercoles.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].miercoles.solicita = turnoAleatorio.solicita
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
                        
                        console.log("no tiene miercoles")
                    }
                    
                    const jueves = horarios[i].horario[j].jueves
                    if (jueves != null)
                    {
                        const autor1 = horarios[i].horario[j].jueves.autor1
                        const profesor = horarios[i].horario[j].jueves.profesor
                        if(autor1 != null)
                        {
                            console.log("el jueves ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del jueves no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "jueves", indice: j});      
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].jueves.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].jueves.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].jueves.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].jueves.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del jueves no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "jueves", indice: j});      
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].jueves.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].jueves.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].jueves.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].jueves.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].jueves.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].jueves.solicita = turnoAleatorio.solicita
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
                        console.log("no tiene jueves")
                    }
        
        
                    const viernes = horarios[i].horario[j].viernes
                    if (viernes != null)
                    {
                        const autor1 = horarios[i].horario[j].viernes.autor1
                        const profesor = horarios[i].horario[j].viernes.profesor
                        if(autor1 != null)
                        {
                            console.log("el viernes ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del viernes no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "viernes", indice: j});     
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].viernes.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].viernes.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].viernes.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].viernes.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del viernes no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "viernes", indice: j});    
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].viernes.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].viernes.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].viernes.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].viernes.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].viernes.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].viernes.solicita = turnoAleatorio.solicita
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
                        
                        console.log("no tiene viernes")
                    }
        
                    
                    const sabado = horarios[i].horario[j].sabado
                    if (sabado != null)
                    {
                        const autor1 = horarios[i].horario[j].sabado.autor1
                        const profesor = horarios[i].horario[j].sabado.profesor
                        if(autor1 != null)
                        {
                            console.log("el sabado ya esta agendado")
                        } else {
                            if(profesor != null) {
                                console.log('la clase del sabado no esta agendada')
                                const idHor = horarios[i]._id
                                const clases = await Turno.find({idHorario: idHor, dia: "sabado", indice: j});      
                                console.log(clases)
                                if(clases.length>0) {
                                    var rand = Math.floor(Math.random()*clases.length);
                                    var claseAleatoria = clases[rand];
                                    console.log("la clase escojida aleatoriamente fue")
                                    console.log(claseAleatoria)
                                    horarios[i].horario[j].sabado.solicita = claseAleatoria.solicita
                                    horarios[i].horario[j].sabado.autor1 = claseAleatoria.autor1
                                    horarios[i].horario[j].sabado.codigo = claseAleatoria.codigo
                                    horarios[i].horario[j].sabado.horaSolicitud = claseAleatoria.horaSolicitud
                                    horario = horarios[i].horario
                                    try {
                                        await Horario.findOneAndUpdate({ _id: idHor }, { horario });
                                    } catch (error) {
                                        console.log(error)
                                        res.json(error.message);
                                    }
                                }
                            } else {
                                console.log("el turno del sabado no  esta agendado")
                                const idHor = horarios[i]._id
                                const turnos = await Turno.find({idHorario: idHor, dia: "sabado", indice: j});    
                                console.log(turnos)
                                if(turnos.length>0) {
                                    var rand = Math.floor(Math.random()*turnos.length);
                                    var turnoAleatorio = turnos[rand];
                                    console.log("el turno escojido aleatoriamente fue")
                                    console.log(turnoAleatorio)
                                    horarios[i].horario[j].sabado.autor1 = turnoAleatorio.autor1
                                    horarios[i].horario[j].sabado.autor2 = turnoAleatorio.autor2
                                    horarios[i].horario[j].sabado.autor3 = turnoAleatorio.autor3
                                    horarios[i].horario[j].sabado.autor4 = turnoAleatorio.autor4
                                    horarios[i].horario[j].sabado.horaSolicitud = turnoAleatorio.horaSolicitud
                                    horarios[i].horario[j].sabado.solicita = turnoAleatorio.solicita
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
                        
                        console.log("no tiene sabado")
                    }
                }
            }
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

module.exports = interFunc;