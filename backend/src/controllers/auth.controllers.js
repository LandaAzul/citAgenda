const authCtrl = {};
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Role = require("../models/Role");

//registrarse
authCtrl.singUp = async (req, res) => {
  try {
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
      roles,
    } = req.body;

    //en la carpeta libs se valida si existe el usuario
    //const userFound = User.find({email})
    const newUser = new User({
      nombre,
      celular,
      //contra: User.cifrarPass(contra),
      contra,
      email,
      codigo,
      documento,
      activo,
      idFamiliares,
      tipo,
      roles,
    });
    newUser.contra = await newUser.cifrarPass(newUser.contra);

    //busca los roles que se ingresan
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      //si no se ingreso ningun rol, asigna el rol user por defecto
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(newUser);

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 60 * 60, //una hora
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//logearse
authCtrl.singIn = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "No se encontró el correo ingresado" });

    const matchPassword = await User.comparePassword(
      req.body.contra,
      userFound.contra
    );
    console.log(req.body.contra);
    console.log(userFound.contra);
    console.log(matchPassword);
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Contraseña incorrecta",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token, userFound });
  } catch (error) {
    console.log(error);
  }
};
module.exports = authCtrl;
