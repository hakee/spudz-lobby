/**
* Spudz application
* Main Application Module
* @namespace Module
*/
(function(){
	'use strict';

    global.jQuery   	    = require('jquery');
    global.Snap             = require('snapsvg');

//    require('../assets/animated-svg/js/svgicons.js');

    var angular     	    = require('angular');
    require('angular-ui-router');
    require('angular-animate');
    require('../assets/js/angular-snapscroll/angular-snapscroll');

    //Template partials
    require('../public/partials/templateCachePartials');

    //Routes
    var appRoutes  		    = require('./app.routes');

    //Controllers
    var homepageCtrl 	    = require('./components/homepage/homepage.controller');

    //Shared
    //1. Menu
    var menuCtrl            = require('./shared/menu/menu.controller');
    var menuDirective       = require('./shared/menu/menu.directive');

    //3. Loader
    var loaderCtrl          = require('./shared/loader/loader.controller');
    var loaderDirective     = require('./shared/loader/loader.directive');

	angular
		.module('Spudz', ['ui.router', 'ngAnimate', 'snapscroll', 'spudzTemplate'])
		.config(['$stateProvider', '$urlRouterProvider', appRoutes])

		.controller('HomepageController', ['$scope', homepageCtrl])

        //Shared
        .controller('MenuController', ['$scope', '$timeout', menuCtrl])
        .controller('LoaderController', ['$scope', loaderCtrl])
        .directive('wsMenu', menuDirective)
        .directive('loader', loaderDirective);
    directive('blabla')
})();