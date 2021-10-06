const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre: String,
    codigo:{
        type: String,
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
    celular:String,
    activo: Boolean,
    idFamiliares: [],
    tipo: String,
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