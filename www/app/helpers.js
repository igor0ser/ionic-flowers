(function(){
	'use strict';
	var app = angular.module('app');

	app.service('ls', function($window, model){
		var KEY = 'my_flowers_list_account_for_ionic_application';
		var _this = this;

		this.get = get;
		this.set = set;
		this.refresh = refresh;

		function get(){
			var modelString = $window.localStorage.getItem(KEY);
			if (!modelString) return;
			var modelObj = angular.fromJson(modelString);
			model.time = modelObj.time;
			model.flowers = modelObj.flowers;
			return modelObj;
		}

		function set(){
			var modelString = angular.toJson(model);
			$window.localStorage.setItem(KEY, modelString);
		}

		function refresh(){
			console.log(123);
			$window.localStorage.removeItem(KEY);
			model.flower = [];
			model.time = {
				hours: 12,
				minutes: 0
			};
		}
	});

	app.service('nextWatering', function($cordovaLocalNotification){
		return function nextWatering(flower, hours, minutes){
			console.log(flower);
			var d;
			if (arguments.length === 1){
				//setting interval again when it triggers
				d = new Date(+flower.notification);
				d.setDate(d.getDate() + flower.interval);
			} else {
				d = (flower.notification) ? 
				new Date(+flower.notification) : //existing notif, changing time
				new Date(); //setting new notif

				if (!flower.notification) d.setDate(d.getDate() + flower.interval);
				d.setHours(hours);
				d.setMinutes(minutes);
				d.setSeconds(0);
			}

			console.log(d);
			flower.notification = d.getTime();
			return d.getTime();
		};
	});

	app.filter('time', function(){
		return function(num){
			if (num<10) {
				return '0' + num;
			} else return num;
		};
	});
})();