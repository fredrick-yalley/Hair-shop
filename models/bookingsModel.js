const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    }
})

const Bookings = mongoose.model('Bookings',bookingsSchema);

module.exports = Bookings;