const turnoCtrl = {};
const Turno = require("../models/Turno");

turnoCtrl.getTurnos = async (req, res) => {
  const turno = await Turno.find(); //
  res.json(turno);
};
turnoCtrl.createTurno = async (req, res) => {
  const {
    titulo,
    dia,
    indice,
    solicita,
    autor1,
    codigo,
    autor2,
    autor3,
    autor4,
    horaSolicitud,
  } = req.body;
  const nuevoTurno = new Turno({
    titulo,
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
    titulo,
    dia,
    indice,
    solicita,
    autor1,
    codigo,
    autor2,
    autor3,
    autor4,
    horaSolicitud,
  } = req.body;
  await Turno.findOneAndUpdate({ _id: req.params.id }, {
    titulo,
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
  res.json({ message: "turno actualizado" });
};

turnoCtrl.deleteTurno = async (req, res) => {
  const turno = await Turno.findByIdAndDelete(req.params.id);
  res.json({ title: "Turno eliminado" });
};

module.exports = turnoCtrl;
