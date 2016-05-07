(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('FlowersCtrl', function($scope, model) {
		$scope.flowers = model.flowers;
		$scope.$on('$ionicView.loaded', function() {
			$scope.flowers = model.flowers;
		});
});

})();