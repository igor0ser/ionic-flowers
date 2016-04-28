(function(){
	'use strict';

	var app = angular.module('app');
	app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {


	$stateProvider
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'app/tabs.html'
		})
			.state('tab.add', {
				url: '/add',
				views: {
					'tab-add': {
						templateUrl: 'app/add/view.html',
						controller: 'AddCtrl'
					}
				}
			})
			.state('tab.flowers', {
					url: '/flowers',
					views: {
						'tab-flowers': {
							templateUrl: 'app/flowers/view.html',
							controller: 'FlowersCtrl'
						}
					}
				})
			.state('tab.details', {
					url: '/details/:flowerId',
					views: {
						'tab-flowers': {
							templateUrl: 'app/details/view.html',
							controller: 'DetailsCtrl'
						}
					}
				})
			.state('tab.settings', {
				url: '/settings',
				views: {
					'tab-account': {
						templateUrl: 'app/settings/view.html',
						controller: 'SettingsCtrl'
					}
				}
			});
	$urlRouterProvider.otherwise('/tab/flowers');
});
})();