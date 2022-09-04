const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const travelsRoutes = require('./routes/travels');
const usersRoures = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Orgin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATH, DELETE');
    next();
});
app.use('/api/travels', travelsRoutes);
app.use('/api/users', usersRoures);

app.use((error, req, res, next) => {
    if (res.headerSend) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'Unknown error' })
});

mongoose
    .connect('mongodb+srv://grzesiek:grzesiek@cluster0.wcshf.mongodb.net/travelers?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
