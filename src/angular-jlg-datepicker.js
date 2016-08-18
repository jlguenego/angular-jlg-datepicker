(function() {
	'use strict';
	
	var app = angular.module('jlg-datepicker', []);
	
	app.directive('datepicker', ['$injector', function($injector) {
		var $parse = $injector.get('$parse');
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ngModel) {
				scope.$watch(attr.options, function() {
					var options = $parse(attr.options)(scope);
					element.datepicker('remove');
					element.datepicker(options);
					if (attr.export) {
						scope[attr.export] = element.data('datepicker');
					}
					if (attr.inline === '') {
						element.off('changeDate');
						element.on('changeDate', function() {
							var newDate = element.datepicker('getFormattedDate');
							ngModel.$setViewValue(newDate);
						});
					}
					
					if (element.hasClass('input-daterange')) {
						var startElement = element.find('input').first();
						var endElement = element.find('input').last();
						
						startElement.datepicker().off('hide');
						startElement.datepicker().on('hide', function(e) {
							if (e.date === undefined) {
								return;
							}
							var endDp = endElement.datepicker('getDate');
							var startDp = startElement.datepicker('getDate');
							if (endDp.getTime() === startDp.getTime()) {
								endElement.datepicker('show');
							}
						});
					}
					
				}, true);
			}
		};
	}]);

})();
