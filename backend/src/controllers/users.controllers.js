const usersCtrl = {};
const Role = require("../models/Role");
const User = require("../models/User");

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
    codigo,
    documento,
    activo,
    grupoFamiliar,
    rol
  } = req.body;
  const newUser = new User({
    nombre,
    celular,
    contra,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
    rol
  });
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
    rol
  } = req.body;
  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
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
    { $set: {
      nombre,
      celular,
      email,
      codigo,
      documento,
      activo,
      grupoFamiliar,
      rol: updateUser.rol
    }}
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
    rol
  } = req.body;
  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
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
    { $set: {
      nombre,
      celular,
      email,
      codigo,
      documento,
      activo,
      grupoFamiliar,
      rol: updateUser.rol
    }}
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
    rol,
  } = req.body;
  const updateUser = new User({
    nombre,
    celular,
    email,
    codigo,
    documento,
    activo,
    grupoFamiliar,
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
    console.log("rol nuevo no encontrado, se asigna socio por defecto");v
  }
  await User.findOneAndUpdate(
    { codigo: req.params.codigo },
    { $set: {
      nombre,
      celular,
      email,
      codigo,
      documento,
      activo,
      grupoFamiliar,
      rol: updateUser.rol
    }}
  );
  res.json({ message: "usuario actualizado" });
};
usersCtrl.deleteUsercodigo = async (req, res) => {
  await User.findOneAndDelete({ codigo: req.params.codigo });
  res.json({ message: "usuario eliminado" });
};

module.exports = usersCtrl;
