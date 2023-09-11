//import package
const express = require('express');
let app = express();

//route
app.get('/', (req, res) => {
    res.status(200).send('hello from express server');
})


//create server
const port = 3000;
app.listen(port, () => {
    console.log('server started');
})