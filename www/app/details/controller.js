(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', 
	function($scope, $stateParams, $state, model, $cordovaCamera, notif, $ionicPlatform, ls) {
		var _id = $stateParams.flowerId;
		for (var i = 0; i < model.flowers.length; i++) {
			if (model.flowers[i].id == _id){
				$scope.flower = model.flowers[i];
			}
		}
		
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric'
		};

		var format = 'dd.MM.yyyy';
		$scope.data = {
			flowerCreated: new Date(+_id).toLocaleString("en-Us", options),
			flowerNext:new Date(+$scope.flower.notification).toLocaleString("en-Us", options)
		};
		$scope.canIMakePhoto = model.sizeOfLS < 500;



		$scope.delete = function(){
			var i = model.flowers.indexOf($scope.flower);
			notif($scope.flower);
			model.flowers.splice(i, 1);
			ls.set();
			$state.go('tab.flowers');
		};

		$ionicPlatform.ready(function() {


			$scope.makePhoto = function(){
				var options = {
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					quality: 10,
					targetWidth: 250, 
					targetHeight: 250
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					var sizeOfImage = imageData.length*16/(8*1024);
					console.log(sizeOfImage);
					model.sizeOfLS = +model.sizeOfLS + sizeOfImage;
					$scope.flower.photo = "data:image/jpeg;base64," + imageData;
					ls.set();
				}, function(err) {});
			};
		});



	});


})();