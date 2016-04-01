var User 		= require('../models/user');
var jwt      	= require('jsonwebtoken');
var secret   	= require('../config/config').secret;

function signup(req, res, next) {
	var userParams = req.body;
	var user = new User(userParams);
	user.save(function(err, user){
		if(err) return res.status(401).send({ message: err });
		else {
			var token = jwt.sign(user, secret, { expiresInMinutes: 120 });
			return res.status(200).send({ 
				success: true,
				message: "Welcome to the Wardrobe Fairy.",
				token: token
			});
		}
	})
};

function login(req, res) {
	var credentials = req.body;
	User.findOne({ username: credentials.username }, function(err, user) {
		if(err) return res.status(401).send({ message: err });
		if(!user) return res.status(401).send({ message: "No user model." });

		user.authenticate(credentials.password, function(err, isMatch){
			if(isMatch){
				user.save(function(err, user){
					var token = jwt.sign(user, secret, { expiresInMinutes: 120 });
					console.log("Token=" + token);
					return res.json({ user: user, token: token });				
				})
			}
			else {
				return res.status(401).send({ message: "Incorrect credentials."});
			}
		})
	});
};

module.exports = {
	signup: signup,
	login: login
}