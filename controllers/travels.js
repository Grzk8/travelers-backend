const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getCoordinates = require('../util/location');
const Travel = require('../models/travel');
const User = require('../models/users');



const getTravelById = async (req, res, next) => {
    const placeId = req.params.pid;
    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Travel not found');
        error.code = 500;
        return next(error);
    }

    if (!travel) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travel: travel.toObject({ getters: true }) });
};

const getTravelsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let travel;

    try {
        travel = await Travel.find({ creator: userId });
    } catch (err) {
        const error = new Error('Travel not found');
        error.code = 500;
        return next(error);
    }
    if (!travel || travel.length === 0) {
        const error = new Error('Travel not found');
        error.code = 404;
        return next(error);
    }
    res.json({ travel: travel.map(t => t.toObject({ getters: true })) });
};

const newTravel = async (req, res, next) => {
    const { destination, description, creator } = req.body;
    let coord;

    try {
        coordinates = await getCoordinates(destination);
    } catch (error) {
        return next(error);
    }

    const createdTravel = new Travel({
        destination,
        description,
        creator,
        photos: {
            photo1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffneFER0tHLP0QALe_0I2oJ2p-GaV6IRkyxn08y6aueIipn4U4QoyjOWIT65w_Snzid4&usqp=CAU',
            photo2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xyo3D12bDqr9eiMCvXix5jlaUfTWIGf3I3UKwY-D4RRslM1ZWORfZ8id2ZUhWhh6_e8&usqp=CAU',
            photo3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5traUzdyLzFhLetMVXeCzClhVHo91viJ8KYmbBVldaIgB0qJR8WTR3UQNvP9-WWCZcY&usqp=CAU'
        },
        location: coordinates,

    });

    let user;
    try {
        user = await User.findById(creator);
    } catch {
        const error = new Error('Creating new travel faild');
        error.code = 500;
        return next(error);
    }

    if (!user) {
        const error = new Error('User not found');
        error.code = 500;
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTravel.save({ session: sess });
        user.travels.push(createdTravel);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new Error('Creating new travel faild');
        error.code = 500;
        return next(error);
    }
    res.status(201).json({ travel: createdTravel });
};

const updateTravelById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid data, check your data');
        error.code = 422;
        return next(error);
    }

    const { destination, description } = req.body;
    const placeId = req.params.pid;
    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Updating travel failed');
        error.code = 500;
        return next(error);
    }

    travel.destination = destination;
    travel.description = description;

    try {
        await travel.save();
    } catch {
        const error = new Error('Updating travel failed');
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ travel: travel.toObject({ getters: true }) });

};

const deleteTravelById = async (req, res, next) => {
    const placeId = req.params.pid;

    let travel;

    try {
        travel = await Travel.findById(placeId);
    } catch (err) {
        const error = new Error('Deleting travel failed');
        error.code = 500;
        return next(error);
    }

    try {
        await travel.remove();
    } catch {
        const error = new Error('Deleting travel failed');
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ message: 'Travel deleted' });
};

exports.getTravelById = getTravelById;
exports.newTravel = newTravel;
exports.getTravelsByUserId = getTravelsByUserId;
exports.updateTravelById = updateTravelById;
exports.deleteTravelById = deleteTravelById;