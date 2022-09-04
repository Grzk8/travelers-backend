const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    travels: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Travel' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);