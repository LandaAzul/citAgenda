const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const config = require('../config'); 
const Role = require('../models/Role'); 


module.exports.verifyToken = async (req, res, next) => {
     //const token = req.headers['x-access-token'];
     try {
     const token = req.headers["x-access-token"];
     console.log(token)
     //console.log('token')
     if (!token) {
     return res.status(403).json({ 
         message: "No token provided" 
        });}
        
            const decoded = jwt.verify(token, config.SECRET);
            req.userId = decoded.id;
        
            const user = await User.findById(req.userId, { password: 0 });
            if (!user) return res.status(404).json({ message: "No user found" });
        
            next();
          } catch (error) {
            return res.status(401).json({ message: "Unauthorized!" });
          }
        };

module.exports.isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in :user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if(roles[i].name === 'moderador'){
      next()
      return;
    }
  }
  return res.status(403).json({ message: "Requiere el rol de moderador"})
}

module.exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in :user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if(roles[i].name === 'admin'){
      next()
      return;
    }
  }
  return res.status(403).json({ message: "Requiere el rol de Admin"})
}

// module.exports = authJwtCtrl;