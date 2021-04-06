//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Doctor schema/document for the database
const doctorSchema = new Schema({
    docid: { type: Number, required: true, unique: true, trim: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    hospital: { type: Number, required: true },
    specialization: { type: String, required: true },
}, {
    timestamps: true,
});

//export doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;