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

	app.filter('time', function(){
		return function(num){
			if (('' + num).length === 1) {
				return num + '0';
			} else return num;
		};
	});
})();