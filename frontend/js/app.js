angular
	.module('wardrobe-fairy', ['angular-jwt', 'ngResource', 'ui.router', 'ngFileUpload'])
	.constant('API', 'http://localhost:3000/api')
	.constant('S3_BUCKET', 'https://s3-oregon.amazonaws.com/wardrobefairy/')
	// .config(function($httpProvider) {
	//     $httpProvider.interceptors.push('AuthInterceptor');
	//   })
	.config(function($httpProvider, $stateProvider, $urlRouterProvider){

		//Injecting AuthInterceptor
		$httpProvider.interceptors.push('AuthInterceptor');

		//STATES
		$stateProvider
			.state('home', {
				url: "/",
				templateUrl: "js/welcome.html"
			})
			.state('signup', {
				url: "/signup",
				templateUrl: "js/signup.html",
				controller: "UsersController as users"
			})
			.state('login', {
				url: "/login",
				templateUrl: "js/login.html",
				controller: "UsersController as users"
			})
			.state('upload', {
				url: "/upload",
				templateUrl: "js/upload.html"
			})
			.state('generator', {
				url: "/generator",
				templateUrl: "js/generator.html"
			})
			.state('about', {
				url: "/about",
				templateUrl: "js/about.html"
			})



		//Otherwise
		$urlRouterProvider.otherwise('/');
	})