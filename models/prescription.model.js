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

//create new Prescription schema/document for the database
const prescriptionSchema = new Schema({
    healthcardno: { type: String, required: true, trim: true, validate: healthcardValidator },
    date: { type: Date, required: true },
    ailment: { type: String, required: true },
    medicine: { type: String, required: true },
    volume: { type: String, required: true },
    prescribed_quantity: { type: String, required: true },
    refill: { type: String, required: true }
}, {
    timestamps: true,
});

prescriptionSchema.index({ healthcardno: 1, ailment: 1, medicine: 1 }, { unique: true });

//export Prescription model
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;