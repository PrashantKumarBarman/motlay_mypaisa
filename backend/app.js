require('dotenv').config();
let express = require('express');
let bookingRouter = require('./routes/booking');
let sequelize = require('./lib/mysql/sequelize');

let app = express();
let port = process.env.PORT || 8080;

app.use(express.json());
app.use('/booking', bookingRouter);

sequelize.sync();

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});