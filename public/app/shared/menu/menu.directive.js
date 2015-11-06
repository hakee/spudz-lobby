(function(){
	'use strict';

	module.exports = function(){
		return {
			restrict : 'EA',
			templateUrl : '/shared/menu/menu.view.html',
			controller : 'MenuController',
			controllerAs : 'vm',
			link : function(scope, element, attributes){

			}
		};
	}
})();