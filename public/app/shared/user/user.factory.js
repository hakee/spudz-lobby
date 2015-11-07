(function(){
	'use strict';
	module.exports = function($http, $localStorage, global){

        return {
			getPlayer : getPlayer,
		};


		/* All Tournaments Info HTTP Rest Call wrapper function*/
		function getPlayer(token){
			return $http.get( global.BASE_API + '/me?token=' + token)
				.then(getPlayerSuccess)
				.catch(getPlayerFailed);

			function getPlayerSuccess(response){
				return response.data;
			}

			function getPlayerFailed(error){
				return false;
			}
		}
	};
})();
