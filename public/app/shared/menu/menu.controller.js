(function(){
	'use strict';

	module.exports = function($rootScope, $scope, $timeout, $localStorage, Auth, Player){
		var vm = this;
		$scope.loaderActive = false;
        $scope.doLogout = doLogout;

        activate();

        function activate(){
            if($localStorage.token){
                $rootScope.isAuthenticated = true;
            } else {
                $rootScope.isAuthenticated = false;
            }
        }

        function doLogout(){
            Auth.logout(successLogout);
        }

        function successLogout() {
            $rootScope.isAuthenticated = false;
            $rootScope.$state.transitionTo('login');
		};
	}
})();
