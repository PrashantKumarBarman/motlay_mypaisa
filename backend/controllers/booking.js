let bookingModel = require('../models/booking');

module.exports = {
    addBooking: async function(req, res) {
        let seats = await bookingModel.findSeatsByMobileAndDate(req.body.mobile, req.body.date);
        let noOfSeats = seats.reduce((prev, current) => {
            return prev + current.seats.length;
        }, 0);
        if((noOfSeats + req.body.seats.length) > 6) {
            res.status(400).send('Only upto 6 seats allowed per mobile number per day');
            return;
        }
        let booking = await bookingModel.add(req.body.mobile, req.body.date, req.body.seats);
        res.status(200).json(booking);
    },
    getBookingsByDate: async function(req, res) {
        let bookings = await bookingModel.findByDate(req.params.date);
        res.status(200).json(bookings);
    },
    getAllBookingsByDate: async function(req, res) {
        let bookings = await bookingModel.findAllByDate(req.params.date);
        res.status(200).json(bookings);
    },
    updateBookingStatus: async function(req, res) {
        await bookingModel.updateBookingStatus(req.params.id, req.params.status);
        res.sendStatus(200);
    }
};