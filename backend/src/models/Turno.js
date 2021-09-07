const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
    Título: String,
    Dia: String,
    Franja: String,
    Tipo: String,
    Titular: String,
    Invitado1: String,
    Invitado2: String,
    Invitado3: String
    ,
    date: {
        type:Date,
        default: Date.now
    }
}, {
    timestaps: true
});

module.exports = model('Turno', turnoSchema);