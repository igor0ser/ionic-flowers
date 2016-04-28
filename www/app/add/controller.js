(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('AddCtrl', function($scope, $state, ls, model, notif, $ionicPlatform) {
		$scope.flower = {
			name: '',
			interval: ''
		};

		$ionicPlatform.ready(function () {
			$scope.add = function(){
				var newFlower = {};
				angular.copy($scope.flower, newFlower);
				newFlower.id = '' + (new Date().getTime());
				newFlower.photo = 'img/def-plant.jpg';

				notif(newFlower, model.time);
				model.flowers.push(newFlower);
				ls.set();

				$scope.flower.name = '';
				$scope.flower.interval = '';
				$state.go('tab.flowers');
			};
		});

});

})();
