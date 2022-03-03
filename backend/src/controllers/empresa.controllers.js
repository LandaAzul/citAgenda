const empresasCtrl = {};
const fs = require("fs");
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
    solNombre: "false",
    solDocumento: "false",
    solCodigo: "false",
    solDireccion: "false",
    solTelefono: "false",
    solTelefono2: "false",
    solEmail: "false",
    solIdFamiliar: "false",
    solImagen: "false",
    editNombre: "false",
    editDocumento: "false",
    editCodigo: "false",
    editDireccion: "false",
    editTelefono: "false",
    editTelefono2: "false",
    editEmail: "false",
    editIdFamiliar: "false",
    editImagen: "false",
    presentacion: "false",
    encabezado: "false",
    clima: "false"
    
  });
  await nuevaEmpresa.save();
  console.log(nuevaEmpresa);
  //res.json({message:nuevaCita});
  res.json({ message: "empresa guardada" });
};

empresasCtrl.getEmpresa = async (req, res) => {
  const empresaFound = await Empresa.findOne({ _id: req.params.id });
  if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
  const empresa = await Empresa.findById(req.params.id);
  res.json({ message: empresa });
};
empresasCtrl.updateEmpresa = async (req, res) => {
  const empresaFound = await Empresa.findOne({ _id: req.params.id });
  if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
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
    presentacion,
    encabezado,
    clima
  } = req.body;
  await Empresa.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
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
      presentacion,
      encabezado,
      clima
    }
  });
  res.json({ message: "empresa actualizado" });
};

empresasCtrl.updateEmpresaForm = async (req, res) => {
  const empresaFound = await Empresa.findOne({ _id: req.params.id });
  if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
  console.log(req.params.id, req.body);
  const {
    solNombre,
    solDocumento,
    solCodigo,
    solDireccion,
    solTelefono,
    solTelefono2,
    solEmail,
    solIdFamiliar,
    solImagen,
    editNombre,
    editDocumento,
    editCodigo,
    editDireccion,
    editTelefono,
    editTelefono2,
    editEmail,
    editIdFamiliar,
    editImagen,
  } = req.body;
  await Empresa.findOneAndUpdate({ _id: req.params.id  }, {
    $set: {
      solNombre,
      solDocumento,
      solCodigo,
      solDireccion,
      solTelefono,
      solTelefono2,
      solEmail,
      solIdFamiliar,
      solImagen,
      editNombre,
      editDocumento,
      editCodigo,
      editDireccion,
      editTelefono,
      editTelefono2,
      editEmail,
      editIdFamiliar,
      editImagen
    }
  });
  res.json({ message: "el formulario de empresa actualizado" });
};
empresasCtrl.deleteEmpresa = async (req, res) => {
  const empresaFound = await Empresa.findOne({ _id: req.params.id });
  if (!empresaFound) return res.status(400).json({ message: "No se encontró la empresa especificada" });
  const empresa = await Empresa.findByIdAndDelete(req.params.id);
  res.json({ title: "Empresa eliminada" });
};

empresasCtrl.uploadImgEmpresa = async (req, res) => {
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

empresasCtrl.showImgEmpresa = async (req, res) => {
  try {
    const imgEmpresas = await ImgEmp.find(); //
  res.json(imgEmpresas);
  } catch (error) {
    console.log(error)
    res.json(error.message);
  }
};

empresasCtrl.deleteImgEmpresa = async (req, res) => {
  const imgFound = await ImgEmp.findOne({ _id: req.params.id });
    if (!imgFound) return res.status(400).json({ message: "No se encontró la imagen especificada" });
    if (imgFound.imagen == null) {
      console.log("no tiene imagen en bd")
      res.status(400).json({ message: "No tiene imagen para eliminar" });
    } else {
      //se elimina la imagen del directorio en el servidor
      imagenOld = imgFound.imagen
      console.log(imagenOld)
        //se acota el link, obteniendo solo el archivo que es el old
      old = imagenOld.slice(35);
      console.log(old)
        //se agrega la ruta y se rectifica que exista el archivo y luego se elimina
      if (fs.existsSync('./src/public/ImagesEmpresa/' + old)) {
        fs.unlinkSync('./src/public/ImagesEmpresa/' + old)
        console.log("imagen eliminada")
      }
        res.status(200).json({ message: "imagen eliminada" });
        //}
    }
    const empresa = await ImgEmp.findByIdAndDelete(req.params.id);
};

empresasCtrl.editVerImgEmpresa = async (req, res) => {
  const empresaImgFound = await ImgEmp.findOne({ _id: req.params.id });
  if (!empresaImgFound) return res.status(400).json({ message: "No se encontró la imagen de empresa especificada" });
  const { ver } = req.body;
  await ImgEmp.findOneAndUpdate({ _id: req.params.id }, { $set: { ver }});
  res.json({ message: "ver imagen actualizado" });
};

empresasCtrl.editPresentarImgEmpresa = async (req, res) => {
  const empresaImgFound = await ImgEmp.findOne({ _id: req.params.id });
  if (!empresaImgFound) return res.status(400).json({ message: "No se encontró la imagen de empresa especificada" });
  const { presentar } = req.body;
  await ImgEmp.findOneAndUpdate({ _id: req.params.id }, { $set: { presentar } });
  res.json({ message: "presentar imagen actualizado" });
};

module.exports = empresasCtrl;
