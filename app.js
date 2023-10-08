//import package
const express = require('express');
const fs = require('fs');

let app = express();
app.use(express.json());

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));
//route
app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
})

app.post('/api/v1/movies', (req, res) => {
    // console.log(req.body)
    const newId = movies.slice(-1)[0].id + 1;
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
    console.log(newId);
})



//create server
const port = 3000;
app.listen(port, () => {
    console.log('server started');
})