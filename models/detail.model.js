//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Detail schema/document for the database
const detailSchema = new Schema({
    healthcardno: { type: Number, required: true, unique: true, trim: true },
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