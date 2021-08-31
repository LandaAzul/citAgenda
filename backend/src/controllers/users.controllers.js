const usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


usersCtrl.createUser = async (req, res) => {
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json({message: 'usuario guardado'});
}

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({message:user})
}

usersCtrl.updateUser = async (req, res) => {
    console.log(req.params.id, req.body)
    const {username}= req.body;
    await User.findOneAndUpdate(req.params.id, {
        username
    });
    res.json({message: 'usuario actualizado'})
}

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'usuario eliminado'})
}


module.exports = usersCtrl;