(function(){
	'use strict';

	module.exports = function($scope, $localStorage, Player){
		var vm 				= this;

		activate();

		function activate(){
            getMyInfo();
		}

        function getMyInfo() {
            Player.getPlayer($localStorage.token)
                .then(function (player) {
                $scope.$parent.globalPlayerInfo = player;
            });
        }
	};
}());
