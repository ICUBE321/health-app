//require Mongoose to easily access database documents
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

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

//create new User schema/document for the database
const userSchema = new Schema({
    healthcardno: { type: String, required: true, unique: true, trim: true, validate: healthcardValidator},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

userSchema.plugin(uniqueValidator);

//export user model
const User = mongoose.model('User', userSchema);

module.exports = User;