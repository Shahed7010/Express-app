const express = require('express');
const morgan = require('morgan');

let app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
if (process.env.APP_ENV === 'local'){
    app.use(morgan('dev'));
}

const moviesRouter = require('./Routes/moviesRoute');

// app.get('/api/v1/movies', getAllMovies);
// app.post('/api/v1/movies', storeMovie);
// app.get('/api/v1/movies/:id', getMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie);

app.use('/api/v1', moviesRouter);

module.exports = app;


