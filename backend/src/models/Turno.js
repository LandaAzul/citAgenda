const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
    titulo: String,
    idHorario: String,
    dia: String,
    indice: String,
    solicita: String,
    autor1: String,
    autor2: String,
    autor3: String,
    autor4: String,
    horaSolicitud: String,
    date: {
        type:Date,
        default: Date.now
    }
}, {
    timestaps: true
});

module.exports = model('Turno', turnoSchema);