const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
.connect(DB)
.then(console.log('Database is connected'));


const port = 2000;


app.listen(port, () => {
  console.log("server is running on port: " + port); 
});