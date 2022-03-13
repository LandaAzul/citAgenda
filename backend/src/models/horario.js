const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    activo: Boolean,
    regenerar: Boolean,
    lugar: String,
    fechaInicio: String,
    type: Array,
    horario: [
        {   
            type: Object,
            properties: {
                indice: Number,
                franja: String,
                granDemanda: Boolean,
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String,

                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
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
                        idProfesor: String,
                        idCanchero: String,
                        colorProfesor: String,
                        profesor: String,
                        canchero: String
                    }  
                }
            }
        }
    ]
}, {
    timestaps: true
});

module.exports = model('horario', horarioSchema);