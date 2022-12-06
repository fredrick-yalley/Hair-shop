const {Pool} = require('pg');
require("dotenv").config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const devConfig = {
    user: "postgres",
    password: "Tbag@122",
    host: "localhost",
    port: 5432,
    database: "hairshop"
}
const prodConfig = {
    connectionString: process.env.DATABASE_URL
}

// const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString
// });

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);

module.exports = pool;

// const client = new Client({
//     host:"localhost",
//     user: "postgres",
//     port: 5432,
//     password: "Tbag@122",
//     database: "jenny"
// })


// module.exports = client;