//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Detail schema/document for the database
const detailSchema = new Schema({
    healthcardno: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodtype: { type: String, required: true },
    allergies: { type: Array },
    organdonor: { type: Boolean, required: true },
    healthprobs: { type: Array } 
}, {
    timestamps: true,
});

//export detail model
const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;