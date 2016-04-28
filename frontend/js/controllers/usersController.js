angular
.module('wardrobe-fairy')
.controller('UsersController', UsersController)


UsersController.$inject = ['User', 'TokenService', '$window', '$location']
function UsersController(User, TokenService, $window, $location) {
	var self = this;
	self.user  = {};

	function handleLogin(res) {
		var token = res.token ? res.token : null;
		if(token) {
			console.log(res);
			self.user = TokenService.getUser();
		}
		self.message = res.message;
	}

	self.signup = function() {
		User.signup(self.user, handleLogin);
	}

	self.login = function() {
	 	User.login(self.user, handleLogin);
	}

	self.logout = function() {
		// auth.logout && auth.logout()
		TokenService.removeToken()
		self.user = {}
	}

	//Give user their token if in logged in state
	self.isloggedIn = function(){
		return !!TokenService.getToken();
	}
	if(self.isloggedIn()){
		self.user = TokenService.getUser();
	}
}