var mongoose = require('mongoose');
var bcrypt  = require('bcrypt');
var Clothing = require('./clothing');

var userSchema = new mongoose.Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	clothing: [ Clothing.schema ]
});

//authentication of password using Bcrypt
userSchema.methods.authenticate = function(password, callback) {
	console.log(password);
	bcrypt.compare(password, this.password, function(err, isMatch) {
		console.log(isMatch);
		callback(err, isMatch);
	});
};

//Hash the new password
userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) next();
	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5));
	next();
});

module.exports = mongoose.model('User', userSchema);