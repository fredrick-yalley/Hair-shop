const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');
const authController = require('../Controllers/authController');

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);


router
.route('/')
.get(usersController.getAllUsers)
.post(usersController.creatUser);

router
.route('/:id')
.get(usersController.getUser)
.patch(usersController.updateUser)
.delete(usersController.deletUser);


module.exports = router;