const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    codigo: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    documento:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    celular:Number,
    activo: Boolean,
    idFamiliares: [],
    familiar: String,
    contra: String,
    email: String,
    
}, {
    timestaps: true
});


userSchema.methods.cifrarPass = async (contra) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(contra,salt);
};

module.exports = model('User', userSchema);