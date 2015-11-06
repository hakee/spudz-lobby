/**
 * Loader Directive
 * @namespace Directives
*/
(function(){
	'use strict';

	/**
	 * @name LngLoader
	 * @desc Angular Directive
	 * @returns nGular compiled loader.view.html template
	**/
	module.exports = function(){
		return {
			restrict : 'EA',
			templateUrl : '/shared/loader/loader.view.html',
			controller : 'LoaderController',
			controllerAs : 'vm'
		};
	};
})();