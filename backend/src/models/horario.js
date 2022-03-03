const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    type: Array,
    horario: [
        {
            type: Object,
            properties: {
                indice: Number,
                franja: String,
                titulo: String,
                fechaInicio: String,
                dia: {
                    type: Object,
                    properties: {
                        fecha: String,
                        turno: String,
                        autor1: String,
                        autor2: String,
                        autor3: String,
                        autor4: String,
                        horaSolicitud: String,
                        solicita: String,
                        asistio: Boolean,
                        profesor: String,
                        canchero: String
                    }  //]
                },
            }
        }
    ]
}, {
    timestaps: true
});

module.exports = model('horario', horarioSchema);