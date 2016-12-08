/*global window:false, angular:false, Gauge:false*/
/**
 * angular-gaugejs version 0.1
 * License: MIT.
 * Copyright (C) 2014, Rasmus Schlünsen
 */

(function(angular) {
    'use strict';

    angular.module('gaugejs', [])
    .directive('gaugejs', [function() {
        return {
            restrict: 'AC',
            scope: {
                'animationTime': '=',
                'value': '=',
                'options': '=',
                'maxValue': '=',
		        'gaugeType': '=',
                'textField': '@'
            },
            controller: ['$scope', '$element', function($scope, $element) {
		        if ($scope.gaugeType === 'donut') {
		            $scope.gauge = new Donut($element[0]);
		        } else {
                    $scope.gauge = new Gauge($element[0]);
		        }
                if ($scope.options && $scope.options.animationSpeed)
                    $scope.gauge.animationSpeed = $scope.options.animationSpeed;

                if ($scope.textField) {
                    var el = document.getElementById($scope.textField),
                        parent = $element.parent();
                    if (el === null) {
                        parent.append('<div id="' + $scope.textField + '"></div>');
                    }
                    $scope.gauge.setTextField(document.getElementById($scope.textField));
                }
				
                $scope.$watchCollection('[options, value, maxValue]', function(newValues){
                    $scope.gauge.setOptions(newValues[0]);
                    $scope.gauge.maxValue = newValues[2];
                    if (!isNaN(newValues[1])){
                        $scope.gauge.set(newValues[1]);
                    }
                });
            }],
        };
    }]);

})(window.angular);
