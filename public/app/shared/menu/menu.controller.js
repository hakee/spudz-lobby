(function(){
	'use strict';

	module.exports = function($scope, $timeout, Player){
		var vm = this;
		$scope.loaderActive = false;

        activate();

        function activate(){
            Player.getPlayer()
                .then(function (result) {
                console.log(result);
            });
        }
	}
})();
