const empresasCtrl = {};

const Empresa = require('../models/empresa');

Empresa.create(
    {
        "title": "club Union",
    "descripcion": "club para socios",
    "administrador": "Carlos Enrique",
    "imagen": "direccion de la imagen",
    "telefono1": "6483824",
    "telefono2": "6473594",
    "telefono3": "6366749",
    "logo": "direccion del logo",
	"direccion": "Cra 33 #",
    "email": "carEnr@gmail.com",
	"facebook": "link facebook",
    "instagram": "link instagram",
    "whatsapp": "link whatsapp",
    "twitter": "link twitter",
    "linkedin": "link linkedin",
    "youtube": "link youtube"
    }
)
empresasCtrl.getEmpresas = async(req, res) => {
    const empresas = await Empresa.find();//
    res.json(empresas);
}
empresasCtrl.createEmpresa = async (req, res) => {
    const {title,descripcion,administrador,imagen,telefono1,telefono2,telefono3,logo,direccion,email,facebook,instagram,whatsapp,twitter,linkedin,youtube} = req.body;
    const nuevaEmpresa = new Empresa ({
        title,
        descripcion,
        administrador,
        imagen,
        telefono1,
        telefono2,
        telefono3,
        logo,
        direccion,
        email,
        facebook,
        instagram,
        whatsapp,
        twitter,
        linkedin,
        youtube
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
    const {title,descripcion,administrador,imagen,telefono1,telefono2,telefono3,logo,direccion,email,facebook,instagram,whatsapp,twitter,linkedin,youtube}= req.body;
    await Empresa.findOneAndUpdate(req.params.id, {
        title,
        descripcion,
        administrador,
        imagen,
        telefono1,
        telefono2,
        telefono3,
        logo,
        direccion,
        email,
        facebook,
        instagram,
        whatsapp,
        twitter,
        linkedin,
        youtube
    });
    res.json({message: 'empresa actualizado'})
}

empresasCtrl.deleteEmpresa = async (req, res) => {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    res.json({title: 'Empresa eliminada'})
}


module.exports = empresasCtrl;