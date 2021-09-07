const { Schema, model } = require('mongoose');

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

module.exports = model('User', userSchema);