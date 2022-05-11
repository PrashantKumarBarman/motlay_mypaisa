let sequelize = require('../lib/mysql/sequelize');
let { DataTypes, Op } = require('sequelize');
let seatModel = require('./seat');

let model = sequelize.define('booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mobile: {
        type: DataTypes.STRING(16)
    },
    date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING(16),
        defaultValue: 'booked'
    }
});

model.hasMany(seatModel.model, {
    foreignKey: 'bookingId'
});

module.exports = {
    model: model,
    add: async function(mobile, date, seats) {
        try {
            let booking = await model.create({ mobile: mobile, date: date });
            await seatModel.addBookingSeats(seats, booking.id);
            return booking;
        }   
        catch(err) {
            console.log(err);
            return false;
        }
    },
    findSeatsByMobileAndDate: async function(mobile, date) {
        let seats = await model.findAll({
            where: {
                mobile: mobile,
                date: date,
                status: {
                    [Op.ne]: 'cancelled'
                }
            },
            include: seatModel.model
        });
        return seats;
    },
    findByDate: async function(date) {
        let bookings = await model.findAll({
            where: {
                date: date,
                status: {
                    [Op.ne]: 'cancelled'
                }
            },
            include: seatModel.model
        });
        return bookings;
    },
    findAllByDate: async function(date) {
        let bookings = await model.findAll({
            where: {
                date: date
            },
            include: seatModel.model
        });
        return bookings;
    },
    updateBookingStatus: async function(id, status) {
        await model.update({ status: status }, { where: {
            id: id
        }});
    }
};