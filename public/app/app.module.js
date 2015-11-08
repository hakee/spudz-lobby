/**
* Spudz application
* Main Application Module
* @namespace Module
*/
(function(){
	'use strict';

    global.jQuery   	    = require('jquery');
    global._                = require('underscore');
//    global.Snap             = require('snapsvg');

//    require('../assets/animated-svg/js/svgicons.js');

    var angular     	    = require('angular');
    require('angular-ui-router');
    require('angular-bootstrap');
    require('angular-animate');
    require('angular-jwt');
    require('ngstorage');

    require('../assets/js/ng-websocket/ngsockets.js');

    //Global config
    require('./app.config');

    //Template partials
    require('../dist/partials/templateCachePartials');

    //Routes
    var appRoutes  		    = require('./app.routes');

    //Websocket
    var appSocket           = require('./app.sockets');

    //Controllers
    var homepageCtrl 	    = require('./components/homepage/homepage.controller'),
        unrankedCtrl        = require('./components/unranked/unranked.controller'),
        tournamentCtrl      = require('./components/tournaments/tournaments.controller');

    //Shared
    ///Menu
    var menuCtrl            = require('./shared/menu/menu.controller');
    var menuDirective       = require('./shared/menu/menu.directive');

    ///Loader
    var loaderCtrl          = require('./shared/loader/loader.controller');
    var loaderDirective     = require('./shared/loader/loader.directive');

    ///Login
    var loginCtrl           = require('./shared/login/login.controller'),
        registerCrl         = require('./shared/register/register.controller');


    //Services
    ///Auth Factory
	var authService = require('./shared/auth'),
        userService = require('./shared/user/user.factory');

	angular
		.module('Spudz', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngWebsocket','angular-jwt', 'ngStorage', 'Spudz.Config', 'spudzTemplates'])
		.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', appRoutes])

        .factory('Auth', ['$http', '$localStorage', 'global', authService])



        .factory('Player', ['$http', '$localStorage', 'global', userService])

		.controller('HomepageController', ['$scope', homepageCtrl])
        .controller('UnrankedController', ['$scope', unrankedCtrl])
        .controller('TournamentController', ['$scope', tournamentCtrl])

        //Shared
        .controller('MenuController', ['$rootScope', '$scope', '$timeout', '$localStorage', 'Auth', 'Player', menuCtrl])
        .controller('LoaderController', ['$scope', loaderCtrl])
        .controller('LoginController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', 'Player', loginCtrl])
        .controller('RegisterController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', registerCrl])
        .directive('wsMenu', menuDirective)
        .directive('loader', loaderDirective)

        .config(['$localStorageProvider', function ($localStorageProvider) {
                $localStorageProvider.setKeyPrefix('spudz');
        }])
        .run(['$websocket', appSocket])

        .run(['$rootScope', '$state', '$stateParams', 'Auth', function($rootScope, $state, $stateParams, Auth) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
//                if(toState.name !== 'register' || toState.name !== 'login'){
//                    if(!$rootScope.isAuthenticated){
//                        $state.go('login');
//                    } else {
//                        if(_.isEmpty($rootScope.globalPlayerInfo) || _.isUndefined($rootScope.globalPlayerInfo)){
//                            $rootScope.globalPlayerInfo = Auth.getTokenClaims();
//                        }
//                    }
//                }
            });
        }]);
})();
