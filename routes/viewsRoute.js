const express = require('express');
const router = express.Router();
const viewsController = require('../Controllers/viewsController');

router
.route('/')
.get(viewsController.getHome);


module.exports = router;