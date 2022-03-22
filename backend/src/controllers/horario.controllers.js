const horarioCtrl = {};
const Horario = require("../models/horario");
const Turno = require("../models/Turno");
const Empresa = require("../models/empresa");
const Clase = require("../models/clase");

horarioCtrl.getHorarios = async (req, res) => {
  const horarios = await Horario.find(); 
  res.json(horarios);
};
horarioCtrl.createHorario = async (req, res) => {
  const {
    horario,
    activo,
    regenerar,
    lugar,
    fechaInicio,
  } = req.body;
  const nuevoHorario = new Horario({
    horario,
    activo,
    regenerar,
    lugar,
    fechaInicio,
  });
+ console.log(horario)
  console.log(activo)
+ console.log(nuevoHorario)
  await nuevoHorario.save();

  res.json({ message: "nuevoHorario" });
};

horarioCtrl.getHorario = async (req, res) => {
  const horario = await Horario.findById(req.params.id);
  console.log(horario)
  res.json({ horario });
};

horarioCtrl.updateHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  const {
    horario,
    activo,
    regenerar,
    lugar,
    fechaInicio,
  } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, 
    { $set: {
    horario,
    activo,
    regenerar,
    lugar,
    fechaInicio,
    }
  });
  console.log(horario)
  console.log(Horario)
  res.json({ message: "Horario actualizado" });
};

horarioCtrl.deleteHorario = async (req, res) => {
  const horario = await Horario.findByIdAndDelete(req.params.id);
  res.json({ title: "horario eliminado" });
};

horarioCtrl.mirarHorario = async (req, res) => {
  const horario = await Horario.findById(req.params.id);
  console.log(horario)
  res.json({ message: horario });
};

horarioCtrl.activarHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  const { activo } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, { $set: { activo } });
  console.log(activo)
  console.log("estado del Horario actualizado" )
  res.json({ message: "estado del Horario actualizado" });
};


horarioCtrl.tituloHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  const { lugar } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, { $set: { lugar } });
  console.log(lugar)
  console.log("el titulo del Horario ha sido actualizado" )
  res.json({ message: "el titulo del Horario ha sido actualizado" });
};

horarioCtrl.regenerarHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  const { regenerar } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, { $set: { regenerar } });
  console.log(regenerar)
  console.log("El Horario se regenerará periodicamente" )
  res.json({ message: "El Horario se regenerará periodicamente" });
};
horarioCtrl.solicitudHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  const objHorario = await Horario.findById(req.params.id); 
  const empresa = await Empresa.find();
  const {
    dia,
    indice,
    autor1,
    codigo,
    autor2,
    autor3,
    autor4,
    horaSolicitud,
    solicita,
  } = req.body;
  
  if (solicita == "Turno"){
    
    console.log(solicita)
    console.log("solicita Turno")
    const nuevoTurno = new Turno({
      titulo: "SOLICITUD DE TURNO",
      idHorario: req.params.id,
      dia,
      indice,
      solicita,
      autor1,
      codigo,
      autor2,
      autor3,
      autor4,
      horaSolicitud,
    });
    await nuevoTurno.save();
    
    console.log(empresa[0].aleatorio)
    if(empresa[0].aleatorio == true)
    {
      console.log('turno guardado, en el siguiente intervalo se hara el sorteo aleatorio para su asignacion')  
    } else {
      if (dia == "domingo"){
        objHorario.horario[indice].domingo.solicita = solicita,
        objHorario.horario[indice].domingo.autor1 = autor1,
        objHorario.horario[indice].domingo.codigo = codigo,
        objHorario.horario[indice].domingo.autor2 = autor2,
        objHorario.horario[indice].domingo.autor3 = autor3,
        objHorario.horario[indice].domingo.autor4 = autor4,
        objHorario.horario[indice].domingo.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "lunes"){
        objHorario.horario[indice].lunes.solicita = solicita,
        objHorario.horario[indice].lunes.autor1 = autor1,
        objHorario.horario[indice].lunes.codigo = codigo,
        objHorario.horario[indice].lunes.autor2 = autor2,
        objHorario.horario[indice].lunes.autor3 = autor3,
        objHorario.horario[indice].lunes.autor4 = autor4,
        objHorario.horario[indice].lunes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "martes"){
        objHorario.horario[indice].martes.solicita = solicita,
        objHorario.horario[indice].martes.autor1 = autor1,
        objHorario.horario[indice].martes.codigo = codigo,
        objHorario.horario[indice].martes.autor2 = autor2,
        objHorario.horario[indice].martes.autor3 = autor3,
        objHorario.horario[indice].martes.autor4 = autor4,
        objHorario.horario[indice].martes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "miercoles"){
        objHorario.horario[indice].miercoles.solicita = solicita,
        objHorario.horario[indice].miercoles.autor1 = autor1,
        objHorario.horario[indice].miercoles.codigo = codigo,
        objHorario.horario[indice].miercoles.autor2 = autor2,
        objHorario.horario[indice].miercoles.autor3 = autor3,
        objHorario.horario[indice].miercoles.autor4 = autor4,
        objHorario.horario[indice].miercoles.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "jueves"){
        objHorario.horario[indice].jueves.solicita = solicita,
        objHorario.horario[indice].jueves.autor1 = autor1,
        objHorario.horario[indice].jueves.codigo = codigo,
        objHorario.horario[indice].jueves.autor2 = autor2,
        objHorario.horario[indice].jueves.autor3 = autor3,
        objHorario.horario[indice].jueves.autor4 = autor4,
        objHorario.horario[indice].jueves.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "viernes"){
        objHorario.horario[indice].viernes.solicita = solicita,
        objHorario.horario[indice].viernes.autor1 = autor1,
        objHorario.horario[indice].viernes.codigo = codigo,
        objHorario.horario[indice].viernes.autor2 = autor2,
        objHorario.horario[indice].viernes.autor3 = autor3,
        objHorario.horario[indice].viernes.autor4 = autor4,
        objHorario.horario[indice].viernes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "sabado"){
        objHorario.horario[indice].sabado.solicita = solicita,
        objHorario.horario[indice].sabado.autor1 = autor1,
        objHorario.horario[indice].sabado.codigo = codigo,
        objHorario.horario[indice].sabado.autor2 = autor2,
        objHorario.horario[indice].sabado.autor3 = autor3,
        objHorario.horario[indice].sabado.autor4 = autor4,
        objHorario.horario[indice].sabado.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    }
  }
  if (solicita == "Clase"){
    console.log(solicita)
    console.log("solicita Clase")
    const nuevaClase = new Clase({
      titulo: "SOLICITUD DE CLASE",
      idHorario: req.params.id,
      dia,
      indice,
      solicita,
      autor1,
      codigo,
      horaSolicitud,
    });
    await nuevaClase.save();
    if(empresa[0].aleatorio == true)
    {
      console.log('clase guardada, en el siguiente intervalo se hara el sorteo aleatorio para su asignacion')
    } else {
      console.log(empresa[0].aleatorio)
      if (dia == "domingo"){
        objHorario.horario[indice].domingo.solicita = solicita,
        objHorario.horario[indice].domingo.autor1 = autor1,
        objHorario.horario[indice].domingo.codigo = codigo,
        objHorario.horario[indice].domingo.autor2 = autor2,
        objHorario.horario[indice].domingo.autor3 = autor3,
        objHorario.horario[indice].domingo.autor4 = autor4,
        objHorario.horario[indice].domingo.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "lunes"){
        objHorario.horario[indice].lunes.solicita = solicita,
        objHorario.horario[indice].lunes.autor1 = autor1,
        objHorario.horario[indice].lunes.codigo = codigo,
        objHorario.horario[indice].lunes.autor2 = autor2,
        objHorario.horario[indice].lunes.autor3 = autor3,
        objHorario.horario[indice].lunes.autor4 = autor4,
        objHorario.horario[indice].lunes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "martes"){
        objHorario.horario[indice].martes.solicita = solicita,
        objHorario.horario[indice].martes.autor1 = autor1,
        objHorario.horario[indice].martes.codigo = codigo,
        objHorario.horario[indice].martes.autor2 = autor2,
        objHorario.horario[indice].martes.autor3 = autor3,
        objHorario.horario[indice].martes.autor4 = autor4,
        objHorario.horario[indice].martes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "miercoles"){
        objHorario.horario[indice].miercoles.solicita = solicita,
        objHorario.horario[indice].miercoles.autor1 = autor1,
        objHorario.horario[indice].miercoles.codigo = codigo,
        objHorario.horario[indice].miercoles.autor2 = autor2,
        objHorario.horario[indice].miercoles.autor3 = autor3,
        objHorario.horario[indice].miercoles.autor4 = autor4,
        objHorario.horario[indice].miercoles.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "jueves"){
        objHorario.horario[indice].jueves.solicita = solicita,
        objHorario.horario[indice].jueves.autor1 = autor1,
        objHorario.horario[indice].jueves.codigo = codigo,
        objHorario.horario[indice].jueves.autor2 = autor2,
        objHorario.horario[indice].jueves.autor3 = autor3,
        objHorario.horario[indice].jueves.autor4 = autor4,
        objHorario.horario[indice].jueves.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "viernes"){
        objHorario.horario[indice].viernes.solicita = solicita,
        objHorario.horario[indice].viernes.autor1 = autor1,
        objHorario.horario[indice].viernes.codigo = codigo,
        objHorario.horario[indice].viernes.autor2 = autor2,
        objHorario.horario[indice].viernes.autor3 = autor3,
        objHorario.horario[indice].viernes.autor4 = autor4,
        objHorario.horario[indice].viernes.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "sabado"){
        objHorario.horario[indice].sabado.solicita = solicita,
        objHorario.horario[indice].sabado.autor1 = autor1,
        objHorario.horario[indice].sabado.codigo = codigo,
        objHorario.horario[indice].sabado.autor2 = autor2,
        objHorario.horario[indice].sabado.autor3 = autor3,
        objHorario.horario[indice].sabado.autor4 = autor4,
        objHorario.horario[indice].sabado.horaSolicitud = horaSolicitud,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    }
  }
  if (solicita == "cancelar"){
    console.log(solicita)
    console.log("solicita cancelar")
      if (dia == "domingo"){
        objHorario.horario[indice].domingo.solicita = null,
        objHorario.horario[indice].domingo.autor1 = null,
        objHorario.horario[indice].domingo.codigo = null,
        objHorario.horario[indice].domingo.autor2 = null,
        objHorario.horario[indice].domingo.autor3 = null,
        objHorario.horario[indice].domingo.autor4 = null,
        objHorario.horario[indice].domingo.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "lunes"){
        objHorario.horario[indice].lunes.solicita = null,
        objHorario.horario[indice].lunes.autor1 = null,
        objHorario.horario[indice].lunes.codigo = null,
        objHorario.horario[indice].lunes.autor2 = null,
        objHorario.horario[indice].lunes.autor3 = null,
        objHorario.horario[indice].lunes.autor4 = null,
        objHorario.horario[indice].lunes.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "martes"){
        objHorario.horario[indice].martes.solicita = null,
        objHorario.horario[indice].martes.autor1 = null,
        objHorario.horario[indice].martes.codigo = null,
        objHorario.horario[indice].martes.autor2 = null,
        objHorario.horario[indice].martes.autor3 = null,
        objHorario.horario[indice].martes.autor4 = null,
        objHorario.horario[indice].martes.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "miercoles"){
        objHorario.horario[indice].miercoles.solicita = null,
        objHorario.horario[indice].miercoles.autor1 = null,
        objHorario.horario[indice].miercoles.codigo = null,
        objHorario.horario[indice].miercoles.autor2 = null,
        objHorario.horario[indice].miercoles.autor3 = null,
        objHorario.horario[indice].miercoles.autor4 = null,
        objHorario.horario[indice].miercoles.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "jueves"){
        objHorario.horario[indice].jueves.solicita = null,
        objHorario.horario[indice].jueves.autor1 = null,
        objHorario.horario[indice].jueves.codigo = null,
        objHorario.horario[indice].jueves.autor2 = null,
        objHorario.horario[indice].jueves.autor3 = null,
        objHorario.horario[indice].jueves.autor4 = null,
        objHorario.horario[indice].jueves.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "viernes"){
        objHorario.horario[indice].viernes.solicita = null,
        objHorario.horario[indice].viernes.autor1 = null,
        objHorario.horario[indice].viernes.codigo = null,
        objHorario.horario[indice].viernes.autor2 = null,
        objHorario.horario[indice].viernes.autor3 = null,
        objHorario.horario[indice].viernes.autor4 = null,
        objHorario.horario[indice].viernes.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
      if (dia == "sabado"){
        objHorario.horario[indice].sabado.solicita = null,
        objHorario.horario[indice].sabado.autor1 = null,
        objHorario.horario[indice].sabado.codigo = null,
        objHorario.horario[indice].sabado.autor2 = null,
        objHorario.horario[indice].sabado.autor3 = null,
        objHorario.horario[indice].sabado.autor4 = null,
        objHorario.horario[indice].sabado.horaSolicitud = null,
        horario = objHorario.horario
        try {
          await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
        } catch (error) {
          console.log(error)
          res.json(error.message);
        }
      }
    
  }
  res.json({message: " guardado " });

};



horarioCtrl.editarAsistio = async (req, res) => {
  console.log(req.params.id, req.body);
  const objHorario = await Horario.findById(req.params.id); 
  const {
    dia,
    indice,
    asistio
  } = req.body;

  if (dia == "domingo"){
    objHorario.horario[indice].domingo.asistio = asistio,

    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "lunes"){
    objHorario.horario[indice].lunes.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "martes"){
    objHorario.horario[indice].martes.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "miercoles"){
    objHorario.horario[indice].miercoles.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "jueves"){
    objHorario.horario[indice].jueves.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "viernes"){
    objHorario.horario[indice].viernes.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "sabado"){
    objHorario.horario[indice].sabado.asistio = asistio,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  res.json({ horario });
};

horarioCtrl.asignarProfesor = async (req, res) => {
  console.log(req.params.id, req.body);
  const objHorario = await Horario.findById(req.params.id); 
  const {
    dia,
    indice,
    profesor,
    canchero,
    idProfesor,
    idCanchero,
    colorProfesor
  } = req.body;

  if (dia == "domingo"){
    objHorario.horario[indice].domingo.profesor = profesor,
    objHorario.horario[indice].domingo.canchero = canchero,
    objHorario.horario[indice].domingo.idProfesor = idProfesor,
    objHorario.horario[indice].domingo.idCanchero = idCanchero,
    objHorario.horario[indice].domingo.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "lunes"){
    objHorario.horario[indice].lunes.profesor = profesor,
    objHorario.horario[indice].lunes.canchero = canchero,
    objHorario.horario[indice].lunes.idProfesor = idProfesor,
    objHorario.horario[indice].lunes.idCanchero = idCanchero,
    objHorario.horario[indice].lunes.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "martes"){
    objHorario.horario[indice].martes.profesor = profesor,
    objHorario.horario[indice].martes.canchero = canchero,
    objHorario.horario[indice].martes.idProfesor = idProfesor,
    objHorario.horario[indice].martes.idCanchero = idCanchero,
    objHorario.horario[indice].martes.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "miercoles"){
    objHorario.horario[indice].miercoles.profesor = profesor,
    objHorario.horario[indice].miercoles.canchero = canchero,
    objHorario.horario[indice].miercoles.idProfesor = idProfesor,
    objHorario.horario[indice].miercoles.idCanchero = idCanchero,
    objHorario.horario[indice].miercoles.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "jueves"){
    objHorario.horario[indice].jueves.profesor = profesor,
    objHorario.horario[indice].jueves.canchero = canchero,
    objHorario.horario[indice].jueves.idProfesor = idProfesor,
    objHorario.horario[indice].jueves.idCanchero = idCanchero,
    objHorario.horario[indice].jueves.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "viernes"){
    objHorario.horario[indice].viernes.profesor = profesor,
    objHorario.horario[indice].viernes.canchero = canchero,
    objHorario.horario[indice].viernes.idProfesor = idProfesor,
    objHorario.horario[indice].viernes.idCanchero = idCanchero,
    objHorario.horario[indice].viernes.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  if (dia == "sabado"){
    objHorario.horario[indice].sabado.profesor = profesor,
    objHorario.horario[indice].sabado.canchero = canchero,
    objHorario.horario[indice].sabado.idProfesor = idProfesor,
    objHorario.horario[indice].sabado.idCanchero = idCanchero,
    objHorario.horario[indice].sabado.colorProfesor = colorProfesor,
    horario = objHorario.horario
    try {
      await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
    } catch (error) {
      console.log(error)
      res.json(error.message);
    }
  }

  res.json({ horario });
};



horarioCtrl.editarGranDemanda = async (req, res) => {
  console.log(req.params.id, req.body);
  const objHorario = await Horario.findById(req.params.id); 
  const {
    indice,
    granDemanda
  } = req.body;
  objHorario.horario[indice].granDemanda = granDemanda
  horario = objHorario.horario
  await Horario.findOneAndUpdate({ _id: req.params.id }, { horario });
  res.json({ message: "Horario actualizado" });
};
module.exports = horarioCtrl;
