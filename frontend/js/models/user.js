angular
  .module('wardrobe-fairy')
  .factory('User', User)

User.$inject = ['$resource', 'API'];
function User($resource, API) {

//Adding Post method to signup/login routes.
  return $resource(API + '/users/:id', null, {
  	'login': { method: 'POST', url: API + '/login'},
  	'signup': { method: 'POST', url: API + '/signup' }
  });
  
}