const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const ciudadanoSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    email:{type: String, required: true},
    operatorId:{type: Number, required: true},
    operatorName:{type: String,required: true },
    password:{type: String, required: true},
    user: { type: String }
});

ciudadanoSchema.methods.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

ciudadanoSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Ciudadano', ciudadanoSchema);
