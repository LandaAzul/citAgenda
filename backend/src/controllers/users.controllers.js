const usersCtrl = {};

const User = require('../models/User');
const jwt = require ('jsonwebtoken');
const config = require('../config'); 
usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


usersCtrl.createUser = async (req, res) => {
    const {username,cellphone,pass,email} = req.body;
    const newUser = new User({
        username,
        cellphone,
        pass,
        email
    });
    newUser.pass = await newUser.cifrarPass(newUser.pass);
    await newUser.save();
    //jwt.sign({id: newUser._id}, config.secret{
    //    expiresIn: 60*60 //una hora
    //})
    res.json({message: 'usuario guardado'});
}

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({message:user})
}

usersCtrl.updateUser = async (req, res) => {
    console.log(req.params.id, req.body)
    const {username,cellphone,pass,email}= req.body;
    await User.findOneAndUpdate(req.params.id, {
        username,
        cellphone,
        pass,
        email
    });
    res.json({message: 'usuario actualizado'})
}

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'usuario eliminado'})
}


module.exports = usersCtrl;