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
			})
            .state('unranked', {
                url : '/unranked',
                views : {
                    'main-view': {
                        controller : 'UnrankedController',
                        templateUrl : '/components/unranked/unranked.view.html'
                    }
                }
            })
            .state('tournaments', {
                url : '/tournaments',
                views : {
                    'main-view': {
                        controller : 'TournamentController',
                        templateUrl : '/components/tournaments/tournaments.view.html'
                    }
                }
            })

	}
})();
