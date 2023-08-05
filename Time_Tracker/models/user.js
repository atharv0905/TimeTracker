const mongoose = require('mongoose');
const { object } = require('webidl-conversions');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    name: String,
    password: String,
    tasks: Object
})

const User = mongoose.model('User', userSchema);

module.exports = User;