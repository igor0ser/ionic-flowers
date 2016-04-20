(function(){
	'use strict';
	var app = angular.module('app');

	app.service('ls', function($window, model){
		var KEY = 'my_flowers_list_account_for_ionic_application';
		var _this = this;

		this.add = add;
		this.get = get;
		this.set = set;

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

		function add(flower){
			var account = _this.get();
			account.flowers.push(flower);
			_this.set(account);
		}
});
})();