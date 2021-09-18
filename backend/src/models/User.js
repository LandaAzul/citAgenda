const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cellphone:Number,
    pass: String,
    email: String,
    
}, {
    timestaps: true
});


userSchema.methods.cifrarPass = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass,salt);
};

module.exports = model('User', userSchema);