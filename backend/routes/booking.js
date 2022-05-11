let express = require('express');
let bookingController = require('../controllers/booking');

let router = express.Router();

router.get('/:date/all', bookingController.getAllBookingsByDate);

router.get('/:date', bookingController.getBookingsByDate);

router.put('/:id/status/:status', bookingController.updateBookingStatus);

router.post('/', bookingController.addBooking);

module.exports = router;