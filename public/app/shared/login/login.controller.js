/**
 * Login Controller
 * @namespace Controllers
 */
(function(){
	'use strict';

	/**
	 * @name LoginController
	 * @desc LoginController
	 * @params {Object} $scope - Angular $scope
	 * @memberOf Controllers
	 * @returns {Object} LoginController
	**/
	module.exports = function($rootScope, $scope, $location, $localStorage, Auth){
		var vm = this;

        $scope.user = {
            email : null,
            password : null
        }

        $scope.authMe = authMe;

		//Resolve start-up logic for a controller in this activate function.
		// activate();

		function activate(){

		};

        function authMe () {
            console.log($scope.user.email);
            console.log($scope.user.password);
        }
	};
}());
