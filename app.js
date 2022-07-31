const { urlencoded } = require("express");
const express = require("express");
const userRoute = require('./routes/usersRoute');
const viewsRoute = require('./routes/viewsRoute');
const bookingsRoute = require('./routes/bookingsRoute')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use('css', express.static(path.join(__dirname + 'client/css')));
app.use('img', express.static(path.join(__dirname + 'client/img')));
app.use('js', express.static(path.join(`${__dirname}client/js`)));

app.use(express.urlencoded());
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use("/", viewsRoute);
app.use("/api/v1/bookings", bookingsRoute);


module.exports = app;