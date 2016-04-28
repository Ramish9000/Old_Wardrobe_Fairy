var express = require('express'),
	router  = express.Router();

var authenticationController 	= require('../controllers/authenticationController'),
	usersController 			= require('../controllers/usersController'),
	clothesController 			= require('../controllers/clothesController');

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

router.get('/users/:id', usersController.showUser);

module.exports = router;