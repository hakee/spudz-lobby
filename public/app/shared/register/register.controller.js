/**
 * Register Controller
 * @namespace Controllers
 */
(function(){
	'use strict';

	module.exports = function($rootScope, $scope, $location, $localStorage, Register){
		var vm = this;

        $scope.user = {
            firstName : null,
            lastName : null,
            email : null,
            password : null
        }

        $scope.signMeUp = signMeUp;

		//Resolve start-up logic for a controller in this activate function.
		// activate();

		function activate(){

		};

        function signMeUp () {
            console.log($scope.user.firstName);
            console.log($scope.user.lastName);
            console.log($scope.user.email);
            console.log($scope.user.password);
        }
	};
}());
