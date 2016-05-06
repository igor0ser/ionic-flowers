(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('FlowersCtrl', function($scope, model,$window, $ionicPlatform) {
		$scope.flowers = model.flowers;
		$scope.$on('$ionicView.loaded', function() {
			$scope.flowers = model.flowers;
		});

		
		$ionicPlatform.ready(function () {
			$scope.ho = function(){
				console.log('start');
				/*var x = $window.cordova.plugins.MyPlugin1.coolMethod('ooo', function() {console.log('success')}, function(){console.log('error')});*/
				$window.echo('ooo', function() {console.log('success')}, function(){console.log('error')});
				/*console.log(x);*/
				console.log('end');
			};
			console.log('$window testing');
			console.log($window.echo === undefined);
			console.log($window.cordova.plugins.MyPlugin1.coolMethod === undefined);
			console.log($window.cordova.plugins.MyPlugin1.alert === undefined);
			console.dir($window.cordova.plugins.MyPlugin1);
			console.log(window.plugins === undefined);
		});
});

})();