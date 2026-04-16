const express = require('express');
const { getCars, getCar, createCar, updateCar, deleteCar } = require('../controllers/carController');

const router = express.Router();

router.route('/').get(getCars);
router.route('/addcar').post(createCar);
router.route('/:id').get(getCar).put(updateCar).delete(deleteCar);

module.exports = router;
