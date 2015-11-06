(function(){
	'use strict';

	module.exports = function($scope, $timeout){
		var vm = this;
		$scope.menuVisible = false;
		$scope.animateMenu = false;

		$scope.toggleMenu = toggleMenu;

		function toggleMenu(ctrl){
			if(ctrl === undefined){
				$scope.$emit('animateBurger');
				if(!$scope.menuVisible){
					$scope.menuVisible = true;
					$timeout(function(){
						$scope.animateMenu = true;
					}, 200);
				} else {
					$scope.animateMenu = false;
					$timeout(function(){
						$scope.menuVisible = false;
					}, 200);
				}
			} else {
				if(!ctrl){
					$scope.animateMenu = false;
					$timeout(function(){
						$scope.menuVisible = false;
					}, 200);
				} else {
					$scope.menuVisible = true;
					$timeout(function(){
						$scope.animateMenu = true;
					}, 200);
				}
			}
		}
	}
})();