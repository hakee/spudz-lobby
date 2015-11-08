(function(){
	'use strict';

	module.exports = function($stateProvider, $urlRouterProvider, $httpProvider){
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
            .state('profile', {
                url : '/profile',
                views : {
                    'main-view' : {
                        controller : 'ProfileController',
                        templateUrl : '/components/profile/profile.view.html'
                    }
                }
            })
            .state('login', {
                url : '/login',
                views : {
                    'main-view': {
                        controller : 'LoginController',
                        templateUrl : '/shared/login/login.view.html'
                    }
                }
            })
            .state('register', {
                url : '/register',
                views : {
                    'main-view': {
                        controller : 'RegisterController',
                        templateUrl : '/shared/register/register.view.html'
                    }
                }
            });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};

                    if ($localStorage.token) {
                        config.headers['X-Access-Token'] = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
	}
})();
