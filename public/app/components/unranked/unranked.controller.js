(function(){
	'use strict';

	module.exports = function($scope, $websocket, Comms){
		Comms.addStateChangeListener(function(newState) {
			console.log('currentState', newState);
			$scope.currentState = newState;
			$scope.$digest();
		});

		$scope.findMatch = function(){
			Comms.findMatch();
		}

		$scope.readyUp = function(){
			Comms.ready();
		}
	};
})();
