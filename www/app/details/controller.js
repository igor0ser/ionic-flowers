(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', 
	function($scope, $stateParams, $state, model, $cordovaCamera, $cordovaVibration, $ionicPlatform, ls) {
		for (var i = 0; i < model.flowers.length; i++) {
			if ($stateParams.flowerId == model.flowers[i].id){
				$scope.flower = model.flowers[i];
			}
		}
		
		$scope.flower.created = new Date(+$scope.flower.id).toLocaleString("ua");
		$scope.daysLeft = getDayDifference($scope.flower.id, $scope.flower.days);


		$scope.delete = function(){
			var i = model.flowers.indexOf($scope.flower);
			model.flowers.splice(i, 1);
			$state.go('tab.flowers');
		};

		
		$ionicPlatform.ready(function() {

			$scope.vibrate = function(){
				$cordovaVibration.vibrate(1000);
			};

			$scope.makePhoto = function(){
				var options = {
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					quality: 10,
					targetWidth: 250, 
					targetHeight: 250
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.flower.photo = "data:image/jpeg;base64," + imageData;
					ls.set();
				}, function(err) {});
			};
		});

		function getDayDifference(date, daysInterval){
			var msInOneDay = 86400000;
			var days = Math.floor((new Date().getTime() - $scope.flower.id) / msInOneDay);
			return days % daysInterval;
		}
	});


})();