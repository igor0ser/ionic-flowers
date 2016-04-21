(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', function($scope, $stateParams, $state, model, $cordovaVibration, $cordovaCamera) {
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
			src: '',
			text: 'hello there'
		};

		$scope.vibrate = function(){
			$scope.image.text = "vibration";
			$cordovaVibration.vibrate(1000);
		};

		$scope.takePicture = function(){
			$scope.image.text = "photo";
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 250,
				targetHeight: 250,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation:true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
					$scope.image.src = "data:image/jpeg;base64," + imageData;
				}, function(err) {
					$scope.image.text = "error: " + err;
					alert('some error: ', err);
				});
		};


		$scope.choosePicture = function(){
			$scope.image.text = "gallery";
			var options = {
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA
			};

			$cordovaCamera.getPicture(options).then(function(imageUri) {
					$scope.image.src = imageUri;
				}, function(err) {
					$scope.image.text = "error: " + err;
					alert('some error: ', err);
				});
		};


	});

})();