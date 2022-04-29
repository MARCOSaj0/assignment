const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    dob: {type: Date, required: true},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: Book}]
});

module.exports = mongoose.model('Author', authorSchema);