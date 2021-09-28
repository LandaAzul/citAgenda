const { Schema, model } = require('mongoose');

const empresaSchema = new Schema({
    title: String,
    //number: Number,
    descripcion: {
        type: String,
        required: false
    },
    administrador: String,
    imagen:String,
    telefono1:String,
    telefono2:String,
    telefono3:String,
    logo: String,
    direccion: String,
    email: String,
    facebook:String,
    instagram:String,
    whatsapp:String,
    twitter:String,
    linkedin:String
}, {
    timestaps: true
});

module.exports = model('Empresa', empresaSchema);