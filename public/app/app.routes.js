(function(){
	'use strict';

	module.exports = function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('homepage', {
				url : '/',
				views : {
					'main-view': {
						controller : 'HomepageController',
						templateUrl : '/components/homepage/homepage.view.html'
					}
				}
			});
	}
})();