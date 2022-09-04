uuid = require('uuid/dist/v4');
const { validationResult } = require('express-validator');

const User = require('../models/users');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new Error('Fetching users faild');
        error.code = 500;
        return next(error);
    }

    res.json({ users: users.map(u => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid data, check your data');
        error.code = 422;
        return next(error);
    }
    const { fullName, email, password } = req.body;

    let userExist;
    try {
        userExist = await User.findOne({ email: email });
    } catch (err) {
        const error = new Error('Signing up faild');
        error.code = 500;
        return next(error);
    }

    if (userExist) {
        const error = new Error('User email exists');
        error.code = 422;
        return next(error);
    }
    const createdUser = new User({
        fullName,
        email,
        password,
        travels: [],
        photo: 'https://media-exp1.licdn.com/dms/image/C4E35AQHWU9Dy4Qo5cA/profile-framedphoto-shrink_200_200/0/1603349375467?e=1661101200&v=beta&t=hQRfpqKKsMOSt_qQAfv9BxggLcWxBw-uYk30ElZXMZI'
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new Error('Signing up failed');
        error.code = 500;
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let userExist;
    try {
        userExist = await User.findOne({ email: email });
    } catch (err) {
        const error = new Error('Logging in faild');
        error.code = 500;
        return next(error);
    }

    if (!userExist || userExist.password !== password) {
        const error = new Error('Invalid email or password');
        error.code = 401;
        return next(error);
    }
    res.json({
        message: 'logged in',
        user: userExist.toObject({ getters: true })
    });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;