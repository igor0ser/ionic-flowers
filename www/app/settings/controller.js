(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('SettingsCtrl', function($scope, model, ionicTimePicker, notif, ls) {
		
		$scope.time = model.time;


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

					for (var i = 0; i < model.flowers.length; i++) {
						notif(model.flowers[i], $scope.time);
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
		$scope.refresh = function(){
			ls.refresh();
		};

		
	});
})();