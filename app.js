//import package
const express = require('express');
const fs = require('fs');

let app = express();
app.use(express.json());

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

//Methods
const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
}
const storeMovie = (req, res) => {
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
const getMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: `No movie found with id ${id}`
            }
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
}
const updateMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);
    const index = movies.indexOf(movie);
    if (!movie) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: `No movie found with id ${id}`
            }
        });
    }
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
const deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find((m) => m.id === id);
    const index = movies.indexOf(movie);
    if (!movie) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: `No movie found with id ${id}`
            }
        });
    }
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
//route
app.get('/api/v1/movies', getAllMovies);
app.post('/api/v1/movies', storeMovie);
app.get('/api/v1/movies/:id', getMovie);
app.patch('/api/v1/movies/:id', updateMovie);
app.delete('/api/v1/movies/:id', deleteMovie);


//create server
const port = 3000;
app.listen(port, () => {
    console.log('server started');
})