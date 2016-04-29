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
			var d;
			if (!hours&&!minutes){
				d = new Date(flower.notification);
				d.setDate(d.getDate() + flower.interval);
				console.log(d);
				return d.getTime();
			} else if (flower.notification){
				d = new Date(+flower.notification);
			} 
			else {
				d = new Date();
				d.setDate(d.getDate() + flower.interval);
			}
			d.setHours(hours);
			d.setMinutes(minutes);
			d.setSeconds(0);
			console.log(d);
			return d.getTime();
		};
	});

	app.service('notif', function($cordovaLocalNotification){

// emulation in browser
/*		try {
			$cordovaLocalNotification.schedule({id: 1, at: new Date().getTime() - 1000000});
		} catch (err) {
			console.log('we are in browser');
			$cordovaLocalNotification = {
				schedule: function(){
					return {
						then: function(res){res('browser testing notifications');}
					};
				},
				cancel: function(){
					return {
						then: function(res){res('browser testing notifications');}
					};
				}
			};
		}
*/


		return function (flower, time){
			if (!time){
				$cordovaLocalNotification.cancel(+flower.id).then(function(){
					console.log('Notification removed');
				});
				return;
			} 

			flower.notification = nextWatering(flower, time.hours, time.minutes);
			$cordovaLocalNotification.schedule({
				id: +flower.id,
				title: 'Water you flower',
				text: "Don't forget to water " + flower.name,
				at: +flower.notification,
				data: {
					flower: flower.name,
					id: flower.id,
					dateAt: flower.notification
				}
			}).then(function (result) {
				console.log('Notification added');
			});
		};

		function nextWatering(flower, hours, minutes){
			var d;
			if (flower.notification){
				d = new Date(+flower.notification);
			} else {
				d = new Date();
				d.setDate(d.getDate() + flower.interval);
			}
			d.setHours(hours);
			d.setMinutes(minutes);
			d.setSeconds(0);
			console.log(d);

			return d.getTime();
		}
	});

	app.filter('time', function(){
		return function(num){
			if (num<10) {
				return '0' + num;
			} else return num;
		};
	});
})();