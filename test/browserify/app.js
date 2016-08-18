'use strict';
require('./style.css');
window.$ = window.jQuery = require('jquery');
window.angular = require('angular');

var app = angular.module('mainApp', [require('../../index.js')]);

app.run(['$injector', function($injector) {
	var $rootScope = $injector.get('$rootScope');
	
	$rootScope.dateOptions = {
		clearBtn: true,
		startView: 0,
		autoclose: true
	};
	
	$rootScope.eventObject = {};
	
	
	$rootScope.model = {};
	
	$rootScope.onSubmit = function() {
		console.log('$rootScope.model', $rootScope.model);
		window.alert('form submitted. Look at the console.');
	};
}]);


