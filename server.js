const app = require('./app')

//create server
const port = 3000;
app.listen(port, () => {
    console.log('server started');
})