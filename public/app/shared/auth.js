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
		return {
			signup: function (data, success, error) {
               $http.post(global.BASE + '/register', data).success(success).error(error)
			},
			signin: function (data, success, error) {
			   $http.post(global.BASE + '/login', data).success(success).error(error)
			},
			logout: function (success) {
			   delete $localStorage.token;
			   success();
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
	};
})();
