/**
* Spudz application
* Main Application Module
* @namespace Module
*/
(function(){
	'use strict';

    global.jQuery   	    = require('jquery');
    global._                = require('underscore');
    global.Snap             = require('snapsvg');

//    require('../assets/animated-svg/js/svgicons.js');

    var angular     	    = require('angular');
    require('angular-ui-router');
    require('angular-bootstrap');
    require('angular-animate');
    require('../assets/js/ng-websocket/ngsockets.js');

//    require('../assets/js/angular-snapscroll/angular-snapscroll');

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
    //1. Menu
    var menuCtrl            = require('./shared/menu/menu.controller');
    var menuDirective       = require('./shared/menu/menu.directive');

    //3. Loader
    var loaderCtrl          = require('./shared/loader/loader.controller');
    var loaderDirective     = require('./shared/loader/loader.directive');

	angular
		.module('Spudz', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngWebsocket', 'spudzTemplates'])
		.config(['$stateProvider', '$urlRouterProvider', appRoutes])

		.controller('HomepageController', ['$scope', homepageCtrl])
        .controller('UnrankedController', ['$scope', unrankedCtrl])
        .controller('TournamentController', ['$scope', tournamentCtrl])

        //Shared
        .controller('MenuController', ['$scope', '$timeout', menuCtrl])
        .controller('LoaderController', ['$scope', loaderCtrl])
        .directive('wsMenu', menuDirective)
        .directive('loader', loaderDirective)

        .run(['$websocket', appSocket]);
})();
