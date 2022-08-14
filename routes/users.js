const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/', usersControllers.getUsers);

router.post('/login', usersControllers.login);

router.post('/signup',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersControllers.login);

module.exports = router;