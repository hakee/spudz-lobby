(function(module) {
try {
  module = angular.module('spudzTemplates');
} catch (e) {
  module = angular.module('spudzTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/unranked/unranked.view.html',
    '<div class="content-wrapper">\n' +
    '   <h5>Unranked</h5>\n' +
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
  $templateCache.put('/shared/register/register.view.html',
    '<div class="register">\n' +
    '    <div class="register-form">\n' +
    '        <input type="text" ng-model="user.firstName" placeholder="First name">\n' +
    '        <input type="text" ng-model="user.lastName" placeholder="Last name">\n' +
    '        <input type="text" ng-model="user.email" placeholder="Email">\n' +
    '        <input type="password" ng-model="user.password" placeholder="Password">\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <button ng-click="signMeUp()">Register</button>\n' +
    '    </div>\n' +
    '    <a ui-sref="login">Login</a>\n' +
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
    '        <input type="text" ng-model="user.email" placeholder="Email">\n' +
    '        <input type="password" ng-model="user.password" placeholder="Password">\n' +
    '    </div>\n' +
    '    <div>\n' +
    '        <button ng-click="authMe()">Login</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <a ui-sref="register">Create your Spudz account</a>\n' +
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
