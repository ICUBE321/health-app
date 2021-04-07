//require Mongoose to easily access database documents
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

var healthcardValidator = [
    validate({
        validator: 'isLength',
        arguments: [12, 12],
        message: 'Healthcard number should be 12'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Number should contain alpha-numeric characters only'
    })
];

//create new Appointment schema/document for the database
const appointmentSchema = new Schema({
    healthcardno: { type: String, required: true, trim: true, validate: healthcardValidator},
    date: { type: Date, required: true },
    time: { type: String, required: true },
}, {
    timestamps: true,
});

//export appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;