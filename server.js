const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to Database')
}).catch((err) => {
    console.log('Could not connect to database, exiting now', err)
    process.exit()
})

app.get('/', (req, res) => {
    res.json({'message': 'Welcome to EasyNotes Take Notes Quickly'})
})

const port = 8888;

require('./app/routes/note.routes.js')(app)
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})

