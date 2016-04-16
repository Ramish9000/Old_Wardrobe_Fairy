angular
.module('wardrobe-fairy')
.factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService']
function AuthInterceptor (API, TokenService) {

	return {

		request: function(config){
			var token = TokenService.getToken();

			if(config.url.match(API) && token) {
				config.headers.Authorization = "Bearer " + token;
			}
			console.log("AuthInterceptor config next")
			console.log(config);
			console.log("AuthInterceptor config.headers next")
			console.log(config.headers);
			return config;
		},

		response: function(res) {
			if(res.config.url.match(API) && res.data.token){
				TokenService.saveToken(res.data.token)
			}

			return res;
		}
	}
}