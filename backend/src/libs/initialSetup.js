const crtRole = {};
const Role = require('../models/Role');

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
module.exports = crtRole;
