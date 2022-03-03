const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    
}, {
    timestaps: true
});

module.exports = model('horario', horarioSchema);