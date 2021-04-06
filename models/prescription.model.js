//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Prescription schema/document for the database
const prescriptionSchema = new Schema({
    healthcardno: { type: Number, required: true, unique: true, trim: true },
    date: { type: Date, required: true },
    ailment: { type: String, required: true },
    medicine: { type: String, required: true },
    volume: { type: String, required: true },
    prescribed_quantity: { type: String, required: true },
    refill: { type: String, required: true }
}, {
    timestamps: true,
});

//export Prescription model
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;