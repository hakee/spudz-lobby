/**
 * Register Controller
 * @namespace Controllers
 */
(function(){
	'use strict';

	module.exports = function($rootScope, $scope, $location, $localStorage, Auth){
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
            var regData = $scope.user;
            Auth.signup(regData, successAuth, function () {
		       $rootScope.error = 'Failed to signup';
		  	});
        }

		function successAuth(res) {
           if(res.success === true) {
               $rootScope.$state.transitionTo('login')
           } else {
               alert(res.message);
           }
		};
	};
}());
