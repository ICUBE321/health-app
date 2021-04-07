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

//create new Detail schema/document for the database
const detailSchema = new Schema({
    healthcardno: { type: String, required: true, unique: true, trim: true, validate: healthcardValidator },
    DOB: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodtype: { type: String, required: true },
    allergies: { type: String },
    donor: { type: String, required: true },
    healthprobs: { type: String } 
}, {
    timestamps: true,
});

//export detail model
const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;