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
    telefono: [],
    logo: String,
    direccion: String,
    email: String,
    RedesSociales: []
}, {
    timestaps: true
});

module.exports = model('Empresa', empresaSchema);