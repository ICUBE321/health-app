//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new User schema/document for the database
const userSchema = new Schema({
    healthcardno: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    detail:{
        DOB: { type: Date, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        bloodtype: { type: String, required: true },
        allergies: { type: Array },
        organdonor: { type: Boolean, required: true },
        healthprobs: { type: Array }
    },
    prescription:{
        date: { type: Date, required: true },
        ailment: { type: String, required: true },
        medicine: { type: String, required: true },
        volume: { type: Number, required: true },
        prescribed_quantity: { type: Number, required: true },
        refill: { type: Boolean, required: true }
    },
    appointment:{
        date: { type: Date, required: true },
        time: { type: String, required: true },
        doctor:{type: String, required:true}
    }
}, {
    timestamps: true,
});

//export user model
const User = mongoose.model('User', userSchema);

module.exports = User;