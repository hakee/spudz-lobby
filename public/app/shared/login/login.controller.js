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
            var loginData = $scope.user;

            Auth.signin(loginData, successAuth, function () {
		       $rootScope.error = 'Invalid credentials.';
		  	});
        }

        function successAuth(res) {
            if(res.success === true){
                $localStorage.token = res.token;
                $rootScope.$state.transitionTo('homepage');
            } else {
                alert(res.message);
            }
		};
	};
}());
