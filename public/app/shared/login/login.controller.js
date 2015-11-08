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
	module.exports = function($rootScope, $scope, $location, $localStorage, Auth, Player){
		var vm = this;

        $scope.user = {
            email : null,
            password : null
        }

        $scope.authMe = authMe;

		//Resolve start-up logic for a controller in this activate function.
		 activate();

		function activate(){
            if($localStorage.token){
               $rootScope.$state.go('homepage');
            }
		};

        function authMe () {
            var loginData = $scope.user;

            Auth.signin(loginData, successAuth, errorAuth);
        }

        function successAuth(res) {
            if(res.success === true){
                $localStorage.token = res.token;
                $rootScope.isAuthenticated = true;
                Player.getPlayer(res.token)
                    .then(function (player) {
                    $rootScope.globalPlayerInfo = player;
                    $rootScope.$state.go('homepage');
                });
            } else {
                alert(res.message);
            }
		}

        function errorAuth(res) {
            console.log(res);
        }
	};
}());
