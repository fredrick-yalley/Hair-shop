const { Sequelize }  = require('sequelize');

const sequelize = new Sequelize('hair', 'postgres', 'Tbag122', {
    host: 'localhost',
    dialect: 'postgres'
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((err => {
    console.log('Unable to connect to the database:', err);
  })) 
  
  sequelize.sync();

  module.exports = sequelize;