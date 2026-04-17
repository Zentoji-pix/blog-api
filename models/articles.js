const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    published: {type: Boolean, default: false},
    coverImage: {type: String, required: false}
    }, {timestamps: true})

const articles = mongoose.model('articles', articleSchema)

module.exports = articles