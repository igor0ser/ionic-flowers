(function(){
	'use strict';

	var app = angular.module('app', ['ionic', 'ngCordova', 'ionic-timepicker']);

	app.run(function($ionicPlatform, ls, $rootScope, $cordovaVibration, model, $cordovaLocalNotification, nextWatering) {
		ls.get();

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {

				$cordovaVibration.vibrate(1000);

				var flower;
				for (var i = 0; i < model.flowers.length; i++) {
					if (model.flowers[i].id == notification.id){
						flower = model.flowers[i];
					}
				}

				if(!flower){
					console.log('some error in updating notification happened');
					return;
				}

				$cordovaLocalNotification.schedule({
					id: +flower.id,
					title: 'Water you flower',
					text: "Don't forget to water " + flower.name,
					at: nextWatering(flower),
					data: {
						id: flower.id
					}
				}).then(function (result) {
					console.log('Notification added');
				});
				ls.set();
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