const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    activo: Boolean,
    type: Array,
    horario: [
        {   
            type: Object,
            properties: {
                indice: Number,
                franja: String,
                lugar: String,
                fechaInicio: String,
                domingo: {
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
                lunes: {
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
                martes: {
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
                miercoles: {
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
                jueves: {
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
                viernes: {
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
                sabado: {
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
                }
            }
        }
    ]
}, {
    timestaps: true
});

module.exports = model('horario', horarioSchema);