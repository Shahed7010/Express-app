const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration field is required.'],
    },
    ratings: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model('movies',movieSchema);

module.exports = Movie;