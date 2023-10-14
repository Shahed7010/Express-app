const express = require('express');
const moviesController = require('./../Controllers/MovieController')
//route
const router = express.Router();

router.param('id', moviesController.checkId);

router.route('/movies')
    .get(moviesController.getAllMovies)
    .post(moviesController.storeMovie);
router.route('/movies/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

module.exports = router;