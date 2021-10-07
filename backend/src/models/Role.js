const { Schema, model } = require('mongoose');

const rolSchema = new Schema(
{
    name: String,
},
{
    versionKey: false,
}
);
export default model('Role', rolSchema);