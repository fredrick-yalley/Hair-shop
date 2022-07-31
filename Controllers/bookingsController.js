const Bookings = require('../models/bookingsModel');

exports.getAllBooking = async(req, res) => {
    try {
        const allBookings = await Bookings.find();
        res.status(200).json({
            status: 'success',
            number: allBookings.length,
            data: allBookings
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            data: error
        })
    }
}

exports.bookAppointment = async(req, res) => {
    try {
        const newBooking = await Bookings.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newBooking
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: error
        })
    }
}