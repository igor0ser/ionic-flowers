(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('SettingsCtrl', function($scope, model, ionicTimePicker, ls) {
		$scope.time = model.time;


		var options = {
			callback: function (val) {
				if (typeof (val) === 'undefined') {
					console.log('Time not selected');
				} else {
					var selectedTime = new Date(val * 1000);
					console.log('time is selected');
					console.log(val);
					console.log(selectedTime);
					$scope.time.hours = selectedTime.getUTCHours();
					$scope.time.minutes = selectedTime.getUTCMinutes();
					
					console.log($scope.time);
					console.log(model);
					ls.set();
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