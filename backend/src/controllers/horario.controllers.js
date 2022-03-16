const horarioCtrl = {};
const Horario = require("../models/horario");
const Turno = require("../models/Turno");

horarioCtrl.getHorarios = async (req, res) => {
  const horario = await Horario.find(); 
  res.json(horario);
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
  const Objhorario = await Horario.findById(req.params.id); 
  const {
    dia,
    indice,
    autor1,
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
      Título: "SOLICITUD DE TURNO",
      Dia: dia,
      Indice: indice,
      Tipo: solicita,
      Titular: autor1,
      Invitado1: autor2,
      Invitado2: autor3,
      Invitado3: autor4,
      horaSolicitud: horaSolicitud,
    });
    await nuevoTurno.save();
    //console.log(nuevoTurno)
    //res.json({message:nuevaCita});
    res.json({ message: "turno guardado" });
  }
  if (solicita == "Clase"){
    console.log(solicita)
    console.log("solicita Clase")
  }

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
    idCanchero
  } = req.body;

  if (dia == "domingo"){
    objHorario.horario[indice].domingo.profesor = profesor,
    objHorario.horario[indice].domingo.canchero = canchero,
    objHorario.horario[indice].domingo.idProfesor = idProfesor,
    objHorario.horario[indice].domingo.idCanchero = idCanchero,
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
module.exports = horarioCtrl;
