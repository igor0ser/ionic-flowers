(function(){
	'use strict';

	var app = angular.module('app', ['ionic', 'ngCordova', 'ionic-timepicker']);

	app.run(function($ionicPlatform, ls, $rootScope, $cordovaVibration) {
		ls.get();

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {
				console.log('$cordovaLocalNotification:trigger');
				console.dir(notification);
				$cordovaVibration.vibrate(1000);
			});

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