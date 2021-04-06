//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Appointment schema/document for the database
const appointmentSchema = new Schema({
    healthcardno: { type: Number, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
}, {
    timestamps: true,
});

//export appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;