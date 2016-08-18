(function() {
	'use strict';

	var app = angular.module('mainApp', ['jlg-daterangepicker', 'jlgI18n']);
	
	app.config(['jlgI18nServiceProvider', function(jlgI18nServiceProvider) {
        jlgI18nServiceProvider.localeDir('../../bower_components/jlg-i18n/locale');
		jlgI18nServiceProvider.i18nDir('./i18n');
    }]);

	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $locale = $injector.get('$locale');
		var $filter = $injector.get('$filter');
		var i18n = $filter('i18n');
		var jlgI18nService = $injector.get('jlgI18nService');
		
		$rootScope.changeLocale = jlgI18nService.changeLocale;
		$rootScope.locale = $locale;
		$rootScope.jlgI18nService = jlgI18nService;
		
		$rootScope.daterangeOptions = {
			autoApply: true
		};
		
		var refresh = function() {
			
			console.log('i18n(Apply)', i18n('Apply'));
			console.log('locale', $locale);
			console.log('months', $locale.DATETIME_FORMATS.MONTH);
			var format = $locale.DATETIME_FORMATS.shortDate.replace(/(y+)/g, 'YYYY').replace(/(d+)/g, 'DD').replace(/(M+)/g, 'MM');
			console.log('format', format);
			$rootScope.daterangeOptions.locale = {
				format: format,
				separator: ' - ',
				applyLabel: i18n('Apply'),
				cancelLabel: i18n('Cancel'),
				fromLabel: i18n('From'),
				toLabel: i18n('To'),
				customRangeLabel: i18n('Custom'),
				weekLabel: i18n('W'),
				daysOfWeek: $locale.DATETIME_FORMATS.SHORTDAY.map(function(n) { return n.substring(0, 2); }),
				monthNames: $locale.DATETIME_FORMATS.MONTH,
				firstDay: 1
			};
		};
		
		$rootScope.$watch('jlgI18nService.translation', refresh, true);
		$rootScope.$watch('locale', refresh, true);
		
		
		$rootScope.eventObject = {};
		
		$rootScope.$watch('isEventonShow', function() {
			if ($rootScope.isEventonShow) {
				$rootScope.eventObject['show.daterangepicker'] = [function() {
					console.log('event show.daterangepicker', arguments);
				}];
			} else {
				delete $rootScope.eventObject['show.daterangepicker'];
			}
		});
		$rootScope.model = {};
		
		$rootScope.onSubmit = function() {
			console.log('$rootScope.model', $rootScope.model);
			window.alert('form submitted. Look at the console.');
		};

	}]);



})();
