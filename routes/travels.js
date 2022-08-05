const express = require('express');

const router = express.Router();

const travelControllers = require('../controllers/travels');

router.get('/:pid', travelControllers.getTravelById);

router.get('/:uid', travelControllers.getTravelByUserId);

module.exports = router;