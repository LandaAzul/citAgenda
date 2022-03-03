const horarioCtrl = {};
const Horario = require("../models/horario");

horarioCtrl.getHorarios = async (req, res) => {
  const horario = await Horario.find(); //
  res.json(horario);
};
horarioCtrl.createHorario = async (req, res) => {
  const {
    horario
  } = req.body;
  const nuevoHorario = new Horario({
    horario
  });
  await nuevoHorario.save();

  res.json({ message: nuevoHorario });
};

horarioCtrl.getHorario = async (req, res) => {
  const horario = await Horario.findById(req.params.id);
  res.json({ message: horario });
};
horarioCtrl.updateHorario = async (req, res) => {
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
  await Horario.findOneAndUpdate({ _id: req.params.id }, {
    Título,
    Dia,
    Franja,
    Tipo,
    Titular,
    Invitado1,
    Invitado2,
    Invitado3,
  });
  res.json({ message: "Horario actualizado" });
};

horarioCtrl.deleteHorario = async (req, res) => {
  const horario = await Horario.findByIdAndDelete(req.params.id);
  res.json({ title: "horario eliminado" });
};

module.exports = horarioCtrl;