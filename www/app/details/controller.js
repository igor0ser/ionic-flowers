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

		$scope.delete = function(){
			var i = model.flowers.indexOf($scope.flower);
			model.flowers.splice(i, 1);
			$state.go('tab.flowers');
		};


		//EXPERIMENTS HERE
		$scope.image = {
			src: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, possimus facilis!',
			text: 'hello there'
		};

		$scope.vibrate = function(){
			$scope.image.text = "vibration";
			$ionicPlatform.ready(function() {
				$cordovaVibration.vibrate(1000);
			});
		};


		$scope.makePhoto = function(){
			$scope.image.text = "gallery";
			var options = {
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				quality: 10
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var $scope.flower = "data:image/jpeg;base64," + imageData;
				$scope.flower.photo = img;
				ls.set();
			}, function(err) {

			});
		};



	});

})();