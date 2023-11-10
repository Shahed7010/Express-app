const mongoose = require('mongoose')
const env = require('dotenv')
env.config({path: './config.env'})

const app = require('./app')

mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true
}).then((conn) => {
    console.log(conn, 'db connection success..')
}).catch((err) => {
    console.log(err, 'db connection failed..')
})

//create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server started');
})