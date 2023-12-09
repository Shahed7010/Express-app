const express = require('express');
const moviesController = require('./../Controllers/MovieController')
//route
const router = express.Router();

router.route('/highest-rated').get(moviesController.getHighestRated, moviesController.getAllMovies)
router.route('/movie-stats').get(moviesController.getMovieStats);
router.route('/movies-by-genre/:genre').get(moviesController.getMovieByGenre);

router.route('/movies')
    .get(moviesController.getAllMovies)
    .post(moviesController.storeMovie);

router.route('/movies/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

module.exports = router;