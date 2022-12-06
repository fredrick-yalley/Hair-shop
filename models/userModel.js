const { Sequelize, Model } = require('sequelize');

const sequelize = require('../sequelize');

// class User extends Model {}

// let userSchema = {
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     }
// }

// User.init(userSchema, {
//     sequelize,
//     modelName: 'users'
// });


const User = sequelize.define('User', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) 


module.exports = User;