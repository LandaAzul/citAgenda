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
    ]);
    //console.log(values);
  } catch (error) {
    console.log(error);
  }
};



crtRole.usersDefault = async () => {
  try {
    let userDef = require("./usuariosDefault.json")
    //User.insertMany(userDef, function(error, docs) {})
    const count = await User.estimatedDocumentCount();
    
    if (count > 0) return "existe";
    //let userDef = require("./usuariosDefault.json")
    const values = await Promise.all([
      //console.log(userDef),
      User.insertMany(userDef)

  ]);
  } catch (error) {
    console.log(error);
  }
}
module.exports = crtRole;
