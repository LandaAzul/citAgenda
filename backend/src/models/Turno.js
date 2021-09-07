const { Schema, model } = require('mongoose');

const turnSchema = new Schema({
    Título: String,
    Día: String,
    Franja: String,
    Tipo: 
    [
        {
            Titular: String,
            Invitado: String
        },
        {
            Títular: String,
            Invitado1: String,
            Invitado2: String,
            Invitado3: String
        }
    ],
    date: {
        type:Date,
        default: Date.now
    }
}, {
    timestaps: true
});

module.exports = model('Turn', turnSchema);