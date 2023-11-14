const Movie = require('../Models/MovieModel');


//Methods
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            status: 'success',
            movies
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.storeMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            movie
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            movie
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }

}
exports.updateMovie = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        res.status(200).json({
            status: 'success',
            movie
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.deleteMovie = async (req, res) => {
    const id = req.params.id * 1;
    try {
        await Movie.findByIdAndDelete(id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}