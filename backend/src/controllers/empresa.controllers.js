const empresasCtrl = {};

const Empresa = require("../models/empresa");
const ImgEmp = require("../models/ImgEmpresa");


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
  const imagenes = req.files
  res.json({ title: "Imagen subida" });
  for (let i = 0; i < req.files.length; i++) {
    const newImgEmp = new ImgEmp(req.files[i]);
    if (req.files[i]) {
      const { filename } = req.files[i]
      tipoImg = req.files[i].mimetype.slice(6)
      //newImgEmp.setImagen(filename + '.' + tipoImg)
      newImgEmp.setImagen(filename)
    }
    const verImgEmp = await ImgEmp.findOne({ imagen: newImgEmp.imagen });
    if(verImgEmp){
      console.log("la imagen ya esta en bd")
    } else {
      console.log("la imagen no esta en bd")
      const savedImgEmp = await newImgEmp.save();
      console.log(savedImgEmp)
    }
    
    
  }
  //res.status(200).json({ message: "imagenes guardadas con exito" });
};


module.exports = empresasCtrl;
