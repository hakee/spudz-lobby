(function(module) {
try {
  module = angular.module('woodstockTemplates');
} catch (e) {
  module = angular.module('woodstockTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/homepage/homepage.view.html',
    '<div class="home-page">\n' +
    '	<div snapscroll fit-window-height style="overflow:hidden!important;" snap-index="snapIndex" snap-animation="animation" before-snap="snapped(snapIndex)" after-snap="snapped(snapIndex)" scroll-delay="800">\n' +
    '	    <div class="section" style="background-image: url(\'/images/featured-project-1.jpg\');" ng-repeat="slide in slides">\n' +
    '	    	<div class="section-content">\n' +
    '		        <div class="intro" ng-show="currentSlide === slide">\n' +
    '		            <h2>Rainbow <strong>apartment</strong></h2>\n' +
    '		            <p>Ingeniozitate, functionalitate, spatii gandite si explozie de culoare. O locuinta pe masura personalitatilor fulminante si entuziaste ale beneficiarilor.</p>\n' +
    '		            <a href="#" class="arrow-link">View case study</a>\n' +
    '		        </div>\n' +
    '		    </div>\n' +
    '	    </div>\n' +
    '	</div>\n' +
    '	<ul class="indicators">\n' +
    '      <li ng-repeat="n in [0,1,2]">\n' +
    '        <a href="#" class="effect" ng-click="$parent.snapIndex=n" ng-class="{active: snapIndex == n}"></a>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('woodstockTemplates');
} catch (e) {
  module = angular.module('woodstockTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/studio/studio.view.html',
    '<div class="home-page">\n' +
    '	<h5>Studio</h5>\n' +
    '	 <div>\n' +
    '    	<img src="/images/featured-project-4.jpg">\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('woodstockTemplates');
} catch (e) {
  module = angular.module('woodstockTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/loader/loader.view.html',
    '<div class="loader">\n' +
    '	<div class="wrap">\n' +
    '		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '		 width="150px" height="180px" viewBox="0 0 150 180" enable-background="new 0 0 150 180" xml:space="preserve">\n' +
    '	<path fill-rule="evenodd" clip-rule="evenodd" fill="#414042" d="M75.266,148.509h0.174c6.747-0.229,12.862-1.788,18.342-4.613\n' +
    '		c5.94-3.172,10.611-7.499,14.072-13.092h35.816c-6.056,15.514-15.11,27.625-27.165,36.219\n' +
    '		c-11.883,8.479-25.608,12.747-41.181,12.862h-0.059V148.509z"/>\n' +
    '	<path fill-rule="evenodd" clip-rule="evenodd" fill="#414042" d="M75.266,31.025c-0.633,0-1.326-0.058-2.018-0.058\n' +
    '		c-8.825,0-16.726,2.709-23.704,8.074c-7.037,5.364-11.767,12.399-14.189,21.108h39.911v26.359H34.202\n' +
    '		c1.096,10.266,5.249,18.397,12.284,24.281c7.036,5.94,16.149,8.939,27.28,8.939c0.519,0,1.039-0.058,1.5-0.058v31.433h-0.577\n' +
    '		c-10.669,0-20.416-1.846-29.356-5.652c-8.939-3.749-16.956-9.343-24.108-16.668c-6.69-6.979-11.939-15.11-15.63-24.281\n' +
    '		C1.846,95.274,0,85.816,0,76.127c0-9.921,1.73-19.264,5.133-28.031c3.403-8.825,8.421-16.726,15.111-23.705\n' +
    '		c7.21-7.671,15.457-13.612,24.627-17.764c9.17-4.152,18.572-6.229,28.377-6.229c0.692,0,1.384,0,2.018,0.058V31.025z"/>\n' +
    '	<path fill-rule="evenodd" clip-rule="evenodd" fill="#414042" d="M112.93,88.988c-2.828-9.516-7.614-16.727-14.362-21.744\n' +
    '		c-6.113-4.499-13.727-6.979-22.782-7.382h-0.52V29.237l0.693,0.057c11.304,0.346,21.975,3.115,31.895,8.363\n' +
    '		c10.726,5.594,19.84,13.554,27.395,23.704c4.558,6.172,7.96,13.035,10.151,20.649c2.192,7.612,3.345,16.322,3.345,26.185\n' +
    '		c0,0.749-0.058,1.961-0.173,3.577c-0.056,1.614-0.114,2.766-0.114,3.574H75.555h-0.289V88.988h0.404H112.93z"/>\n' +
    '	<circle class="path" cx="75px" cy="90px" r="75" fill="none" stroke-width="4"></circle>\n' +
    '	</svg>\n' +
    '\n' +
    '\n' +
    '	</div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('woodstockTemplates');
} catch (e) {
  module = angular.module('woodstockTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/menu/menu.view.html',
    '<div class="overlay" ng-hide="!menuVisible">\n' +
    '    <nav ng-hide="!animateMenu">\n' +
    '        <ul>\n' +
    '            <li><a ui-sref="studio" ng-click="toggleMenu()">Studio</a></li>\n' +
    '            <li><a ui-sref="portofolio">Portofolio</a></li>\n' +
    '            <li><a href="journal.html">Journal</a></li>\n' +
    '            <li><a href="contact.html">Contact</a></li>\n' +
    '        </ul>\n' +
    '    </nav>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('woodstockTemplates');
} catch (e) {
  module = angular.module('woodstockTemplates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/shared/navbar/navbar.view.html',
    ' <div class="menu-link navbar-right">\n' +
    '    <a class="menu-btn overlay-close">\n' +
    '        <svg height="40" version="1.1" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" animated-svg data-toggle="true" ng-click="toggleMenu()">\n' +
    '            <g>\n' +
    '                <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="M5.0916789,20.818994C5.0916789,20.818994,58.908321,20.818994,58.908321,20.818994"></path>\n' +
    '                <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="m 5.1969746,31.909063 53.8166424,0" transform="matrix(1,0,0,1,0,0)" style="opacity: 1;"></path>\n' +
    '                <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="M5.0916788,42.95698C5.0916788,42.95698,58.908321,42.95698,58.908321,42.95698"></path>\n' +
    '            </g>\n' +
    '        </svg>\n' +
    '    </a>\n' +
    '</div>');
}]);
})();
