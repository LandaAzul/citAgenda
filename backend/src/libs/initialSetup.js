const crtRole = {};
const Role = require("../models/Role");
const Empresa = require("../models/empresa");
const User = require("../models/User");
const mongoose = require('mongoose');


crtRole.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return "existe";

    const values = await Promise.all([
      //new Role({ name: "user" }).save(),
      //new Role({ name: "moderador" }).save(),
      //new Role({ name: "admin" }).save(),
      new Role({ name: "Administrador" }).save(),
      new Role({ name: "Canchero" }).save(),
      new Role({ name: "Profesor" }).save(),
      new Role({ name: "Socio" }).save(),
      console.log("creados los roles")
    ]);
    //console.log(values);
  } catch (error) {
    console.log(error);
  }
};

crtRole.usersDefault = async () => {
  try {
    let userDef = require("./usuariosDefault.json");
    //este for separa por elementos y les encripta la contraseña
    for (let i = 0; i < userDef.length; i++) {
    const newUser = new User( userDef[i]);
    newUser.contra = await newUser.cifrarPass(newUser.contra);
    userDef[i]=newUser;
    }
    //verificamos que la collecion user este vacia
    const count = await User.estimatedDocumentCount();
    //si esta vacia, insertamos los elementos
    if (count > 0) return "existe";
    const values = await Promise.all([
      //console.log(userDef),
      User.insertMany(userDef),
      console.log("creados los usuarios por defecto")

  ]);
  } catch (error) {
    console.log(error);
  }
}
module.exports = crtRole;
