var mongoose = require('mongoose');

var clothingSchema = new mongoose.Schema({
	type: String,
	image: String,
});

module.exports = mongoose.model('Clothing', clothingSchema);