(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/homepage/homepage.view.html',
    '<div class="content-wrapper">\n' +
    '        <a ui-sref="unranked">Unranked</a>\n' +
    '        <a ui-sref="tournaments">Tournaments</a>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/tournaments/tournaments.view.html',
    '<div class="content-wrapper">\n' +
    '       <h5>Tournaments</h5>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/unranked/unranked.view.html',
    '<div class="content-wrapper">\n' +
    '   <h5>Unranked Game</h5>\n' +
    '\n' +
    '   <div class="centered_container">\n' +
    '	   <div class="hidden centered">\n' +
    '	   	<button class="btn" ng-click="playUnranked()">Find match</button>\n' +
    '	   </div>\n' +
    '\n' +
    '	   <div class="hidden centered">\n' +
    '	   	<div class="message">Searching for a match ...</div>\n' +
    '	   </div>\n' +
    '\n' +
    '	   <div class="hidden centered">\n' +
    '	   	<div class="message">Match found! Press start when you are ready to start!</div>\n' +
    '	   	<button class="btn" ng-click="readyUp()">Start</button>\n' +
    '	   </div>\n' +
    '\n' +
    '	   <div class="hidden">\n' +
    '	   	<div id="content"></div>\n' +
    '	   </div>\n' +
    '	  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/loader/loader.view.html',
    '<div class="loader">\n' +
    '    <div class="overlay"></div>\n' +
    '	<div class="wrap">\n' +
    '		<img src="images/logo.png" width="300px">\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/login/login.view.html',
    '<div class="login">\n' +
    '    <div class="login-form">\n' +
    '        <div class="big-branding">\n' +
    '            <img src="/images/logo.png">\n' +
    '        </div>\n' +
    '        <div class="form-wrap">\n' +
    '            <div class="form-control">\n' +
    '                <input type="text" ng-model="user.email" placeholder="Email">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <input type="password" ng-model="user.password" placeholder="Password">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <button ng-click="authMe()">Login</button>\n' +
    '            </div>\n' +
    '            <span class="choice">Not a Spudzer yet?</span>\n' +
    '            <div>\n' +
    '                <a ui-sref="register">Join the adventure</a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/menu/menu.view.html',
    '<div class="nav-wrapper" ng-hide="!isAuthenticated">\n' +
    '    <div class="spudz-branding">\n' +
    '        <a ui-sref="home">\n' +
    '            <img src="/images/logo.png">\n' +
    '        </a>\n' +
    '    </div>\n' +
    '    <nav>\n' +
    '        <ul>\n' +
    '            <li><a ui-sref="homepage" ui-sref-active="active">Spudzboard</a></li>\n' +
    '            <li><a ui-sref="unranked" ui-sref-active="active">Unranked <span class="label">35</span></a></li>\n' +
    '            <li><a ui-sref="tournaments" ui-sref-active="active">Tournaments</a></li>\n' +
    '        </ul>\n' +
    '    </nav>\n' +
    '    <div class="profile">\n' +
    '        <a href="profile">{{globalPlayerInfo.firstName}}</a>\n' +
    '        <span class="vdelimiter"></span>\n' +
    '        <a class="logout" ng-click="doLogout()"><i class="icon-power"></i></a>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/register/register.view.html',
    '<div class="register">\n' +
    '    <div class="register-form">\n' +
    '        <div class="big-branding">\n' +
    '            <img src="/images/logo.png">\n' +
    '        </div>\n' +
    '        <div class="form-wrap">\n' +
    '            <div class="form-control">\n' +
    '                <input type="text" ng-model="user.firstName" placeholder="First name">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <input type="text" ng-model="user.lastName" placeholder="Last name">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <input type="text" ng-model="user.email" placeholder="Email">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <input type="password" ng-model="user.password" placeholder="Password">\n' +
    '            </div>\n' +
    '            <div class="form-control">\n' +
    '                <button ng-click="signMeUp()">Register</button>\n' +
    '            </div>\n' +
    '            <span class="choice">You\'re a Spudzer?</span>\n' +
    '            <div>\n' +
    '                <a ui-sref="login">Enter the world</a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();
