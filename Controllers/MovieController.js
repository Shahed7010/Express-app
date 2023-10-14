const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

exports.checkId = (req, res, next, vlaue) => {
    const movie = movies.find((m) => m.id === +vlaue);

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: `No movie found with id ${vlaue}`
            }
        });
    }

    next();
}

//Methods
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        time: req.requestedAt,
        data: {
            movies: movies
        }
    });
}
exports.storeMovie = (req, res) => {
    // console.log(req.body)
    const newId = movies.at(-1).id + 1;
    const newMovie = Object.assign({id: newId}, req.body);

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: {
                movie: newMovie
            }
        });
    });
}
exports.getMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);

    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
}
exports.updateMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);
    const index = movies.indexOf(movie);

    Object.assign(movie, req.body);
    movies[index] = movie;
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            count: movies.length,
            data: {
                movie: movie
            }
        });
    });
}
exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);
    const index = movies.indexOf(movie);

    movies.splice(index, 1);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            count: movies.length,
            data: {
                movie: null
            }
        });
    });
}