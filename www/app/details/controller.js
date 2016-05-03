(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', 
	function($scope, $stateParams, $state, model, $cordovaCamera, $ionicPlatform, ls, $cordovaLocalNotification, nextWatering) {
		var _id = $stateParams.flowerId;
		for (var i = 0; i < model.flowers.length; i++) {
			if (model.flowers[i].id == _id){
				$scope.flower = model.flowers[i];
			}
		}
		console.log($scope.flower);
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric'
		};

		$scope.data = {
			flowerCreated: new Date(+_id).toLocaleString("en-Us", options),
			flowerNext:new Date(+$scope.flower.notification).toLocaleString("en-Us", options),
			style: {"background-image": 'url(' + $scope.flower.photo + ')'}
		};
		$scope.canIMakePhoto = model.sizeOfLS < 500;

		$ionicPlatform.ready(function() {

			$scope.delete = function(){
				var i = model.flowers.indexOf($scope.flower);
				model.flowers.splice(i, 1);
				ls.set();

				$cordovaLocalNotification.cancel(_id)
				.then(function (result) {
					console.log('Notification removed');
				});

				$state.go('tab.flowers');
			};


			$scope.makePhoto = function(){
				var options = {
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					quality: 10, 
					targetHeight: 250
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					var sizeOfImage = imageData.length*16/(8*1024);
					console.log(sizeOfImage);
					model.sizeOfLS = +model.sizeOfLS + sizeOfImage;
					$scope.flower.photo = "data:image/jpeg;base64," + imageData;
					$angular.element('#photo-')
					ls.set();
				}, function(err) {});
			};

			$scope.test = function(){
				nextWatering($scope.flower);
				console.log(new Date($scope.flower.notification));
				ls.set();
			}
		});



	});


})();