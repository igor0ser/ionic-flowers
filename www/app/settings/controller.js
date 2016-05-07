(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('SettingsCtrl', function($scope, model, ionicTimePicker, ls, $cordovaLocalNotification, $ionicPlatform, nextWatering, $window) {
		
		$scope.time = model.time;

		$ionicPlatform.ready(function () {
			var options = {
				callback: function (val) {
					if (typeof (val) === 'undefined') {
						console.log('Time not selected');
					} else {
						var selectedTime = new Date(val * 1000);
						$scope.time.hours = selectedTime.getUTCHours();
						$scope.time.minutes = selectedTime.getUTCMinutes();
						ls.set();
						options.inputTime = $scope.time.hours * 3600 + $scope.time.minutes;

						var flowers = model.flowers;
						console.log(model.flowers);

						for (var i = 0; i < model.flowers.length; i++) {
							model.flowers[i].notification = nextWatering(model.flowers[i], model.time.hours, model.time.minutes);
							$cordovaLocalNotification.update({
								id: model.flowers[i].id,
								at: nextWatering(model.flowers[i], model.time.hours, model.time.minutes)
							}).then(function (result) {
								console.log('Notification updated');
								ls.set();
							});
						}

					}
				},
				inputTime: $scope.time.hours * 3600 + $scope.time.minutes,
				format: 24,
				step: 15,
			};


			$scope.setTime = function(){
				ionicTimePicker.openTimePicker(options);
			};

/*			$scope.test = function(){
				console.log('start');
				window.mySuperPluginMethod('ooo', function() {console.log('success')}, function(){console.log('error')});
				console.log('end');
			};
			
			console.log('window testing');
			console.log(window.mySuperPluginMethod.toString);
*/




/*			var i = 0;
			var _id = 555;
			$scope.setN = function(){
				var now = new Date().getTime();
				var date = new Date(now + 10 * 1000).getTime();
				$cordovaLocalNotification.schedule({
					id: _id,
					title: 'Testing notification',
					text: 'oooo #' + i,
					at: date,
					data: {}
				}).then(function (result) {
					console.log('Notification added');
					i++;
				});
			};
			$scope.updateN = function(){
				$cordovaLocalNotification.update({
					id: _id,
					title: 'Testing notification - UPDATED',
					text: 'aaaiii'
				}).then(function (result) {
					console.log('Notification updated');
				});
			};
			$scope.removeN = function(){
				$cordovaLocalNotification.cancel(_id)
				.then(function (result) {
					console.log('Notification removed');
				});
			};
			$scope.removeLS = function(){
				$window.localStorage.removeItem('my_flowers_list_account_for_ionic_application');
			};
			$scope.reload = function() {
				$window.location.reload();
			};*/

		});
	});
})();