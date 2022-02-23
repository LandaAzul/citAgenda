const usersCtrl = {};
const Role = require("../models/Role");
const User = require("../models/User");
const fs = require("fs");
const path = require('path')
usersCtrl.getUsers = async (req, res) => {
  const users = await User.find().populate("rol");
  res.json(users);
  //console.log(users);
};

usersCtrl.createUser = async (req, res) => {
  const {
    nombre,
    celular,
    contra,
    email,
    imagen,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  } = req.body;
  const newUser = new User({
    nombre,
    celular,
    contra,
    email,
    imagen: null,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  });
  const verificaEmail = await User.findOne({ email: req.body.email })
  if (verificaEmail) return res.status(400).json({ message: "El email ya se encuentra registrado" });
  const verificaCodigo = await User.findOne({ codigo: req.body.codigo })
  if (verificaCodigo) return res.status(400).json({ message: "El codigo ya se encuentra registrado" });
  const verificaDocumento = await User.findOne({ documento: req.body.documento })
  if (verificaDocumento) return res.status(400).json({ message: "El documento ya se encuentra registrado" });

  if (rol) {
    //const foundRoles = await Role.find({ name: { $in: rol } });
    const foundRoles = await Role.find({ name: rol });
    newUser.rol = foundRoles.map((role) => role._id);
  } else {
    //si no se ingreso ningun rol, asigna el rol user por defecto
    const role = await Role.findOne({ name: "Socio" });
    newUser.rol = role._id;
    console.log("rol nuevo no encontrado, se asigna socio por defecto");
  }
  newUser.contra = await newUser.cifrarPass(newUser.contra);
  console.log(newUser)
  await newUser.save();
  res.json({ message: "True" });
};
//id
usersCtrl.getUserId = async (req, res) => {
  const user = await User.findById(req.params.id).populate("rol");
  console.log(user); //mostrar por consola
  res.json({ message: user });
  //res.json(user);
};
usersCtrl.updateUserId = async (req, res) => {
  console.log(req.params.id, req.body);
  const {
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  } = req.body;

  //restricciones
  // const verificaEmail = await User.findOne({ email: req.body.email })
  // if (verificaEmail) return res.status(400).json({ message: "El email ya se encuentra registrado" });
  // const verificaCodigo = await User.findOne({ codigo: req.body.codigo })
  // if (verificaCodigo) return res.status(400).json({ message: "El codigo ya se encuentra registrado" });
  // const verificaDocumento = await User.findOne({ documento: req.body.documento })
  // if (verificaDocumento) return res.status(400).json({ message: "El documento ya se encuentra registrado" });

  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  });
  console.log(updateUser);
  if (rol) {
    //const foundRoles = await Role.find({ name: { $in: rol } });
    const foundRoles = await Role.find({ name: rol });
    updateUser.rol = foundRoles.map((role) => role._id);
  } else {
    //si no se ingreso ningun rol, asigna el rol user por defecto
    const role = await Role.findOne({ name: "Socio" });
    updateUser.rol = role._id;
    console.log("rol nuevo no encontrado, se asigna socio por defecto");
  }
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        nombre,
        celular,
        email,
        codigo,
        documento,
        activo,
        grupoFamiliar,
        telefono2,
        direccion,
        rol: updateUser.rol
      }
    }
  );

  res.json({ message: "usuario actualizado" });
};

usersCtrl.deleteUserId = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "usuario eliminado" });
};
//para documento
usersCtrl.getUserDocumento = async (req, res) => {
  const user = await User.find({ documento: req.params.documento }).populate("rol");
  res.json({ message: user });
};
usersCtrl.updateUserDocumento = async (req, res) => {
  console.log({ documento: req.params.documento }, req.body);
  const {
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  } = req.body;

  //restricciones
  // const verificaEmail = await User.findOne({ email: req.body.email })
  // if (verificaEmail) return res.status(400).json({ message: "El email ya se encuentra registrado" });
  // const verificaCodigo = await User.findOne({ codigo: req.body.codigo })
  // if (verificaCodigo) return res.status(400).json({ message: "El codigo ya se encuentra registrado" });
  // const verificaDocumento = await User.findOne({ documento: req.body.documento })
  // if (verificaDocumento) return res.status(400).json({ message: "El documento ya se encuentra registrado" });

  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  });
  console.log(updateUser);
  if (rol) {
    //const foundRoles = await Role.find({ name: { $in: rol } });
    const foundRoles = await Role.find({ name: rol });
    updateUser.rol = foundRoles.map((role) => role._id);
  } else {
    //si no se ingreso ningun rol, asigna el rol user por defecto
    const role = await Role.findOne({ name: "Socio" });
    updateUser.rol = role._id;
    console.log("rol nuevo no encontrado, se asigna socio por defecto");
  }
  await User.findOneAndUpdate(
    { documento: req.params.documento },
    {
      $set: {
        nombre,
        celular,
        email,
        codigo,
        documento,
        activo,
        grupoFamiliar,
        telefono2,
        direccion,
        rol: updateUser.rol
      }
    }
  );
  res.json({ message: "usuario actualizado" });
};

usersCtrl.deleteUserDocumento = async (req, res) => {
  await User.findOneAndDelete({ documento: req.params.documento });
  res.json({ message: "usuario eliminado" });
};

//para el codigo
usersCtrl.getUserCodigo = async (req, res) => {
  const user = await User.find({ codigo: req.params.codigo }).populate("rol");
  res.json({ message: user });
};
usersCtrl.updateUserCodigo = async (req, res) => {
  console.log({ codigo: req.params.codigo }, req.body);
  const {
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol,
  } = req.body;

  //restricciones
  // const verificaEmail = await User.findOne({ email: req.body.email })
  // if (verificaEmail) return res.status(400).json({ message: "El email ya se encuentra registrado" });
  // const verificaCodigo = await User.findOne({ codigo: req.body.codigo })
  // if (verificaCodigo) return res.status(400).json({ message: "El codigo ya se encuentra registrado" });
  // const verificaDocumento = await User.findOne({ documento: req.body.documento })
  // if (verificaDocumento) return res.status(400).json({ message: "El documento ya se encuentra registrado" });

  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    telefono2,
    direccion,
    rol
  });
  console.log(updateUser);
  if (rol) {
    //const foundRoles = await Role.find({ name: { $in: rol } });
    const foundRoles = await Role.find({ name: rol });
    updateUser.rol = foundRoles.map((role) => role._id);
  } else {
    //si no se ingreso ningun rol, asigna el rol user por defecto
    const role = await Role.findOne({ name: "Socio" });
    updateUser.rol = role._id;
    console.log("rol nuevo no encontrado, se asigna socio por defecto");
  }
  await User.findOneAndUpdate(
    { codigo: req.params.codigo },
    {
      $set: {
        nombre,
        celular,
        email,
        codigo,
        documento,
        activo,
        grupoFamiliar,
        telefono2,
        direccion,
        rol: updateUser.rol
      }
    }
  );
  res.json({ message: "usuario actualizado" });
};
usersCtrl.deleteUsercodigo = async (req, res) => {
  await User.findOneAndDelete({ codigo: req.params.codigo });
  res.json({ message: "usuario eliminado" });
};

//contraseña

usersCtrl.updatePass = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ _id: req.params.id });
    if (!userFound) return res.status(400).json({ message: "No se encontró el usuario especificado" });
    const matchPassword = await User.comparePassword(
      req.body.contraAntigua,
      userFound.contra,
    );
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Las contraseñas no coinciden",
      });
    const updateUser = new User({
      contra: req.body.contraNueva
    });
    updateUser.contra = await updateUser.cifrarPass(updateUser.contra);
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { contra: updateUser.contra } }
    );
    res.json({ message: "contraseña actualizada" });

  } catch (error) {
    console.log(error);
  }
};

//datos
usersCtrl.updateDataUserId = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const {
      nombre,
      celular,
      email,
      codigo,
      telefono2,
      direccion,
      documento
      //,
      //grupoFamiliar
    } = req.body;
    const updateUser = new User({
      nombre,
      celular,
      email,
      codigo,
      telefono2,
      direccion,
      documento
      //,
      //grupoFamiliar
    });
    console.log(updateUser);
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          //updateUser
          nombre: updateUser.nombre,
          celular: updateUser.celular,
          email: updateUser.email,
          codigo: updateUser.codigo,
          telefono2: updateUser.telefono2,
          direccion: updateUser.direccion,
          documento: updateUser.documento
        }
      }
    );
    res.json({ message: "usuario actualizado" });

  } catch (error) {
    console.log(error)
  }
};
//imagen

usersCtrl.updateImagenUserId = async (req, res) => {
  try {
    const userFound = await User.findOne({ _id: req.params.id });
    //Primero se verifica que tenga imagen guardada, de ser asi se elimina
    if (userFound.imagen == null) {
      console.log("no tiene imagen en bd")
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: "Debe enviar una imagen para poder cambiar la antigua" });
      } else {
        imagenOld = userFound.imagen
        //se acota el link, obteniendo solo el archivo que es el old
        old = imagenOld.slice(29);
        //se agrega la ruta y se rectifica que exista el archivo y luego se elimina
        if (fs.existsSync('./src/public/ImagesUser/' + old)) {
          fs.unlinkSync('./src/public/ImagesUser/' + old)
          console.log("imagen antigua eliminada")
        }
      }
    }
    //ahora se guarda la nueva imagen
    tipoImg = req.file.mimetype.slice(6)
      fs.renameSync(req.file.path, req.file.path + '.' + tipoImg);
    const {
      imagen
    } = req.body;
    const updateUser = new User({
      imagen
    });
    //se cambia el nombre de la nueva imagen

    if (req.file) {
      const { filename } = req.file
      tipoImg = req.file.mimetype.slice(6)
      updateUser.setImagen(filename + '.' + tipoImg)
    }
    //se cambia el link por la nueva imagen en la collecion del usuario
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          imagen: updateUser.imagen
        }
      }
    );
    res.json({ message: "imagen actualizada" });
  } catch (error) {
    console.log(error);
  }

};
usersCtrl.deleteImagenUserId = async (req, res) => {
  try {
    const userFound = await User.findOne({ _id: req.params.id });
    if (userFound.imagen == null) {
      console.log("no tiene imagen en bd")
      res.status(400).json({ message: "No tiene imagen para eliminar" });
    } else {
      //se elimina la imagen del directorio en el servidor
      imagenOld = userFound.imagen
        //se acota el link, obteniendo solo el archivo que es el old
      old = imagenOld.slice(29);
        //se agrega la ruta y se rectifica que exista el archivo y luego se elimina
      if (fs.existsSync('./backend/src/public/ImagesUser/' + old)) {
        fs.unlinkSync('./backend/src/public/ImagesUser/' + old)
        console.log("imagen antigua eliminada")
      }
      //if (req.file == undefined) {
        //en la bd se cambia el string de imagen a null
        await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              imagen: null
            }
          }
        );
        res.status(200).json({ message: "imagen eliminada" });
        //}
      }
  } catch (error) {
    console.log(error);
  }

};
//para que el usuario se elimine asi mismo
usersCtrl.deleteUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ _id: req.params.id });
    if (!userFound) return res.status(400).json({ message: "No se encontró el usuario especificado" });
    const matchPassword = await User.comparePassword(
      req.body.contraAntigua,
      userFound.contra,
    );
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Las contraseñas no coinciden",
      });
    const updateUser = new User({
      contra: req.body.contraNueva
    });
    updateUser.contra = await updateUser.cifrarPass(updateUser.contra);
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { contra: updateUser.contra } }
    );
    res.json({ message: "contraseña actualizada" });

  } catch (error) {
    console.log(error);
  }
};

module.exports = usersCtrl;
