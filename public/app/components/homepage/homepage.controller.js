(function(){
	'use strict';

	module.exports = function($rootScope, $scope){
		var vm 				= this;

		activate();

		function activate(){
            if($rootScope.isAuthenticated){
                $rootScope.$state.go('unranked');
            }
		}
	};
}());
