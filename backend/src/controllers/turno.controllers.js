const turnoCtrl = {};
const Turno = require("../models/Turno");

turnoCtrl.getTurnos = async (req, res) => {
  const turno = await Turno.find(); //
  res.json(turno);
};
turnoCtrl.createTurno = async (req, res) => {
  const {
    Título,
    Dia,
    Franja,
    Tipo,
    Titular,
    Invitado1,
    Invitado2,
    Invitado3,
  } = req.body;
  const nuevoTurno = new Turno({
    Título,
    Dia,
    Franja,
    Tipo,
    Titular,
    Invitado1,
    Invitado2,
    Invitado3,
  });
  await nuevoTurno.save();
  //console.log(nuevoTurno)
  //res.json({message:nuevaCita});
  res.json({ message: "turno guardado" });
};

turnoCtrl.getTurno = async (req, res) => {
  const turno = await Turno.findById(req.params.id);
  res.json({ message: turno });
};
turnoCtrl.updateTurno = async (req, res) => {
  console.log(req.params.id, req.body);
  const {
    Título,
    Dia,
    Franja,
    Tipo,
    Titular,
    Invitado1,
    Invitado2,
    Invitado3,
  } = req.body;
  await Turno.findOneAndUpdate({ _id: req.params.id }, {
    Título,
    Dia,
    Franja,
    Tipo,
    Titular,
    Invitado1,
    Invitado2,
    Invitado3,
  });
  res.json({ message: "turno actualizado" });
};

turnoCtrl.deleteTurno = async (req, res) => {
  const turno = await Turno.findByIdAndDelete(req.params.id);
  res.json({ title: "Turno eliminado" });
};

module.exports = turnoCtrl;
