const usersCtrl = {};

const User = require("../models/User");

usersCtrl.getUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  res.json(users);
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
    idFamiliares,
    tipo,
  } = req.body;
  const newUser = new User({
    nombre,
    celular,
    contra,
    email,
    codigo,
    documento,
    activo,
    idFamiliares,
    tipo,
  });

  await newUser.save();
  res.json({ message: "True" });
};
//id
usersCtrl.getUserId = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user); //mostrar por consola
  //res.json({message:user})
  res.json({ message: user });
};
usersCtrl.updateUserId = async (req, res) => {
  console.log(req.params.id, req.body);
  const {
    nombre,
    celular,
    contra,
    email,
    codigo,
    documento,
    activo,
    idFamiliares,
    tipo,
  } = req.body;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      nombre,
      celular,
      contra,
      email,
      codigo,
      documento,
      activo,
      idFamiliares,
      tipo,
    }
  );
  // console.log({
  //   nombre,
  //   celular,
  //   contra,
  //   email,
  //   codigo,
  //   documento,
  //   activo,
  //   idFamiliares,
  //   tipo,
  // }); //mostrar por consola
  res.json({ message: "usuario actualizado" });
};

usersCtrl.deleteUserId = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "usuario eliminado" });
};
//para documento
usersCtrl.getUserDocumento = async (req, res) => {
  const user = await User.find({ documento: req.params.documento });
  res.json({ message: user });
};
usersCtrl.updateUserDocumento = async (req, res) => {
  console.log({ documento: req.params.documento }, req.body);
  const {
    nombre,
    celular,
    contra,
    email,
    codigo,
    documento,
    activo,
    idFamiliares,
    tipo,
  } = req.body;
  await User.findOneAndUpdate(
    { documento: req.params.documento },
    {
      nombre,
      celular,
      contra,
      email,
      codigo,
      documento,
      activo,
      idFamiliares,
      tipo,
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
  const user = await User.find({ codigo: req.params.codigo });
  res.json({ message: user });
};
usersCtrl.updateUserCodigo = async (req, res) => {
  console.log({ codigo: req.params.codigo }, req.body);
  const {
    nombre,
    celular,
    contra,
    email,
    codigo,
    documento,
    activo,
    idFamiliares,
    tipo,
  } = req.body;
  await User.findOneAndUpdate(
    { codigo: req.params.codigo },
    {
      nombre,
      celular,
      contra,
      email,
      codigo,
      documento,
      activo,
      idFamiliares,
      tipo,
    }
  );
  res.json({ message: "usuario actualizado" });
};
usersCtrl.deleteUsercodigo = async (req, res) => {
  await User.findOneAndDelete({ codigo: req.params.codigo });
  res.json({ message: "usuario eliminado" });
};

module.exports = usersCtrl;
