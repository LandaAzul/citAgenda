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
  res.json({ message: horario });
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
  await Horario.findOneAndUpdate({ _id: req.params.id }, {
    horario,
    activo,
    regenerar,
    lugar,
    fechaInicio,
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
  // console.log(Objhorario)
  // console.log("horario en indice 1")
  // console.log(Objhorario.horario[1].miercoles)
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
  console.log("horario dinamico")
  console.log(indice)
  console.log(dia)
  console.dir(Objhorario.horario[indice])
  console.log("datos recibidos")
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


module.exports = horarioCtrl;
