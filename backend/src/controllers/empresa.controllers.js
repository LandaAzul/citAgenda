const empresasCtrl = {};

const Empresa = require("../models/empresa");


empresasCtrl.getEmpresas = async (req, res) => {
  const empresas = await Empresa.find(); //
  res.json(empresas);
};
empresasCtrl.createEmpresa = async (req, res) => {
  const {
    title,
    descripcion,
    administrador,
    imagen,
    telefono1,
    telefono2,
    telefono3,
    logo,
    direccion,
    email,
    facebook,
    instagram,
    whatsapp,
    twitter,
    linkedin,
    youtube,
  } = req.body;
  const nuevaEmpresa = new Empresa({
    title,
    descripcion,
    administrador,
    imagen,
    telefono1,
    telefono2,
    telefono3,
    logo,
    direccion,
    email,
    facebook,
    instagram,
    whatsapp,
    twitter,
    linkedin,
    youtube,
  });
  await nuevaEmpresa.save();
  console.log(nuevaEmpresa);
  //res.json({message:nuevaCita});
  res.json({ message: "empresa guardada" });
};

empresasCtrl.getEmpresa = async (req, res) => {
  const empresa = await Empresa.findById(req.params.id);
  res.json({ message: empresa });
};
empresasCtrl.updateEmpresa = async (req, res) => {
  console.log(req.params.id, req.body);
  const {
    title,
    descripcion,
    administrador,
    imagen,
    telefono1,
    telefono2,
    telefono3,
    logo,
    direccion,
    email,
    facebook,
    instagram,
    whatsapp,
    twitter,
    linkedin,
    youtube,
  } = req.body;
  await Empresa.findOneAndUpdate({ _id: req.params.id }, {
    title,
    descripcion,
    administrador,
    imagen,
    telefono1,
    telefono2,
    telefono3,
    logo,
    direccion,
    email,
    facebook,
    instagram,
    whatsapp,
    twitter,
    linkedin,
    youtube,
  });
  res.json({ message: "empresa actualizado" });
};

empresasCtrl.deleteEmpresa = async (req, res) => {
  const empresa = await Empresa.findByIdAndDelete(req.params.id);
  res.json({ title: "Empresa eliminada" });
};

empresasCtrl.uploadImagesEmpresa = async (req, res) => {
    console.log("archivo")
    console.log(req.file);
    res.json({ title: "Imagen subida" });
};


module.exports = empresasCtrl;
