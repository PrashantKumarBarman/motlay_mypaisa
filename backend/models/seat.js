let sequelize = require('../lib/mysql/sequelize');
let { DataTypes } = require('sequelize');
let bookingModel = require('./booking').model;

let model = sequelize.define('seat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.INTEGER,
        references: {
            model: bookingModel,
            key: 'id'
        }
    },
    seatNo: {
        type: DataTypes.INTEGER
    }
});

module.exports = {
    model: model,
    addBookingSeats: async function(seats, bookingId) {
        try {
            let data = [];
            seats.forEach((seat) => {
                data.push({ seatNo: seat, bookingId: bookingId });
            });
            await model.bulkCreate(data);
            return true;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
};