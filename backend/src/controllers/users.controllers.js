const usersCtrl = {};

usersCtrl.getUsers = (req, res) => res.json({message: []})

usersCtrl.createUser = (req, res) => res.json({message: 'nota guardada'});

usersCtrl.getUser = (req, res) => res.json({title: 'dasdawd'})

usersCtrl.updateUser = (req, res) => res.json({message: 'usuario actualizado'})

usersCtrl.deleteUser = (req, res) => res.json({message: 'usuario eliminado'})


module.exports = usersCtrl;