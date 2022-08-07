const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/', usersControllers.getUsers);

router.post('/login', usersControllers.login);

router.post('/signup', usersControllers.login);

module.exports = router;