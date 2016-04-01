var express = require('express');
var router = express.Router();

var authenticationController = require('../controllers/authenticationController');
var usersController = require('../controllers/usersController');
var clothesController = require('../controllers/clothesController');

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

router.get('/users/:_id', usersController.showUser);

module.exports = router;