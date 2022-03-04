const horarioCtrl = {};
const Horario = require("../models/horario");

horarioCtrl.getHorarios = async (req, res) => {
  const horario = await Horario.find(); //
  res.json(horario);
};
horarioCtrl.createHorario = async (req, res) => {
  // const {
  //   horario: [
  //     {
  //       properties: {
  //         indice,
  //         franja,
  //         lugar,
  //         fechaInicio,
  //         dia: {
  //           properties: {
  //             fecha,
  //             turno,
  //             autor1,
  //             autor2,
  //             autor3,
  //             autor4,
  //             horaSolicitud,
  //             solicita,
  //             asistio,
  //             profesor,
  //             canchero
  //           }
  //         },
  //       }
  //     }
  //   ]
  // } = req.body;

  // const nuevoHorario = new Horario({
  //   horario
  // });
  console.log(req.body)
  console.log("horario")
  console.log(req.body.Horario)
  const {
    horario
  } = req.body;
  const nuevoHorario = new Horario({
    horario
  });
+  console.log(horario)
+  console.log(nuevoHorario)
  // console.log(nuevoHorario)
   await nuevoHorario.save();

  res.json({ message: "nuevoHorario" });
};

horarioCtrl.getHorario = async (req, res) => {
  const horario = await Horario.findById(req.params.id);
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

module.exports = horarioCtrl;
