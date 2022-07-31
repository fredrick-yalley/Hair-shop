const express = require('express');
const router = express.Router();
const bookingsController = require('../Controllers/bookingsController');

router
.route('/')
.get(bookingsController.getAllBooking)
.post(bookingsController.bookAppointment)


module.exports = router;