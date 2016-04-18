angular
	.module('wardrobe-fairy')
	.controller('mainController', mainController)


mainController.$inject = ['Upload', 'API', 'S3_BUCKET', 'TokenService', 'User', '$timeout'];

function mainController(Upload, API, S3_BUCKET, TokenService, User, $timeout) {
  var self = this;

  self.file = null;
  self.files = null;
  self.clothingType = null;
  self.usersClothing = [];
  self.randomTop = "";
  self.randomBottom = "";
  self.user = !!TokenService.getToken() ? TokenService.getUser() : null;

  console.log("TEST" + !!TokenService.getToken() ? TokenService.getUser() : null)
  console.log(self.user)

  function getUser() {
    console.log("getting user!!");
    // changed below
  	User.get({ id: self.user._doc._id }, function(user) {
  		self.usersClothing = user.clothing.map(function(clothing) {
    		clothing.image = S3_BUCKET + clothing.image;
    		return clothing;
    	});
  	});
  }

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  }
  console.log(self.isLoggedIn());
  if(self.isLoggedIn()) {
    getUser();
  }

  self.uploadSingle = function() {
    Upload.upload({
      url: API + '/upload/single',
      data: { file: self.file, type: self.clothingType }
    })
    .then(function(res) {
    	self.usersClothing = res.data.user.clothing.map(function(clothing) {
    		clothing.image = S3_BUCKET + clothing.image;
    		return clothing;
    	});
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  self.generateClothes = function(){
  	var tops = [];
  	var bottoms = [];
    console.log(self.usersClothing);
  	//The function
  	self.usersClothing.forEach(function(clothing){
  		if(clothing.type === 'top') {
  			tops.push(clothing.image);
  		}
  		else {
  			bottoms.push(clothing.image);
  		}
  	})
    $timeout(function() {
    	self.randomTop = tops[Math.floor(Math.random() * tops.length)];
    	self.randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    });
  }
}

