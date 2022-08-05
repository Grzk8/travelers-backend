const express = require('express');

const router = express.Router();

const travelControllers = require('../controllers/travels');

router.get('/:pid', travelControllers.getTravelById);

router.get('/:uid', travelControllers.getTravelsByUserId);

router.post('/', travelControllers.newTravel);

router.patch('/pid', travelControllers.updateTravelById);

router.delete('/pid', travelControllers.deleteTravelById);

module.exports = router;