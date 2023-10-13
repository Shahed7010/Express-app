const express = require('express');
const moviesController = require('./../Controllers/MovieController')
//route
const router = express.Router();

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.storeMovie);
router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

module.exports = router;