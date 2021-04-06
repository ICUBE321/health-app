//require Mongoose to easily access database documents
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

//create new User schema/document for the database
const userSchema = new Schema({
    healthcardno: { type: Number, required: true, unique: true, trim: true},
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