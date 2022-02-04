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
      imagen,
      codigo,
      documento,
      grupoFamiliar,
      tipo,
      rol,
    } = req.body;

    //en la carpeta libs se valida si existe el usuario
    //const userFound = User.find({email})
    const newUser = new User({
      nombre,
      celular,
      contra,
      email,
      imagen,
      codigo,
      documento,
      activo:"false",
      grupoFamiliar,
      tipo,
      rol,
    });
    newUser.contra = await newUser.cifrarPass(newUser.contra);

    //busca los roles que se ingresan
    if (rol) {
      const foundRoles = await Role.find({ name: { $in: rol } });
      newUser.rol = foundRoles.map((role) => role._id);
    } else {
      //si no se ingreso ningun rol, asigna el rol user por defecto
      const role = await Role.findOne({ name: "Socio" });
      newUser.rol = [role._id];
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
      "rol"
    );

    if (!userFound) return res.status(400).json({ message: "No se encontró el correo ingresado" });

    const matchPassword = await User.comparePassword(
      req.body.contra,
      userFound.contra
    );
    //console.log(req.body.contra);
    //console.log(userFound.contra);
    //console.log(matchPassword);
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

authCtrl.forgotPassword = async (req, res) => {
  const {email} =req.body;
  if (!(email)) {
    return res.status(400).json({message: "el email es requerido"});
  }
  
  const message = "Revisa tu correo electronico para cambiar tu contraseña";
  let verificationLink;
  let emailStatus = "OK";
  
  try {
    const userFound = await User.findOne({ email: req.body.email});
    console.log(userFound)
    if (!userFound) return res.status(400).json({ message: "No se encontró el correo ingresado" });
    console.log("email encontrado")

    const token = jwt.sign({id: userFound._id, email : userFound.email}, config.SECRET, {expiresIn: '10m'});
    verificationLink = 'http://localhost:3000/new-password/${token}';
    userFound.resetToken = token;

    console.log("email no encontrado")

  //TODO: sendEmail
    await userFound.save();
  } catch (error) {
    emailStatus = error;
    console.log(error)
    return res.status(400).json({ message: "algo no ha ido bien"});
    
  }
  res.json({ message, info: emailStatus});
}


authCtrl.newPassword = async (req, res) => {
  const{newPassword} = req.body;
  const resetToken = req.headers.reset;

  if(!(resetToken && newPassword)){
    res.status(400).json({message: "todos los campos son requeridos"});
  }
  let jwtpayload;
  let user;
  try {
    jwtpayload = jwt.verify(resetToken, config.jwtSecretReset);
    const userFound = await User.findOneOrFail({ email: req.body.email }).populate(
      "rol"
    );
  } catch (error) {
    return res.status(401).json({ message: "algo no ha ido bien en guardar"});
  }
  user.pass = newPassword;
  try {
    user.hashPassword();
    await user.save();
  } catch (error) {
    return res.status(401).json({message: "algo no se guardo"})
  }
  res.json({message: "contraseña actualizada"})
}
module.exports = authCtrl;
