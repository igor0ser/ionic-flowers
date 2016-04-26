(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('AddCtrl', function($scope, $rootScope, $state, ls, model, $cordovaLocalNotification, $ionicPlatform) {
		$scope.flower = {
			name: '',
			days: ''
		};

		$ionicPlatform.ready(function () {
			$scope.add = function(){
				var newFlower = {};
				angular.copy($scope.flower, newFlower);
				newFlower.id = '' + new Date().getTime();
				newFlower.photo = 'img/def-plant.jpg';
				model.flowers.push(newFlower);
				ls.set(model);
				$scope.flower.name = '';
				$scope.flower.days = '';
				$state.go('tab.flowers');


				var now = new Date().getTime();
				var _10SecondsFromNow = new Date(now + 10 * 1000);

				$cordovaLocalNotification.schedule({
					id: +newFlower.id,
					title: 'Water you flower',
					text: "Don't forget to water " + newFlower.name,
					at: _10SecondsFromNow,
					data: {
						flower: newFlower.name
					}
				}).then(function (result) {
					console.log('$cordovaLocalNotification ok');
				});
			};
		});
});

})();