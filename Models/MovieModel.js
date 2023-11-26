const mongoose = require('mongoose');
const {now} = require("mongoose");


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description field is required.'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration field is required.'],
    },
    ratings: {
        type: Number,
    },
    totalRatings: {
        type: Number,
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release Year field is required.'],
    },
    releaseDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String],
        required: [true, 'Genres field is required.'],
    },
    directors: {
        type: [String],
        required: [true, 'Directors field is required.'],
    },
    coverImage: {
        type: [String],
        required: [true, 'Cover Image field is required.'],
    },
    actors: {
        type: [String],
        required: [true, 'Cover Image field is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price field is required.'],
    },

});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;