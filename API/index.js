const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

//create server
const app = express();

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//enable bosy-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//enable routing
app.use('/', routes())


//port
app.listen(4000, () => {
    console.log('server working')
})