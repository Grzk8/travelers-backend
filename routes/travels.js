const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const travelControllers = require('../controllers/travels');

router.get('/:pid', travelControllers.getTravelById);

router.get('/:uid', travelControllers.getTravelsByUserId);

router.post('/',
    [
        check('destination')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5 }),
    ],
    travelControllers.newTravel
);

router.patch('/pid', travelControllers.updateTravelById);

router.delete('/pid', travelControllers.deleteTravelById);

module.exports = router;