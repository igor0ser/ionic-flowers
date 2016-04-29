(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('AddCtrl', function($scope, $state, ls, model, nextWatering, $ionicPlatform, $cordovaLocalNotification) {
		$scope.flower = {
			name: '',
			interval: ''
		};

		$ionicPlatform.ready(function () {
			$scope.add = function(){
				var flower = {};
				angular.copy($scope.flower, flower);
				flower.id = '' + (new Date().getTime());
				flower.photo = 'img/def-plant.jpg';

				$scope.flower.name = '';
				$scope.flower.interval = '';
				$state.go('tab.flowers');


				$cordovaLocalNotification.schedule({
					id: +flower.id,
					title: 'Water you flower',
					text: "Don't forget to water " + flower.name,
					at: nextWatering(flower, model.time.hours, model.time.minutes),
					data: {
						id: flower.id
					}
				}).then(function (result) {
					console.log('Notification added');
				});

				model.flowers.push(flower);
				ls.set();
			};
		});

});

})();
