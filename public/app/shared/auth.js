/**
 * Auth Factory
 * @namespace Factories
 */
(function(){
	'use strict';

	/**
	 * @name AuthService
	 * @desc Auth Resource Service (REST)
	 * @memberOf Factories
	 * @returns {Object} Auth Service public methods (e.g. getAuthInfo)
	**/
	module.exports = function($http, $localStorage, global){
//        $http.defaults.headers.post.ContentType = 'application/json';

		var tokenClaims = getClaimsFromToken();

		return {
			signup: function (data, success, error) {
               $http.post(global.BASE + '/register', data).success(success).error(error)
			},
			signin: function (data, success, error) {
			   $http.post(global.BASE + '/login', data).success(success).error(error)
			},
			logout: function (success) {
			   tokenClaims = {};
			   delete $localStorage.token;
			   success();
			},
			getTokenClaims: function () {
			   return tokenClaims;
			}
		}

		//Utility Methods
		function urlBase64Decode(str){
			var output = str.replace('-', '+').replace('_', '/');

			switch(output.length % 4){
				case 0:
					break;
				case 2:
					output += '==';
					break;
				case 3:
					output += '=';
					break;
				default:
					throw 'Illegal base64url string!';
			}
			return window.atob(output);
		}

		function getClaimsFromToken(){
			var token = $localStorage.token;
			var user = {};
			if(typeof token !== 'undefined'){
				var encoded = token.split('.')[1];
				user = JSON.parse(urlBase64Decode(encoded));
			}
			return user;
		}
	};
})();
