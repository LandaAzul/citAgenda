const empresasCtrl = {};

const Empresa = require('../models/empresa');

empresasCtrl.getEmpresas = async(req, res) => {
    const empresas = await Empresa.find();//
    res.json(empresas);
}
empresasCtrl.createEmpresa = async (req, res) => {
    const {title,descripcion,administrador,imagen,telefono,logo,direccion,email,RedesSociales} = req.body;
    const nuevaEmpresa = new Empresa ({
        title,
        descripcion,
        administrador,
        imagen,
        telefono,
        logo,
        direccion,
        email,
        RedesSociales
    });
    await nuevaEmpresa.save();
    console.log(nuevaEmpresa)
    //res.json({message:nuevaCita});
    res.json({message: 'empresa guardada'});
}

empresasCtrl.getEmpresa = async (req, res) =>{ 
    
    const empresa = await Empresa.findById(req.params.id);
    res.json({message:empresa})
}
empresasCtrl.updateEmpresa = async (req, res) => {
    console.log(req.params.id, req.body)
    const {title,descripcion,administrador,imagen,telefono,logo,direccion,email,RedesSociales}= req.body;
    await Empresa.findOneAndUpdate(req.params.id, {
        title,
        descripcion,
        administrador,
        imagen,
        telefono,
        logo,
        direccion,
        email,
        RedesSociales
    });
    res.json({message: 'empresa actualizado'})
}

empresasCtrl.deleteEmpresa = async (req, res) => {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    res.json({title: 'Empresa eliminada'})
}


module.exports = empresasCtrl;