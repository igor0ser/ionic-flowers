(function(){
	'use strict';

	var app = angular.module('app', ['ngCordova', 'ionic']);

	app.run(function($ionicPlatform, ls) {
		ls.get();

		$ionicPlatform.ready(function() {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
		
	});

})();