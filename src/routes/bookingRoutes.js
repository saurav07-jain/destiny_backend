const express = require('express');
const { getBookings, getBooking, createBooking, updateBooking, deleteBooking, markOverdueCarsActive } = require('../controllers/bookingController');

const router = express.Router();

router.route('/').get(getBookings).post(createBooking);
router.post('/check-overdue', markOverdueCarsActive);
router.route('/:id').get(getBooking).put(updateBooking).delete(deleteBooking);

module.exports = router;
