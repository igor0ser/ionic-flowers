(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('SettingsCtrl', function($scope, model) {
		$scope.time = model.time;
	});
})();