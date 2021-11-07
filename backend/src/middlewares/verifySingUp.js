
//hace la confirmacion
//const {ROLES} = require('../models/Role')
const User = require('../models/User');
const ROLES = ["user","admin","moderador"]
module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({nombre: req.body.nombre})

    if (user) return res.status(400).json ({message: 'el usuario ya existe'})

    const email = await User.findOne({email: req.body.email})

    if (email) return res.status(400).json ({message: 'el email ya existe'})

    next();
}


module.exports.checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        console.log(req.body.roles)
        for (let i=0; i < req.body.roles.length; i++){
            //no se hara consulta por que son pocos roles
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Rol ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next();
}

