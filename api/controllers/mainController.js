//create a route that will return clothes for the current user based on jwt

var User = require('../models/user');

function getClothes(req, res){
	var id = req.params.id;
	User.findById({_id: id}, function(error, user){
		console.log(user)
	  // if (error) return res.status(404).send({message: error})
	  // else return res.status(200).send(user.clothes);
	});
}



module.exports = {
	getClothes = getClothes
}
