(function(){
	'use strict';

	module.exports = function($rootScope, $scope, $timeout, $localStorage, Auth, Player){
		var vm = this;
		$scope.loaderActive = false;
        $scope.doLogout = doLogout;

        activate();

        function activate(){
            if($localStorage.token){
                if(_.isEmpty($rootScope.globalPlayerInfo) || _.isUndefined($rootScope.globalPlayerInfo)){
                    Player.getPlayer($localStorage.token)
                        .then(function (player) {
                        $rootScope.globalPlayerInfo = player;
                        $rootScope.isAuthenticated = true;
                    });
                }
            } else {
                $rootScope.isAuthenticated = false;
            }
        }

        function doLogout(){
            Auth.logout(successLogout);
        }

        function successLogout() {
            $rootScope.isAuthenticated = false;
            $rootScope.globalPlayerInfo = {};
            $rootScope.$state.transitionTo('login');
		};
	}
})();
