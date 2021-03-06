/**
 * Spudz Global Config
 * @namespace Global
 */
(function(){
	'use strict';

	var angular = require('angular');
    var baseURL = "http://localhost:8000";

	module.exports = angular.module('Spudz.Config', [])
		.constant('global',  {
			appVersion : '0.0.1',
			BASE : baseURL,
			BASE_API : baseURL + '/api'
		})
		.constant('AUTH_EVENTS', {
			loginSuccess : 'auth-login-success',
			loginFailed : 'auth-login-failed',
			logoutSuccess : 'auth-logout-success',
			sessionTimeout : 'auth-session-timeout',
			notAuthenticated : 'auth-not-authenticated',
			notAuthorized : 'auth-not-authorized'
		});
}());
