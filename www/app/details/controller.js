(function(){
	'use strict';
	var app = angular.module('app');

	app.controller('DetailsCtrl', 
	function($scope, $stateParams, $state, model, $cordovaCamera, $ionicPlatform, ls, $cordovaLocalNotification, nextWatering, $window) {
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
				console.log('make a photo');
				var options = {
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA,
					correctOrientation:true,
					quality: 10
				};
				$cordovaCamera.getPicture(options).then(function(imageData) {
					var sizeOfImage = imageData.length*16/(8*1024);
					console.log(sizeOfImage);
					model.sizeOfLS = +model.sizeOfLS + sizeOfImage;
					$scope.flower.photo = "data:image/jpeg;base64," + imageData;
					ls.set();
					console.log('photo is made.');
					//$window.location.reload();
					$state.go($state.current, {}, {reload: true});
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