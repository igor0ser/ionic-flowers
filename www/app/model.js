(function(){
	'use strict';

	var app = angular.module('app');
		app.value('model', {
			time: {
				hours: 12,
				minutes: 0
			},
			flowers: []
		});
})();