//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Doctor schema/document for the database
const doctorSchema = new Schema({
    id: { type: Number, required: true, unique: true, trim: true, minlength: 3 },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    hospital: { type: String, required: true },
    specialization: { type: String, required: true }
}, {
    timestamps: true,
});

//export doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;