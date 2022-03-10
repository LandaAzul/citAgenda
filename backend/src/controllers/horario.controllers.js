const horarioCtrl = {};
const Horario = require("../models/horario");

horarioCtrl.getHorarios = async (req, res) => {
  const horario = await Horario.find(); 
  res.json(horario);
};
horarioCtrl.createHorario = async (req, res) => {
  const {
    horario
  } = req.body;
  const nuevoHorario = new Horario({
    horario
  });
+  console.log(horario)
+  console.log(nuevoHorario)
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
    horario
  } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, {
    horario
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

horarioCtrl.solicitudHorario = async (req, res) => {
  console.log(req.params.id, req.body);
  // const {
  //   horario
  // } = req.body;
  // await Horario.findOneAndUpdate({ _id: req.params.id }, {
  //   horario
  // });
  // console.log(horario)
   console.log("datos recibidos")
  res.json({ message: "datos recibidos" });
};

module.exports = horarioCtrl;
