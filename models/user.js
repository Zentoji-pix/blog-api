const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    "username": {type: String, required: true, trim: true},
    "email": {type: String, required: true, unique: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'please enter a valid email'], lowercase: true},
    "password": {type: String, required: true}
},{timestamps: true})

const users = mongoose.model("users", userSchema)

module.exports = users