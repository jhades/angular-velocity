///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Directives used to implement the calendar widget
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var _ = require('lodash');
require('../services/ngvCommons');

angular.module('ngvCalendar', ['ngvCommons'])
    .directive('ngvCalendar', function ($timeout) {
        return {
            scope: {

            },
            replace: true,
            templateUrl: '/ngv/partials/calendar.html',
            controller: function($scope, $element) {

                $scope.showDatePicker = false;

                function getInput() {
                    return $element.children()[0];
                }

                $scope.toggleDatePicker = function() {
                    $scope.showDatePicker = !$scope.showDatePicker;
                    if ($scope.showDatePicker) {
                        $timeout(function () {
                            getInput().focus();
                        });
                    }
                }
                
                $scope.mode = "MONTH";
            }
        }
    });