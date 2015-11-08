(function(){
	'use strict';

	module.exports = function($scope, $websocket, Comms){
		Comms.addStateChangeListener(function(newState) {
			console.log('currentState', newState);
			$scope.currentState = newState;

			$scope.showFindMatch = false;
			$scope.showSearching = false;
			$scope.showReady = false;
			$scope.showClient = false;
			$scope.showWaitingOp = false;

			switch(newState) {
				case 'beginReadyProcess':
					$scope.showReady = true;
					break;

				case 'beginGame':
					$scope.showClient = true;
					break;

			}

			$scope.$digest();
		});

		$scope.showFindMatch = true;
		$scope.showSearching = false;
		$scope.showReady = false;
		$scope.showClient = false;
		$scope.showWaitingOp = false;

		$scope.findMatch = function(){
			$scope.showFindMatch = false;
			$scope.showSearching = true;
			Comms.findMatch();
		}

		$scope.readyUp = function(){
			$scope.showReady = false;
			$scope.showWaitingOp = true;
			Comms.ready();
		}
	};
})();
