uuid = require('uuid/dist/v4');
const {validationResult} = require('express-validator');

const Users = [{
    id: '001',
    firstName: 'Grzegorz',
    lastName: 'Kaczor',
    email: 'mail@mail.com',
    password: '1234',
    photo: 'https://media-exp1.licdn.com/dms/image/C4E35AQHWU9Dy4Qo5cA/profile-framedphoto-shrink_200_200/0/1603349375467?e=1659718800&v=beta&t=3N8kUVzXatAodLv0HXulRX65WLVb6HBT6DiUVVI-szo'
}];

exports.getUsers = (req, res, next) => {
    res.json({ users: Users })
};

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid data, check your data');
        error.code = 422;
        return next(error);
    }
    const { email, password } = req.body;

    const hasUser = Users.find(u => u.email === email);

    if (hasUser) {
        const error = new Error('User email exists');
        error.code = 422;
        return next(error);
    }
    const createUser = {
        id: uuid(),
        email,
        password
    };
    Users.push(createUser);
    res.status(201).json({ user: createUser });
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    const authUser = Users.find(u => u.email === email);
    if (!authUser || authUser.password !== password) {
        const error = new Error('User not found');
        error.code = 401;
        return next(error);
    }
    res.json({ message: 'logged in' });
};