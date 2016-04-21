(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('AddCtrl', function($scope, $rootScope, $state, ls, model) {
		$scope.flower = {
			name: '',
			days: ''
		};

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
		};
});

})();