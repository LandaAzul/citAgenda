const empresasCtrl = {};

const Empresa = require('../models/empresa');
//borra la coleccion de empresa cada vez que se inicia el servidor
Empresa.deleteMany(function(err, p){
    if(err){ 
        throw err;
    }
    //else{
        //console.log('No Of Documents deleted:' + p);
    //}
});
Empresa.create(
    {
        "title": "Aquí va el título",
        "descripcion": "En esta parte va descripcióm relevante que se desee mostrar",
        "administrador": "Administrador",
        "imagen": "direccion de la imagen",
        "telefono1": "6070000000",
        "telefono2": "6070000000",
        "telefono3": "6070000000",
        "logo": "direccion del logo",
        "direccion": "Dirección",
        "email": "EmailDeContacto@contacto.com",
        "facebook": "https://es-la.facebook.com/",
        "instagram": "",
        "whatsapp": "",
        "twitter": "",
        "linkedin": "",
        "youtube": "https://www.youtube.com/"
   
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