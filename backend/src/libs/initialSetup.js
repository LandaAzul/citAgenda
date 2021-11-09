const crtRole = {};
const Role = require('../models/Role');
const Empresa = require('../models/empresa');

crtRole.createRoles = async () =>{
    try{
        const count = await Role.estimatedDocumentCount()

        if (count > 0 ) return'existe';

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderador'}).save(),
            new Role({name: 'admin'}).save(),
        ]);
    
        console.log(values);
    } catch(error) {
        console.log(error);
    }
    
};

crtRole.verificarEmpresa = async () =>{
    
    Empresa.deleteMany(function(err, p){
             if(err){ 
                 throw err;
             }
    
        //     //else{
        //         //console.log('No Of Documents deleted:' + p);
        //     //}
         });
        Empresa.create({
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
                  });
                
}


module.exports = crtRole;
