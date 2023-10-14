const env = require('dotenv')
env.config({path: './config.env'})

const app = require('./app')

//create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server started');
})