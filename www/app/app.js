(function(){
	'use strict';

	var app = angular.module('app', ['ionic', 'ngCordova', 'ionic-timepicker']);

	app.run(function($ionicPlatform, ls, $rootScope, $cordovaVibration, model) {
		ls.get();

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {
				console.log('$cordovaLocalNotification:trigger');
				console.dir(notification);
				$cordovaVibration.vibrate(1000);

				if (notification.id == 555) return;
				if (notification.id == 777){
					var now = new Date().getTime();
					var date = new Date(now + 10* 60 * 1000).getTime();
					$cordovaLocalNotification.schedule({
						id: 777,
						title: 'delayed notific',
						text: 'ok',
						at: date
					}).then(function (result) {
						console.log('testing notif prolonged');
					});
				}

				var flower;
				for (var i = 0; i < model.flowers.length; i++) {
					if (model.flowers[i].id == notification.id){
						flower = model.flowers[i];
					}
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