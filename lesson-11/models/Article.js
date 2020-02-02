const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    urlToImage: {
        type: String,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = model('Article', schema)
