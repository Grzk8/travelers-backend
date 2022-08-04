const express = require('express');
const bodyParser = require('body-parser');

const travelsRoutes = require('./routes/travels');
const usersRoures = require('./routes/users');

const app = express();

app.use('/travels', travelsRoutes);
//app.use('/users', usersRoures);

app.listen(5000);