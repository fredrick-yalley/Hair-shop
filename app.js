const { urlencoded } = require("express");
const express = require("express");
const userRoute = require('./routes/usersRoute');
const viewsRoute = require('./routes/viewsRoute');
const bookingsRoute = require('./routes/bookingsRoute')
const productRoute = require('./routes/productRoute')
const path = require('path');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const flash = require("express-flash");



app.use(express.static(path.join(__dirname, 'client')));
app.use('css', express.static(path.join(__dirname + 'client/css')));
app.use('img', express.static(path.join(__dirname + 'client/img')));
app.use('js', express.static(path.join(`${__dirname}client/js`)));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);

app.use(flash());
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/v1/products', productRoute)
app.use("/", viewsRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/users", userRoute);



module.exports = app;