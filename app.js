const express = require('express');
const bodyParser = require('body-parser');

const travelsRoutes = require('./routes/travels');
const usersRoures = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use('/travels', travelsRoutes);
app.use('/users', usersRoures);

app.use((error, req, res, next) => {
    if (res.headerSend) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'Unknown error' })
});

app.listen(5000);