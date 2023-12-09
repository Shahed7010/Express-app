const Movie = require('../Models/MovieModel');
const ApiFeatures = require('./../Utils/ApiFeatures');

exports.getHighestRated = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';

    next();
}
//Methods
exports.getAllMovies = async (req, res) => {
    try{
        const features = new ApiFeatures(Movie.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        let movies = await features.query;

        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
            }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
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

exports.getMovieStats = async (req, res) => {
    try{
        const stats = await Movie.aggregate([
            { $match: {ratings: {$gte: 4.5}}},
            { $group: {
                    _id: '$releaseYear',
                    avgRating: { $avg: '$ratings'},
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    priceTotal: { $sum: '$price'},
                    movieCount: { $sum: 1}
                }},
            { $sort: { minPrice: 1}}
            //{ $match: {maxPrice: {$gte: 60}}}
        ]);

        res.status(200).json({
            status: 'success',
            count: stats.length,
            data: {
                stats
            }
        });
    }catch(err) {
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}

exports.getMovieByGenre = async (req, res) => {
    try{
        const genre = req.params.genre;
        const movies = await Movie.aggregate([
            {$unwind: '$genres'},
            {$group: {
                    _id: '$genres',
                    movieCount: { $sum: 1},
                    movies: {$push: '$name'},
                }},
            {$addFields: {genre: "$_id"}},
            {$project: {_id: 0}},
            {$sort: {movieCount: -1}},
            //{$limit: 6}
            //{$match: {genre: genre}}
        ]);

        res.status(200).json({
            status: 'success',
            count: movies.length,
            data: {
                movies
            }
        });
    }catch(err) {
        res.status(404).json({
            status:"fail",
            message: err.message
        });
    }
}