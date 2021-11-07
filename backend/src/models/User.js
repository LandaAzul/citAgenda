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
    //idFamiliares: [],
    tipo: String,
    contra: String,
    email: String,
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId //para relacionarlo con los roles
    }]
}, {
    timestaps: true,
    versionKey: false
});


userSchema.methods.cifrarPass = async (contra) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contra, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model('User', userSchema);