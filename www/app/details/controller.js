(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', function($scope, $stateParams, model) {
		for (var i = 0; i < model.flowers.length; i++) {
			if ($stateParams.flowerId == model.flowers[i].id){
				$scope.flower = model.flowers[i];
			}
		}
		$scope.flower.created = new Date(+$scope.flower.id).toLocaleString("ua");
	});

})();