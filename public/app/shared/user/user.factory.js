(function(){
	'use strict';
	module.exports = function($http, global){

        return {
			getPlayer : getPlayer,
		};


		/* All Tournaments Info HTTP Rest Call wrapper function*/
		function getPlayer(){
			return $http.get( global.BASE_API + '/' )
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
